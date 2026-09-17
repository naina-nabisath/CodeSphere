import './Teacherhome.css'
import Logo from '../../assets/Logo.jpeg'
import { Search, Plus, BookOpenCheck, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Teacherhome() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);


  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.log("Category error:", error);
      }
    };

    const getCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course"
        );
        setCourses(response.data);
      } catch (error) {
        console.log("Course error: ", error);
      }
    };

    getCategories();
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
  console.log("All courses: ", courses);

  const myCourses = courses.filter(
    (course) =>
      course.teacher &&
      course.teacher.toString() === user.id.toString()
  );

  console.log("My Course: ", myCourses);



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
        <div className="p-5">
          <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
          <p className="text-xl text-gray-500 mt-2">Role: {user.role}</p>
        </div>


        <h1> Quick Actions </h1>
        <div className="p-10 flex gap-10 justify-around">
          <div className="border-2 border-gray-400 p-5 flex gap-5 items-center cursor-pointer" >
            <div className="border-2 border-gray-400 rounded-4xl p-5 w-18 bg-green-200 flex items-center justify-center">
              <Plus />
            </div>
            <div>
              <h1 className="text-green-600">Create Course</h1>
              <h3 className="text-2xl text-gray-500">
                Add a new course
              </h3>
            </div>
          </div>
          <div className="border-2 border-gray-400 p-5 flex gap-5 items-center cursor-pointer" >
            <div className="border-2 border-gray-400 rounded-4xl p-5 w-18 bg-green-200 flex items-center justify-center">
              <BookOpenCheck />
            </div>
            <div>
              <h1 className="text-green-600"> Create Exam </h1>
              <h3 className="text-2xl text-gray-500">
                Add a new Exam
              </h3>
            </div> 
          </div>
        </div>
      </div>



      <div className="p-5 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            My Courses
          </h1>
          <button className="bg-green-800 px-10 py-5 rounded-3xl text-white text-xl font-bold"
            onClick={() => { navigate('../teacher/addcourse') }} >
            Add Course
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

export default Teacherhome