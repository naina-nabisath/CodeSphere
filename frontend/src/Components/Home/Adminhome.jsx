import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo.jpeg'
import Image from '../../assets/Image.jpg'
import CourseName from '../../assets/JavaScript.png'
import { ArrowBigRight, Megaphone, Plus, Search } from "lucide-react"
import axios from 'axios'

function Adminhome() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [teacher, setTeacher] = useState([]);
  const [course, setCourse] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getTeacherCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/teachers/count"
        );
        setTeacherCount(response.data.count);
      } catch (error) {
        console.log("User Error: ", error);
      }
    };

    const getStudentCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/students/count"
        );
        setStudentCount(response.data.count);
      } catch (error) {
        console.log("User Error: ", error);
      }
    };

    const getCourseCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course/courses/count"
        );
        setCourseCount(response.data.count);
      } catch (error) {
        console.log("User Error: ", error);
      }
    };

    const getTeacher = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/teacher/teacherDetails"
        );
        setTeacher(response.data.teachers)
      } catch (error) {
        console.log("Teacher details", error);
      }
    }

    const getCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course"
        );

        setCourse(response.data);
      } catch (error) {
        console.log("Course error:", error);
      }
    };
    getCourse();
    getTeacher();
    getCourseCount();
    getStudentCount();
    getTeacherCount();
  }, []);

  if (!user) {
    return (
      <div>
        No users
      </div>
    )
  }

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
        <div className="side-nav-items">
          <input type="text" placeholder="Search..." />
          <Search />
        </div>
        <div className="side-nav-buttons">
          <button className="Login">Log Out</button>
        </div>
      </div>
      <div className="p-5 text-4xl font-bold">
        <div className="p-10 flex gap-10 justify-around">
          <div className="border-2 border-gray-400 p-5 flex gap-5 items-center cursor-pointer" >
            <div className="border-2 border-gray-400 rounded-4xl p-5 w-18 bg-green-200 flex items-center justify-center">
              <Plus />
            </div>
            <div>
              <h1 className="text-green-600">Generate Token</h1>
              <h3 className="text-2xl text-gray-500">Add New Teacher</h3>
            </div>
          </div>
          <div className="border-2 border-gray-400 p-5 flex gap-5 items-center cursor-pointer" >
            <div className="border-2 border-gray-400 rounded-4xl p-5 w-18 bg-green-200 flex items-center justify-center">
              <Megaphone />
            </div>
            <div>
              <h1 className="text-green-600"> Announcement </h1>
              <h3 className="text-2xl text-gray-500">
                Add a new Announcement
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-around text-4xl font-bold'>
        <div className='text-center'>
          <h1>{teacherCount}</h1>
          <h1>Teachers</h1>
        </div>
        <div className='text-center'>
          <h1>{studentCount}</h1>
          <h1>Students</h1>
        </div>
        <div className='text-center'>
          <h1>{courseCount}</h1>
          <h1>Courses</h1>
        </div>
        <div className='text-center'>
          <h1>3,28,600</h1>
          <h1>Subscriber</h1>
        </div>

      </div>

      <div className='p-5 m-5 flex gap-2 justify-around'>
        <div className='border-2  p-5'>
          <div className="flex gap-2 items-center">
            <h1 className="text-1xl font-bold">Recomended for you</h1>
            <h1 className='flex text-green-600 font-bold'>View All <ArrowBigRight fill='green' stroke='green' /> </h1>
          </div>
          <div>
            <div className="flex flex-col">

              {teacher.map((teacher) => (
                <div key={teacher._id} className="my-2 flex items-center gap-5">
                  <img src={Image} alt="TeacherImage" className="w-15 h-15 rounded-full" />
                  <p className="w-40">{teacher.name}</p>
                  <p>{new Date(teacher.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="flex gap-2 items-center border-2 p-5">
          <h1 className="text-1xl font-bold">Revenue Overview</h1>
        </div>
        <div className="flex flex-col gap-2 items-center border-2 p-5">
          <div className="flex gap-2 items-center">
            <h1 className="text-1xl font-bold">Top Courses</h1>
            <h1 className='flex text-green-600 font-bold'>View All <ArrowBigRight fill='green' stroke='green' /> </h1>
          </div>
          <div className="my-5">
            {course.slice(0, 5).map((course) => (
              <div key={course._id} className="my-2 flex items-center gap-5" >
                <img src={CourseName} alt="CourseImage" className="w-15 h-15 rounded-3xl" />
                <p className="w-40">{course.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminhome