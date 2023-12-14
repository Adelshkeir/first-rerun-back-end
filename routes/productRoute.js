import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)


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