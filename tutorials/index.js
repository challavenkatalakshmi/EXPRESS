const express=require('express');

const products=require('./routes/products');
const users=require('./routes/users');

const app=express();

const mongoose=require('mongoose')
const dbURL=require('./properties').DB_URL

//mongoose.connect(dbURL)

mongoose.connect("mongodb://localhost:27017/CRM")

mongoose.connection.on("connected",()=>{
    console.log("connected to MongoDB using MongooseJS")
})


// app.get('/getUsers',(req,res)=>{
//     res.send('List of Users using get method...')
// })

// app.post('/getUsers',(req,res)=>{
//     res.send('List of Users using post method...')
// })

// app.use('/products',products);
// app.use('/users',users);

// app.listen(4000,(req,res)=>{
//     console.log('server is running')
// })