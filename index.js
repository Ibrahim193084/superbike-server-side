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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dy9rj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

// connecting with mongodb
async function run() {
    try {
      await client.connect();
      const database = client.db("superbike");
      const cycleCollection = database.collection("cycle");
       //Get api for cycle collection
       app.get('/cycles', async(req, res)=>{
        const cursor = cycleCollection.find({});
        const cycles = await cursor.toArray();
        res.send(cycles)
    })


     


  
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('Assingnment 12 server')
})

app.listen(port, ()=>{
    console.log('Assignment 12 server', port)
})