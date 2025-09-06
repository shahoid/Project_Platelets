const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  bloodGroup: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']  // Phone number validation
  },
  email: { 
    type: String, 
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.']  // Email validation
  },
  age: { 
    type: Number, 
    required: true 
  },
  location: { 
    type: { 
      lat: Number, 
      lng: Number 
    }, 
    required: false 
  }
});

module.exports = mongoose.model('Donor', donorSchema);
