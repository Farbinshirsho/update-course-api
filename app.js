const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes'); // Import course routes

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
    .connect('mongodb+srv://admin:1195bcpsc18Shirsho@cluster0.k6bqj.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api', courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
