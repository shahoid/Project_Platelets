require('dotenv').config(); 
const mongoose = require('mongoose');
const City = require('./models/city'); // Ensure the correct path

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const cities = [
        { name: 'Mumbai' },
        { name: 'Delhi' },
        { name: 'Bangalore' },
        { name: 'Chennai' },  // New city
        { name: 'Kolkata' }   // New city
      ];

    // Insert cities, skip if they already exist
    for (let city of cities) {
      const existingCity = await City.findOne({ name: city.name });
      if (!existingCity) {
        await City.create(city);
        console.log(`City ${city.name} added.`);
      } else {
        console.log(`City ${city.name} already exists.`);
      }
    }
  })
  .catch(err => {
    console.error('Error seeding cities:', err);
  });
