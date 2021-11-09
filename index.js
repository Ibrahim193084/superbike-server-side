const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//database user information

// console.log(uri)

// connecting with mongodb

app.get('/',(req, res)=>{
    res.send('Assingnment 12 server')
})

app.listen(port, ()=>{
    console.log('Assignment 12 server', port)
})