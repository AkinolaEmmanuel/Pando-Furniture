import express from 'express';
import { registerUser, loginUser, loginAdmin, getAllUsers, getUserById, getUserByEmail } from '../controllers/userController.js';
import auth from '../middleware/auth.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/loginAdmin', loginAdmin);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/users/email/:email', getUserByEmail);
router.get('/me', auth, async (req, res) => {
    const user = await getUserByEmail(req.user.email);
    res.status(200).json({ message: 'User retrieved successfully', data: user });
});


export default router;