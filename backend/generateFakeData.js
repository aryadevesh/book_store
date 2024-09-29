require('dotenv').config(); // Load environment variables
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker'); // Use require instead of import
const fs = require("fs");
const { Book } = require("../models/bookModel.js");
const { mongoURL } = require('./config.js'); // Using destructuring


// Connect to MongoDB
mongoose.connect(mongoURL).then(() => {
        console.log(`MongoDB Connected at ${mongoURL}`);
        // Start generating and inserting data after connection
        insertFakeData(10).then(() => exportDataToJson()).catch(console.error);
    })
    .catch(err => {
        console.error(`MongoDB Connection Error: ${err.message}`);
    });

// Function to generate fake data
const generateFakeData = (count) => {
    return Array.from({ length: count }, () => ({
        title: faker.lorem.words(2),
        author: faker.person.fullName(),
        publishYear: faker.number.int({ min: 1800, max: 2023 }),
    }));
};

// Function to insert fake data into MongoDB
const insertFakeData = async (count) => {
    try {
        const fakeData = generateFakeData(count);
        await Book.insertMany(fakeData);
        console.log('Fake data inserted into MongoDB.');
    } catch (err) {
        console.error('Error inserting fake data:', err);
    }
};

// Function to export data to JSON file
const exportDataToJson = async () => {
    try {
        const books = await Book.find({});
        const jsonOutput = JSON.stringify(books, null, 2);
        
        fs.writeFile('bookData.json', jsonOutput, (err) => {
            if (err) {
                console.error('Error exporting data to JSON file:', err);
            } else {
                console.log('Data exported to bookData.json');
            }
        });
    } catch (err) {
        console.error('Error fetching books for export:', err);
    }
};
