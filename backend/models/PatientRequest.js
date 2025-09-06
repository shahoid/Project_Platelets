const mongoose = require('mongoose');

const patientRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  matchedDonors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }],
  status: { type: String, enum: ['Pending', 'Matched', 'Completed'], default: 'Pending' },
  dateRequested: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PatientRequest', patientRequestSchema);
