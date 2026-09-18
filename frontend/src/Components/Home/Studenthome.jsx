import './Studenthome.css'
import Logo from '../../assets/Logo.jpeg'
import { Search, BookOpen, ArrowBigRight, Play, NotebookText, TimerIcon, Medal, Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Studenthome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course"
        );

        setCourses(response.data);
      } catch (error) {
        console.log("Course error:", error);
      }
    };
    getCourses();
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Please LogIn</h1>
      </div>
    )
  }
  console.log("Logged in user: ", user);

  return (
    <>
      <div>
        <div className="navbar-container">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>CodeSphere</h1>
          </div>
          <div>
            <ul className="nav-items">
              <li>Courses</li>
              <li>Exams</li>
            </ul>
          </div>
          <div>
            <Bell />
          </div>
          <div className="side-nav-items">
            <input type="text" placeholder="Search..." />
            <Search />
          </div>
          <div className="side-nav-buttons">
            <button className="Login">Log Out</button>
          </div>
        </div>

        <div className='flex justify-around border-2 p-2 m-5 bg-linear-to-r from-green-600 to-green-100'>
          <div>
            <h1 className='text-5xl font-bold m-3 p-3'>Welcome back {user.name}</h1>
            <h1 className='text-gray-600 text-3xl m-3 p-3 font-bold'>Keep learning and achive your goals. <br></br> You're doing great!</h1>
            <div className='flex gap-10 m-3 p-3'>
              <button className='flex gap-3 bg-green-700 text-white text-3xl p-3 rounded-3xl'>
                Browse Course <ArrowBigRight size={50} fill='white' />
              </button>
              <button className='flex gap-3 border-4 border-green-700 text-white text-3xl p-3 rounded-3xl'>
                Continue Learning <Play size={50} fill='green' stroke='green' />
              </button>
            </div>
          </div>
          <div className='flex flex-col  items-center justify-around'>
            <h1 className='text-3xl font-bold'>Your Learning Progress</h1>
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" >
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#16a34a" strokeWidth="10" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="62.8" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  75%
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className='m-3 flex flex-col gap-3 items-center justify-center'>
              <div className='flex gap-3'>
                <div><BookOpen size={50} /></div>
                <div className='font-bold'>
                  <h1>8</h1>
                  <h2>Courses Enrolled</h2>
                </div>
              </div>
              <div className='flex gap-3'>
                <div><NotebookText size={50} /></div>
                <div className='font-bold'>
                  <h1>24</h1>
                  <h2>Lesson Completed</h2>
                </div>
              </div>
              <div className='flex gap-3'>
                <div><TimerIcon size={50} /></div>
                <div className='font-bold'>
                  <h1>12h 43m</h1>
                  <h2>Total Time Spented</h2>
                </div>
              </div>
              <div className='flex gap-3'>
                <div><Medal size={50} /></div>
                <div className='font-bold'>
                  <h1>3</h1>
                  <h2>Certificate Earned</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Recomended for you</h1>
            <h1 className='flex text-green-600 font-bold'>View All <ArrowBigRight fill='green' stroke='green' /> </h1>
          </div>
          <div className="mt-12">
            {courses.length > 0 ? (
              <div className="grid grid-cols-3 gap-10">
                {courses.slice(0, 6).map((course) => (
                  <div key={course._id} className="border-2 border-gray-200 rounded-2xl overflow-hidden p-5" >
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-500">{course.title}</span>
                    </div>
                    <h3 className="text-2xl font-bold mt-5">{course.title}</h3>
                    <div className="flex justify-center mt-5">
                      <button className="border-2 border-green-700 text-green-700 px-10 py-3 rounded-3xl text-xl font-semibold hover:bg-green-700 hover:text-white transition">
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl text-gray-500">No courses added yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Studenthome