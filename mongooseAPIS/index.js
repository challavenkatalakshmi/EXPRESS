const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const Contact=require('./routes/contact-routes')

const app=express()

app.use(bodyParser.json())//To get the data from request body.
app.use(bodyParser.urlencoded({extended:true}))


app.use("/api",Contact)

//connection from mongoose to MongoDB

const connectToDB=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase')
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
connectToDB() 

const port=3000
app.listen(port,()=>{
    console.log(`server started ${port}`)
})