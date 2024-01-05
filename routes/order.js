import express from "express"
import orderController from "../controllers/orderandorderitemscontroller.js"



const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

export default router