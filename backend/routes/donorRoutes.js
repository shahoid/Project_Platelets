const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const fetch = require('node-fetch');

// Function to get latitude and longitude from the city name using Nominatim API
async function getCityCoordinates(city) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`);
    const data = await response.json();

    if (data && data.length > 0) {
      return { lat: data[0].lat, lng: data[0].lon };
    }
    return null;
  } catch (error) {
    console.error('❌ Error fetching city coordinates:', error);
    return null; // return null if there's an error
  }
}

// POST: Register new donor
router.post('/', async (req, res) => {
  try {
    const { name, bloodGroup, city, contact, email, age } = req.body;

    // Validate required fields
    if (!name || !bloodGroup || !city || !contact || !email || !age) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Get coordinates from the city name
    const coordinates = await getCityCoordinates(city);  

    // Save donor information to the database
    const newDonor = new Donor({
      name,
      bloodGroup,
      city,
      contact,
      email,
      age,
      location: coordinates ? { lat: coordinates.lat, lng: coordinates.lng } : null
    });

    await newDonor.save();

    res.status(201).json({ message: 'Donor registered successfully!' });
  } catch (error) {
    console.error('❌ Error saving donor:', error);
    res.status(500).json({ message: 'Server error while saving donor' });
  }
});

// GET: Find donors by city
router.get('/', async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: 'City query parameter is required' });
    }

    const donors = await Donor.find({
      city: { $regex: new RegExp(`^${city}$`, 'i') }
    });

    res.json(donors);
  } catch (error) {
    console.error("❌ Error fetching donors:", error);
    res.status(500).json({ message: 'Server error while fetching donors' });
  }
});

module.exports = router;
