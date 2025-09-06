const Donor = require('../models/Donor');
const PatientRequest = require('../models/PatientRequest');

const matchDonorsToPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await PatientRequest.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const matchedDonors = await Donor.find({
      bloodGroup: patient.bloodGroup,
      city: patient.city,
      availability: true
    });

    patient.matchedDonors = matchedDonors.map(d => d._id);
    patient.status = matchedDonors.length > 0 ? 'Matched' : 'Pending';
    await patient.save();

    res.json({ message: 'Matching complete', patient, matchedDonors });
  } catch (err) {
    console.error('❌ Error in matching:', err);
    res.status(500).json({ message: 'Error matching donors to patient' });
  }
};

module.exports = { matchDonorsToPatient };
