const express = require('express');
const router = express.Router();
const { matchDonorsToPatient } = require('../controllers/matchController');

router.post('/:patientId', matchDonorsToPatient);

module.exports = router;
