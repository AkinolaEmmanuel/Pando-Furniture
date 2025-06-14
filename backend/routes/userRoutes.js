import express from 'express';
import { registerUser, loginUser, loginAdmin, getAllUsers, getUserById, getUserByEmail } from '../controllers/userController.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/loginAdmin', loginAdmin);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/email/:email', getUserByEmail);


export default router;