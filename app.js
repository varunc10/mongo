const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'public')));
// connect to MongoDB using Mongoose

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })


// create a schema for the form data
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
});

// create a model based on the schema
const User = mongoose.model('User', userSchema);

// middleware to parse the request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// handle form submission
app.post('/', async (req, res) => {
    // create a new FormData document
    try {
        const user = new User(req.body);
        await user.save();
    }
    catch (err) {
        console.log(err);
    }
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
