var express = require('express');
var router = express.Router();

const mongoose=require('mongoose');
const studentModel=require('../models/student.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('students router');
});

router.post('/add', function(req, res, next) {
    let newStudent = new studentModel ({
        //studentId:100,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        dob:req.body.dob,
        department:req.body.department
    });

// Instead of using callback function, use promises
    newStudent.save()
    .then(savedStudent => {
        res.status(200).send({ status: 200, message: 'User added successfully', studentObj: savedStudent });
    })
    .catch(err => {
        res.status(500).send({ status: 500, message: 'Error occurred while saving user.' });
    });    
  });

  router.get('/list', function(req, res, next) {
    studentModel.find()
        .then(students => {
            res.status(200).send({ status: 200, students: students });
        })
        .catch(err => {
            console.error("Error occurred while fetching students:", err);
            res.status(500).send({ status: 500, message: 'Error occurred while fetching students.' });
        });
});

  router.get('/searchByFirstName',function(req,res,next){

    studentModel.find({firstName:req.query.firstName})
    .then(student=>{
        res.send(student)
    })
    .catch(err=>{
        console.error("Error occured while fetching...",err)
        res.status(500).send({status:500,message:'Error occured....'})
    })
  });


  //http://localhost:3000/students/searchByFirstName?firstName=srilatha


  router.get('/searchById',function(req,res,next){

    studentModel.findById(req.query.id)
    .then(student=>{
        res.send(student)
    })
    .catch(err=>{
        console.error("Error occured while fetching...",err)
        res.status(500).send({status:500,message:'Error occured....'})
    })
  });

  //http://localhost:3000/students/searchById/?id=660cfc0447e45f25ea744395


  router.put('/update', function(req, res, next) {
    const department = req.query.department;
    const firstName=req.query.firstName;
    studentModel.updateMany({firstName:firstName}, { $set: { department: department } })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).send({ status: 200, message: 'Students updated successfully.' });
            } else {
                res.status(404).send({ status: 404, message: 'student Not found' });
            }
        })
        .catch(err => {
            console.error("Error occurred while updating students:", err);
            res.status(500).send({ status: 500, message: 'Error occurred while updating students.' });
        });
});

router.put('/updateUser', function(req, res, next) {
    const id=req.query.userId;
    const firstName=req.query.firstName;
    studentModel.findByIdAndUpdate(id, { $set: { firstName: firstName } })
        .then(result => {
            //res.send(result)

            if (result) {
                res.status(200).send({ status: 200, message: 'Students updated successfully.' });
            } else {
                res.status(404).send({ status: 404, message: 'student Not found' });
            }
        })
        .catch(err => {
            console.error("Error occurred while updating students:", err);
            res.status(500).send({ status: 500, message: 'Error occurred while updating students.' });
        });
});

router.delete('/deleteUser',function(req,res,next){
    const id=req.query.id;
    studentModel.findByIdAndDelete(id)
    .then(result=>{
        if (result){
            res.status(200).send({status:200,message:'deleted successfully...'})
        }
        else{
            res.status(404).send({status:404,message:'error while deleting...'})
        }
    })
    .catch(err=>{
        res.status(500).send({status:500,message:'error while deleting...'})        
    })
})


module.exports = router;
