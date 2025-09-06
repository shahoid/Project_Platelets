const express = require('express');
const router = express.Router();
const City = require('../models/city'); // lowercase 'city'

// GET all cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
