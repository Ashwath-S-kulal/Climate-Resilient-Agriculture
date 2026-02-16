import express from 'express';
import { deleteUser, getAllUsers, updateUserRole } from '../controllers/admin.controller.js';
import {verifyToken} from '../utils/VerifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';


const router = express.Router();

router.get('/getallusers',verifyToken,verifyAdmin,getAllUsers); 
router.delete('/deleteuser/:id',verifyToken,verifyAdmin,deleteUser); 
router.put("/:id/role", verifyToken, verifyAdmin, updateUserRole);


export default router;
