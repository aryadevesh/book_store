require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoURL } = require('./config.js');
const { Book } = require('./models/bookModel.js');
const Joi = require('joi'); // For validation

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS middleware configuration
app.use(cors({
    origin: ["https://iiitk-book-store.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Book schema validation
const bookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    publishYear: Joi.number().integer().min(1500).max(2024).required()
});

// Add a book
app.route("/addBook").post(async (req, res) => {
    try {
        const { error, value } = bookSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { title, author, publishYear } = value;
        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);
        res.status(200).send(book);
    } catch (err) {
        console.error(`Error in adding book: ${err}`);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Get all books
app.route("/getBooks").get(async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ status: 'success', data: books });
    } catch (err) {
        console.error(`Error in getting books: ${err}`);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Update a book
app.route('/updateBook/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, publishYear } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishYear }, { new: true });
        res.status(200).send(updatedBook);
    } catch (err) {
        console.error(`Error in updating book: ${err}`);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Delete a book
app.route('/deleteBook/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        res.status(200).send(deletedBook);
    } catch (err) {
        console.error(`Error in deleting book: ${err}`);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Get a single book
app.route("/getBooks/:id").get(async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    } catch (err) {
        console.error(`Error in getting book: ${err}`);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// MongoDB and server setup
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        console.log(`MongoDB Connected at ${mongoURL}`);
    })
    .catch(err => {
        console.error(`MongoDB Connection Error: ${err.message}`);
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error(`Global Error: ${err}`);
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});
