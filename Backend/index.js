require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const url = process.env.MONGOURL;

const app = express();

mongoose.connect(url).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.get('/about', (req, res) => {
    res.send("Hello World from about");
})

app.listen(5000, () => {
    console.log("Server started @ 5000")
})