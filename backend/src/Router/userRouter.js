import express from 'express';
import { loginUser, registerUser } from '../Controller/userController.js';
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
// router.get('/studenthome');

export default router; 