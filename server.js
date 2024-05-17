const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const connectDB = require('./db/connectDB');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

// MiddlewareS
app.use(cors());
app.use(express.json());
app.use('/api/data', userRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
