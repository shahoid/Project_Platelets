const Patient = require('../models/Patient');
const Donor = require('../models/Donor');
const notificationUtils = require('../utils/notification');

// Create a new patient request
exports.createPatientRequest = async (req, res) => {
  const { bloodGroup, urgency, location, contact, patientName } = req.body;

  try {
    const newRequest = new Patient({
      bloodGroup,
      urgency,
      location,
      contact,
      patientName,
    });

    await newRequest.save();

    // Match donors with this patient request
    const matchedDonors = await Donor.find({
      bloodGroup,
      location,
      available: true, // Ensure the donor is available
    });

    if (matchedDonors.length > 0) {
      // Notify patient and matched donors
      matchedDonors.forEach(donor => {
        notificationUtils.sendSMS(donor.contact, 'You have been matched with a patient in need of platelets.');
        notificationUtils.sendEmail(donor.email, 'You are a matched donor for a patient in need.');
      });

      // Update patient status
      newRequest.status = 'Matched';
      await newRequest.save();

      // Notify the patient
      notificationUtils.sendSMS(contact, 'Your request has been matched with a donor.');
      notificationUtils.sendEmail(contact, 'Your platelet donation request has been matched.');
    }

    res.status(201).json({ message: 'Patient request created and matched if possible' });
  } catch (error) {
    console.error('Error creating patient request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all patient requests for admin (can include filters like status)
exports.getAllPatientRequests = async (req, res) => {
  try {
    const patientRequests = await Patient.find();
    res.status(200).json(patientRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient requests' });
  }
};
