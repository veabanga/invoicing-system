import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile
} from '../controllers/userController.js'
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/logout').post(logoutUser);


export default router;