const express=require('express')
const router=express.Router()
const contact=require('../models/contact')

router.get('/',(req,res)=>{
    res.send('api contact called...')
})

router.post('/contact',async(req,res)=>{
    try{
        const newContact=new contact(req.body)
        await newContact.save()
        .then((savedContact)=>{
            console.log(savedContact)
            res.status(201).json({msg:'Contact successfully saved'})
        })
        .catch((error)=>{
            if(error.code===11000 && error.keyPattern && error.keyPattern.emailAddress){
                res.status(500).json({msg:"Email address already exists..."})
            }
            else{
                res.status(500).json({msg:'unable to save new contact'})
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).json({msg:'unable to save new contact...'})
    }
})

router.get('/contact/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        await contact.findById(id)
        .then((contact)=>{
            console.log(contact);
            res.status(200).json({contact:contact});
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({msg:"unable to get the contact"});
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"unable to get the contact"})
    }
})


// router.get('/contact/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const foundContact = await contact.findById(id);
//         if (foundContact) {
//             console.log(foundContact);
//             res.status(200).json({ contact: foundContact });
//         } else {
//             res.status(404).json({ msg: "Contact not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: "Unable to get the contact" });
//     }
// });


router.get('/contact',async (req,res)=>{
    try{
        contact.find()
        .then((contacts)=>{
            console.log(contacts)
            res.status(200).json({contacts:contacts})
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"unable to get contacts"})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'unable to get contacts'})
    }
})

router.get('/search',async(req,res)=>{
    try{
        const searchTerm=req.query.searchTerm;
        const searchRegex=new RegExp(searchTerm,"i")

        await contact.find({
            $or:[
                {firstName:searchRegex},
                {lastName:searchRegex},
                {emailAddress:searchRegex}
            ]
        })
        .then((contacts)=>{
            console.log(contacts);
            res.status(200).json({contacts:contacts})
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).json({msg:'unable to find contacts'})
        })

    }catch(error){
        console.log(error);
        res.status(500).json({msg:'No matching records'})
    }
})

router.put('/contact/:id',async(req,res) => {
    try{
        const id=req.params.id;
        const updatedContact=req.body;
        await contact.findOneAndUpdate({_id:id},updatedContact,{new:true})
        .then((updatedContact)=>{
            res.status(200).json({msg:"contact successfully updated...",contact:updatedContact})
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:'didnot get the contact...'})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'Unable to update the contact...'})
    }
})

router.delete('/contact/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await contact.findByIdAndDelete(id)
        .then((deletedContact)=>{
            console.log(deletedContact);
            res.status(200).json({msg:'Contact successfully deleted...'})
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:'Havenot find that contact'})
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Unable to delete the contact...'})        
    }
})

module.exports=router