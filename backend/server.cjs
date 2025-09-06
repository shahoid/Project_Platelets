const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const matchRoutes = require('./routes/matchRoutes');
const donorRoutes = require('./routes/donorRoutes');
const cityRoutes = require('./routes/cityRoutes');

// Initialize the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/patients', patientRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/cities', cityRoutes);

// 🌐 Connect to MongoDB Atlas
console.log("🔍 MONGO_URI being used:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    // Start the server after MongoDB connection is successful
    app.listen(5000, () => {
        console.log("🚀 Server running on http://localhost:5000");
    });
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
});
