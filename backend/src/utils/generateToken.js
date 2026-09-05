import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'

const generateToken=(student_id)=>{
    try{
        const token = jwt.sign({student_id}, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })
        return token
    } catch(error) {
        console.error('token generation failed', error)
    }
}

export default generateToken;