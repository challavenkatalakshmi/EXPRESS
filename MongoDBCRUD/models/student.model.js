const mongoose = require('mongoose')

//creating schema..........

var studentSchema=mongoose.Schema({
    studentId:Number,
    firstName:String,
    lastName:String,
    age:Number,
    dob:String,
    department:String
  });
  
  //creating model for that schema....MODEL
  
  var studentModel = mongoose.model('Student',studentSchema)

  module.exports=studentModel;

