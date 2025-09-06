const express = require('express');
const router = express.Router();
const { matchPatientWithDonors } = require('../controllers/matchController');

// Match patient with donors
router.post('/', matchPatientWithDonors);

module.exports = router;
