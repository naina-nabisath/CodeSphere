import express from 'express';
import { getStudentCount, getTeacher, getTeacherCount, googleLogin, googleSignup, loginUser, registerUser } from '../Controller/userController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/teachers/count', getTeacherCount);
router.get('/students/count', getStudentCount);
router.get('/teacherDetails', getTeacher);
router.post("/google-signup", googleSignup);
router.post("/google-login", googleLogin);

export default router; 