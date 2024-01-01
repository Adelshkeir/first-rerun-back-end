import express from "express";
import * as userController from '../controllers/userController.js';

const router = express.Router();

import Protect from "../middlewares/authMiddleware.js"

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/me',Protect,userController.getUser)







export default router