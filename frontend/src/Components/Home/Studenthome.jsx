import Logo from '../../assets/Logo.jpeg'
import Image from '../../assets/Image.jpg'
import { ArrowBigRight, ArrowRight, Bell, BookOpen, Play, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Studenthome() {
  
  return (
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
        <div className='flex gap-x-4'>
          <Bell size={50} />
          <div className="side-nav-items">
            <input type="text" placeholder="Search..." />
            <Search />
          </div>
          <div className="side-nav-buttons">
            <button className="Login">Log Out</button>
          </div>
        </div>

        <div className='flex gap-2 items-center border-2 p-3 bg-green-700 text-white'>
          <div className=''>
            <img src={Image} alt="" className='w-15 h-15 border-2 rounded-4xl' />
          </div>
          <div>
            <h1>Name</h1>
          </div>
          <div>
            <button>v</button>
          </div>
        </div>

      </div>

      <div className='flex justify-around border-2 p-2 m-5 bg-gradient-to-r from-green-600 to-green-100'>
        <div>
          <h1 className='text-5xl font-bold m-3 p-3'>Welcome back Name!</h1>
          <h1 className='text-gray-600 text-3xl m-3 p-3 font-bold'>Keep learning and achive your goals. <br></br> You're doing great!</h1>
          <div className='flex gap-10 m-3 p-3'>
            <button className='flex gap-3 bg-green-700 text-white text-3xl p-3 rounded-3xl'>Browse Course <ArrowBigRight size={50} fill='white' /> </button>
            <button className='flex gap-3 border-4 border-green-700 text-white text-3xl p-3 rounded-3xl'>Continue Learning <Play size={50} fill='green' stroke='green' /> </button>
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
              <div><BookOpen size={50} /></div>
              <div className='font-bold'>
                <h1>8</h1>
                <h2>Courses Enrolled</h2>
              </div>
            </div>
            <div className='flex gap-3'>
              <div><BookOpen size={50} /></div>
              <div className='font-bold'>
                <h1>8</h1>
                <h2>Courses Enrolled</h2>
              </div>
            </div>
            <div className='flex gap-3'>
              <div><BookOpen size={50} /></div>
              <div className='font-bold'>
                <h1>8</h1>
                <h2>Courses Enrolled</h2>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="p-5 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Continue Learning
          </h1>
          <button className="bg-green-800 px-10 py-5 rounded-3xl text-white text-xl font-bold">
            View All <ArrowRight />
          </button>
        </div>

        <div className="mt-12">
          {categories.map((categoryItem) => {
            const categoryCourses = myCourses.filter((course) =>
              course.category &&
              course.category._id === categoryItem._id
            );
            if (categoryCourses.length === 0) {
              return null;
            }

            return (
              <div
                key={categoryItem._id}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 ">
                  {categoryItem.name}
                </h2>
                <div className="grid grid-cols-3 gap-10 ">
                  {categoryCourses.map((course) => (
                    <div
                      key={course._id}
                      className="border-2 border-gray-200 rounded-2xl overflow-hidden p-5"
                    >
                      <div className="w-118 h-56 bg-gray-200 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-500">
                          {course.title}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mt-5">
                        {course.title}
                      </h3>
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2">
                          <Star size={35} fill="gold" strokeWidth={0} />
                          <span className="text-xl font-semibold">
                            4.8 (120)
                          </span>
                        </div>
                        <span className="text-xl font-semibold">
                          12 Lessons
                        </span>
                      </div>
                      <p className="text-xl font-bold text-green-700 mt-5">
                        $ 5.2
                      </p>
                      <p className='text-lg text-gray-500 mt-2'>
                        Teacher: {course.teacherName}
                      </p>
                      <div className="flex justify-center mt-5">
                        <button className="border-2 border-green-700 text-green-700 px-10 py-3 rounded-3xl text-xl font-semibold hover:bg-green-700 hover:text-white transition">
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {myCourses.length === 0 && (
            <p className="text-xl text-gray-500">
              No courses added yet.
            </p>
          )}
        </div>

      </div>

    </div>
  )
}

export default Studenthome