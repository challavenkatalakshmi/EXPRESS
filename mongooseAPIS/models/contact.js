const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first Name is required"],
        minLength:3,
        maxLength:20,
        trim:true,
        validate:{
            validator:function(value){
                const nameRegex=/^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message:"first name must contain only aplhabetic or space characters only"
        }
    },

    lastName:{
        type:String,
        required:[true,"Last Name is required"],
    },

    emailAddress:{
        type:String,
        required:true,
        unique:true,
    },

    age:{
        type:Number,
        required:false
    }
})

const contactModel=mongoose.model('contact',contactSchema)

module.exports=contactModel