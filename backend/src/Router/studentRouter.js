import express from 'express';
import { registerStudent } from '../Controller/studentController.js';
const router = express.Router();

router.post('/signup', registerStudent);

export default router; 