require('dotenv').config(); // Make sure to call config() to load the variables

// Use CommonJS syntax in Node.js
const mongoURL = process.env.MONGODB_URL; // Ensure you're using the same key as in .env
const PORT = 5000;
module.exports = { mongoURL, PORT };
