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
      const reviewCollection = database.collection("review")
      const userCollection = database.collection("user")
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
// // email filter
// app.get('/order', async (req, res) => {
//     let query = {}
//     const email = req.query.email;
//     if(email){
//         query = {email: email}
//     }
//     const cursor = orderCollection.find(query);
//     const orders = await cursor.toArray();
//     res.json(orders);
// })
//Delete api for ordercollection by id
app.delete('/order/:id', async(req, res)=>{
    const id = req.params.id;
    const qurey = {_id: ObjectId(id)};
    const result = await orderCollection.deleteOne(qurey)
    res.json(result);
  })

//   put api for update status
//Update api for update status
app.put('/order/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
           status: "shipped"
        },
    };
    const result = await orderCollection.updateOne(filter, updateDoc, options)
    console.log('updating', id)
    res.json(result)
  })
  

  //Post api for reviewcollection
  app.post('/review', async (req, res) => {
    const newReview = req.body;
    const review = await reviewCollection.insertOne(newReview);
    res.send(review)
});
//Get api for reviewcollection
app.get('/review', async (req, res) =>{
    const cursor = reviewCollection.find({});
    const review = await cursor.toArray();
    res.send(review);
  });
//post api for usercollection
  app.post('/user', async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    // console.log(result);
    res.json(result);
});
//put api for usercollection
app.put('/user', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: user };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.json(result);
});
//put api for update admin role
app.put('/user/admin', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const updateDoc = { $set: { role: 'admin' } };
    const result = await userCollection.updateOne(filter, updateDoc);
 res.json(result);
})
//get api for check admin
app.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const user = await userCollection.findOne(query);
    let isAdmin = false;
    if (user?.role === 'admin') {
        isAdmin = true;
    }
    res.json({ admin: isAdmin });
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