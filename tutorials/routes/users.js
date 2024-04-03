const express=require('express')
const router=express.Router()

router.get('/user-details/:id',(req,res)=>{
    res.send('Get request for specific user '+req.params.id)
})

router.get('/search-by-location/:state/:city',(req,res)=>{
    res.send('Get request for searching by location: state '+req.params.state+' city '+req.params.city)
})

router.get('/search/:key([0-9]{4})',(req,res)=>{
    res.send('data captured is: '+req.params.key)
})

router.get('/search-username/:key([a-zA-Z]{5})',(req,res)=>{
    res.send('username is: '+req.params.key)
})

//wildcard 

router.get('*',(req,res)=>{
    var resObj={
        statusCode:404,
        statusMsg:'URL not found...',
    }
    res.send(resObj
        
        
        
        
        
        )
})

module.exports=router