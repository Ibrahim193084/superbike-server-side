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
      const orderCollection = database.collection("order")
       //Get api for cyclecollection
       app.get('/cycles', async(req, res)=>{
        const cursor = cycleCollection.find({});
        const cycles = await cursor.toArray();
        res.send(cycles)
    })
        //Get single api  for cyclecollection
        app.get('/cycles/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const cycles = await cycleCollection.findOne(query)
            res.send(cycles);
        })




 //Post api for ordercollection
  app.post('/order', async (req, res) => {
    const newOrder = req.body;
    const order = await orderCollection.insertOne(newOrder);
    res.send(order)
});
 //Get api for ordercollection
 app.get('/order', async (req, res) =>{
  const cursor = orderCollection.find({});
  const order = await cursor.toArray();
  res.send(order);
});
// email filter
app.get('/order', async (req, res) => {
    const email = req.query.email;
    const query = { email: email }
    const cursor = orderCollection.find(query);
    const orders = await cursor.toArray();
    res.json(orders);
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



// https://arcane-hamlet-67437.herokuapp.com/