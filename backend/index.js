require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoURL } = require('./config.js');
const { Book } = require('./models/bookModel.js');

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for enabling CORS
// app.use(cors());   // can be restricted for origins,headers,methods

app.use(cors(
    {
        origin: ["https://book-store-frontend-gamma.vercel.app"],
        methods: ["GET, POST, PUT, DELETE"],
        credentials: true
    }
));

// const options = {"directConnection":true,"serverSelectionTimeoutMS":2000};


app.route("/addBook").post(async (req, res) => {
    try{
        if(req.body.title && req.body.author && req.body.publishYear){
        const {title,author,publishYear} = req.body;
        const newBook = { title:title,author:author,publishYear:publishYear }
        const book = await Book.create(newBook);
        res.status(200).send(book);
        }else{
            res.status(500).send("All fields are required");
        }
    }catch(err){
        console.log(`Error in adding book: ${err}`);
        return res.status(500).json({
            status:'error',
            error:err
        })
    }
})

app.route("/getBooks").get(async (req,res) => {
    try{
        const books = await Book.find();
        res.status(200).send({
            status:'success',
            data:books
        });
    }catch(err){
        console.log(`Error in getting books: ${err}`);
        return res.status(500).json({
            status:'error',
            error:err
        })
    }
})

app.route('/updateBook/:id').put(async (req,res) => {
    try{
        const id = req.params.id;
        const {title,author,publishYear} = req.body;
        const newBook = { title:title,author:author,publishYear:publishYear }
        const book = await Book.findByIdAndUpdate(id,newBook,{new:true});
        res.status(200).send(book);
    }catch(err){
        console.log(`Error in updating book: ${err}`);
        return res.status(500).json({
            status:'error',
            error:err
        })
    }
})

app.route('/deleteBook/:id').delete(async (req,res) => {
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id,{new:true});
        res.status(200).send(book);
    }catch(err){
        console.log(`Error in deleting book: ${err}`);
        return res.status(500).json({
            status:'error',
            error:err
        })
    }
})

app.route("/getBooks/:id").get(async (req,res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    }catch(err){
        console.log(`Error in getting books: ${err}`);
        return res.status(500).json({
            status:'error',
            error:err
        })
    }
})

mongoose.connect(mongoURL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
    console.log(`MongoDB Connected at ${mongoURL}`);
}).catch((err) => {
    console.log(`MongoDB Connection Error: ${err.message}`);
})