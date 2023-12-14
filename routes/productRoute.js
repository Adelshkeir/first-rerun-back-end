
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

  import express from 'express';
  import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
  } from '../controllers/productsController.js'; 
  
  const router = express.Router();
  
  // Route to get all products
  router.get('/', getAllProducts);
  
  // Route to get a product by ID
  router.get('/:id', getProductById);
  
  // Route to create a new product
  router.post('/', createProduct);
  
  // Route to update a product by ID
  router.put('/:id', updateProductById);
  
  // Route to delete a product by ID
  router.delete('/:id', deleteProductById);
  
  export default router;
  