import './Login.css'
import axios from "axios"
import Logo from '../../assets/Logo.jpeg'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [role, setRole] = useState(searchParams.get("role") || "")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/user/login", {
                email: email,
                password: password,
                role: role,
            });
            
            console.log(response.data);
localStorage.setItem("token", response.data.token);

console.log("Logged in role:", response.data.user.role);

if (response.data.user.role === "student") {
    navigate("/studenthome");
} else if (response.data.user.role === "teacher") {
    navigate("/teacherhome");
} else if (response.data.user.role === "admin") {
    navigate("/adminhome");
}

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col justify-center items-center p-5 ">
            <div className="logo">
                <img src={Logo} alt="logo" />
                <h1>CodeSphere</h1>
            </div>
            <div className='text-center'>
                <h1 className='text-4xl font-lighter '>Welcome Back!</h1>
                <h1 className='text-3xl text-gray-700'>Login to continue your learning journey</h1>
            </div>
            <div className="w-250 h-screen m-5">
                <h1 className=' text-2xl font-bold '>Login as</h1>
                <div className='flex gap-30 justify-center p-3'>
                    <div
                        onClick={() => setRole("admin")}
                        className={`border-6 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "admin" ? "bg-green-800 text-white" : "border-gray-200"
                            }`}
                    >
                        <h1>Admin</h1>
                    </div>
                    <div
                        onClick={() => setRole("teacher")}
                        className={`border-6 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "teacher" ? "bg-green-800 text-white" : "border-gray-200"
                            }`}
                    >
                        <h1>Teacher</h1>
                    </div>
                    <div
                        onClick={() => setRole("student")}
                        className={`border-6 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "student" ? "bg-green-800 text-white" : "border-gray-200"
                            }`}
                    >
                        <h1>Students</h1>
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mt-3 flex flex-col '>
                        <label htmlFor="email" className='text-2xl font-bold'>Email</label>
                        <input type="text"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 w-250 p-3'
                            placeholder='Enter Email' />
                        <div className='flex justify-between'>
                            <label htmlFor="password" className='text-2xl font-bold'>Password</label>
                            <h1 className='text-green-800 font-bold text-2xl'>Forget Password?</h1>
                        </div>
                        <input type="password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 w-250 p-3'
                            placeholder='Enter your passsword' />
                    </div>
                    <div className='m-5 border-2 h-20 rounded-4xl bg-green-800 flex items-center justify-center cursor-pointer'>
                        <button type='submit' className='text-white text-4xl'>Login</button>
                    </div>
                </form>
                <div className='flex justify-center'>
                    <h3 className='text-3xl font-bold'>Don't have an account? </h3>
                    <h3 className='text-3xl font-bold text-green-800 cursor-pointer' onClick={() => { navigate('/signup') }}>SignUp</h3>
                </div>
            </div>
        </div>
    )
}

export default Login