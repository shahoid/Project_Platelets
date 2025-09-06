const express = require('express');
const router = express.Router();
const PatientRequest = require('../models/PatientRequest');

// POST: Create new patient request
router.post('/', async (req, res) => {
  try {
    const newRequest = new PatientRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Patient request submitted.', data: savedRequest });
  } catch (err) {
    console.error('❌ Error saving patient request:', err);
    res.status(500).json({ message: 'Failed to submit patient request.' });
  }
});

// GET: All requests (for dashboard)
router.get('/', async (req, res) => {
  try {
    const requests = await PatientRequest.find().populate('matchedDonors');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving requests.' });
  }
});

module.exports = router;
