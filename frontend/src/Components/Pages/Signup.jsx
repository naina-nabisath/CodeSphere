import './Signup.css'
import axios from "axios"
import Logo from '../../assets/Logo.jpeg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpasword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != cpassword) {
      alert("Password do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/user/signup", {
        name: name,
        email: email,
        password: password,
        role: role,
      });
    } catch (error) {
      console.log(error)
    }

    navigate(`/login?role=${role}`);
  }

  return (
    <div className="flex flex-col justify-center items-center p-5 ">
      <div className="logo">
        <img src={Logo} alt="logo"/>
        <h1>CodeSphere</h1>
      </div>
      <div className='text-center'>
        <h1 className='text-4xl font-lighter '>Create Your Account</h1>
        <h1 className='text-3xl text-gray-700'>Join thousands of learners and educators</h1>
      </div>
      <div className="w-250 h-screen m-5">
        <h1 className=' text-2xl font-bold '>Sign Up as</h1>
        <div className='flex gap-30 justify-center p-3'>
          <div onClick={() => { setRole('admin') }} className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "admin" ? "bg-green-800 text-white" : "border-gray-200"
            }`}>
            <h1>Admin</h1>
          </div>
          <div onClick={() => { setRole('teacher') }} className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "teacher" ? "bg-green-800 text-white" : "border-gray-200"
            }`}>
            <h1>Teacher</h1>
          </div>
          <div onClick={() => { setRole('student') }} className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "student" ? "bg-green-800 text-white" : "border-gray-200"
            }`}>
            <h1>Student</h1>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className='mt-3 flex flex-col '>
            <label htmlFor="name" className='text-2xl font-bold'>Full Name</label>
            <input type="text"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border-2 w-250 p-3'
              placeholder='Enter Your Full Name' />
            <label htmlFor="email" className='text-2xl font-bold'>Email</label>
            <input type="text"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 w-250 p-3'
              placeholder='Enter Email' />
            <label htmlFor="password" className='text-2xl font-bold'>Password</label>
            <input type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 w-250 p-3'
              placeholder='Create a passsword' />
            <label htmlFor="cpassword" className='text-2xl font-bold'>Confirm Password</label>
            <input type="password"
              name='cpassword'
              value={cpassword}
              onChange={(e) => setCpasword(e.target.value)}
              className='border-2 w-250 p-3'
              placeholder='Confirm your password' />
          </div>
          <div className='m-5 border-2 h-20 rounded-4xl bg-green-800 flex items-center justify-center cursor-pointer'>
            <button type='submit' className='text-white text-4xl'>Sign Up</button>
          </div>
        </form>
        <div className='flex justify-center'>
          <h3 className='text-3xl font-bold'>Already have an account? </h3>
          <h3 className='text-3xl font-bold text-green-800 cursor-pointer' onClick={() => navigate('/login')}>Login</h3>
        </div>
      </div>
    </div>
  )
}

export default Signup