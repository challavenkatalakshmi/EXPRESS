var express=require('express');
var router=express.Router();

//   /products/
router.get('/',(req,res)=> {
    res.send('Get request for Products...')
})

//   /products/get-product-details/

router.get('/get-product-details',(req,res)=>{
    res.send('Get request for product details...')
})

module.exports=router;