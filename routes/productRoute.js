import express from 'express';
import * as productController from '../controllers/productController.js';
import upload from '../multer.js'

const router = express.Router();

router.get('/product', productController.getAllProducts)
router.get('/product/:id', productController.getOneProduct)
router.post('/product', upload.single('image'),productController.createProduct)
router.put('/product/:id', upload.single('image'),productController.updateProduct)
router.delete('/product/:id',productController.deleteProduct)


export default router;



// const express=require("express")

// const upload=require("../multer")
// const router=express.Router()
// const{   getProduct,
//     getsProduct,
//     getProductsByFlavor,
//     createProduct,
//     deleteProduct,
//     updateProduct
 
// }=require('../controllers/productsController')
// router.get("/", getProduct);

// router.get("/:id", getsProduct);

// router.get("/flavor", getProductsByFlavor);

//   router.post("/",upload.single("images"), createProduct)

// router.delete("/delete/:id", deleteProduct);

// router.patch("/update/:id", updateProduct);


//   router.put("/:id", updateProduct)
  


  //  module.exports=router