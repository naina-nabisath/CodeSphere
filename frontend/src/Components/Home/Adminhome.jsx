import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo.jpeg";
import Image from "../../assets/Image.jpg";
import CourseName from "../../assets/JavaScript.png";

import { Search, Plus, Megaphone, ArrowBigRight, Menu, X, LogOut, User, Users, GraduationCap, BookOpen, TrendingUp, ShieldCheck,} from "lucide-react";

function Adminhome() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getTeacherCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/teachers/count"
        );

        setTeacherCount(response.data.count);
      } catch (error) {
        console.log("Teacher count error:", error);
      }
    };

    const getStudentCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/students/count"
        );

        setStudentCount(response.data.count);
      } catch (error) {
        console.log("Student count error:", error);
      }
    };

    const getCourseCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course/courses/count"
        );

        setCourseCount(response.data.count);
      } catch (error) {
        console.log("Course count error:", error);
      }
    };

    const getTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/teacher/teacherDetails"
        );

        setTeachers(response.data.teachers || []);
      } catch (error) {
        console.log("Teacher details error:", error);
      }
    };

    const getCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/course"
        );

        setCourses(response.data || []);
      } catch (error) {
        console.log("Course error:", error);
      }
    };

    getTeacherCount();
    getStudentCount();
    getCourseCount();
    getTeachers();
    getCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const filteredCourses = courses.filter((course) =>
    course.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Please Login
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-6">
            <div
              onClick={() => navigate("/adminhome")}
              className="flex items-center gap-2 cursor-pointer shrink-0 group"
            >
              <img
                src={Logo}
                alt="CodeSphere"
                className="w-11 h-11 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  CodeSphere
                </h1>
                <p className="text-[8px] tracking-[0.2em] text-gray-500">
                  LEARN • BUILD • GROW
                </p>

              </div>

            </div>

            {/* DESKTOP NAVIGATION */}

            <div className="hidden md:flex items-center gap-8">

              <button
                onClick={() =>
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="relative text-gray-700 font-semibold hover:text-green-700 transition group"
              >

                Courses

                <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-green-700 transition-all duration-300 group-hover:w-full" />

              </button>

              <button
                onClick={() =>
                  navigate("/admin/exams")
                }
                className="relative text-gray-700 font-semibold hover:text-green-700 transition group"
              >

                Exams

                <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-green-700 transition-all duration-300 group-hover:w-full" />

              </button>

            </div>

            {/* SEARCH */}

            <div className="hidden md:flex flex-1 max-w-sm">

              <div className="relative w-full">

                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-gray-100 border border-transparent rounded-xl py-2.5 pl-11 pr-4 outline-none text-sm focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition"
                />

              </div>

            </div>

            {/* DESKTOP RIGHT */}

            <div className="hidden md:flex items-center gap-4">

              {/* PROFILE */}

              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >

                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">

                  <User
                    size={18}
                    className="text-green-700"
                  />

                </div>

                <span className="font-semibold text-gray-700 max-w-24 truncate">
                  {user.name}
                </span>

              </button>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-green-700 text-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-700 hover:text-white transition"
              >

                <LogOut size={17} />

                Logout

              </button>

            </div>

            {/* MOBILE BUTTON */}

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >

              {mobileMenu ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}

            </button>

          </div>

          {/* ================================================= */}
          {/* MOBILE MENU */}
          {/* ================================================= */}

          {mobileMenu && (

            <div className="md:hidden border-t border-gray-100 py-5 space-y-4">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-4 focus:ring-green-100"
                />

              </div>

              {/* COURSES */}

              <button
                onClick={() => {
                  setMobileMenu(false);

                  document
                    .getElementById("courses")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="block w-full text-left font-semibold text-gray-700 py-2"
              >
                Courses
              </button>

              {/* EXAMS */}

              <button
                onClick={() =>
                  navigate("/admin/exams")
                }
                className="block w-full text-left font-semibold text-gray-700 py-2"
              >
                Exams
              </button>

              {/* PROFILE */}

              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="flex items-center gap-3 w-full text-left font-semibold text-gray-700 py-2"
              >

                <User size={18} />

                Profile

              </button>

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full bg-green-700 text-white py-3 rounded-xl font-semibold"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </nav>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-400 text-white shadow-xl">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-green-900/10 rounded-full blur-3xl" />

          <div className="relative p-6 sm:p-10 lg:p-12">

            <div className="max-w-3xl">

              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">

                <ShieldCheck size={17} />

                Admin Dashboard

              </span>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">

                Welcome back,

                <span className="block text-green-100">
                  {user.name}
                </span>

              </h1>

              <p className="mt-4 text-green-50 text-base sm:text-lg max-w-xl leading-relaxed">

                Manage teachers, students, courses and
                announcements from your CodeSphere dashboard.

              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={() =>
                    navigate("/admin/generate-token")
                  }
                  className="group flex items-center justify-center gap-2 bg-white text-green-800 px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >

                  <Plus size={20} />

                  Generate Teacher Token

                  <ArrowBigRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </button>

                <button
                  onClick={() =>
                    navigate("/admin/announcement")
                  }
                  className="group flex items-center justify-center gap-2 border-2 border-white/70 text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-800 transition-all"
                >

                  <Megaphone size={19} />

                  Announcement

                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          {/* TEACHERS */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">

                <Users size={24} />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-900">
                  {teacherCount}
                </p>

                <p className="text-sm text-gray-500">
                  Teachers
                </p>

              </div>

            </div>

          </div>

          {/* STUDENTS */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">

                <GraduationCap size={24} />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-900">
                  {studentCount}
                </p>

                <p className="text-sm text-gray-500">
                  Students
                </p>

              </div>

            </div>

          </div>

          {/* COURSES */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">

                <BookOpen size={24} />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-900">
                  {courseCount}
                </p>

                <p className="text-sm text-gray-500">
                  Courses
                </p>

              </div>

            </div>

          </div>

          {/* SUBSCRIBERS */}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">

                <TrendingUp size={24} />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-900">
                  3,28,600
                </p>

                <p className="text-sm text-gray-500">
                  Subscribers
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        <section className="mt-12">

          <div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Quick Actions
            </h2>

            <p className="text-gray-500 mt-1">
              Manage your platform quickly
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">

            {/* GENERATE TOKEN */}

            <button
              onClick={() =>
                navigate("/admin/generate-token")
              }
              className="group bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition">

                  <Plus size={30} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Generate Token
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Add a new teacher to CodeSphere
                  </p>

                </div>

              </div>

            </button>

            {/* ANNOUNCEMENT */}

            <button
              onClick={() =>
                navigate("/admin/announcement")
              }
              className="group bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition">

                  <Megaphone size={30} />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-blue-700">
                    Announcement
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Publish a new announcement
                  </p>

                </div>

              </div>

            </button>

          </div>

        </section>

        {/* ================================================= */}
        {/* DASHBOARD CONTENT */}
        {/* ================================================= */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">

          {/* ================================================= */}
          {/* RECENT TEACHERS */}
          {/* ================================================= */}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-extrabold text-gray-900">
                  Recent Teachers
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Recently registered teachers
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/admin/teachers")
                }
                className="flex items-center gap-1 text-green-700 font-bold text-sm hover:gap-2 transition-all"
              >

                View All

                <ArrowBigRight size={18} />

              </button>

            </div>

            <div className="mt-6 space-y-4">

              {teachers.length > 0 ? (

                teachers.slice(0, 5).map((teacher) => (

                  <div
                    key={teacher._id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                  >

                    <img
                      src={Image}
                      alt="Teacher"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-gray-900 truncate">
                        {teacher.name}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {teacher.email}
                      </p>

                    </div>

                    <p className="text-xs text-gray-400 shrink-0">

                      {teacher.createdAt
                        ? new Date(
                            teacher.createdAt
                          ).toLocaleDateString()
                        : ""}

                    </p>

                  </div>

                ))

              ) : (

                <div className="py-10 text-center">

                  <Users
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-gray-500 mt-3">
                    No teachers found.
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* TOP COURSES */}
          {/* ================================================= */}

          <div
            id="courses"
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-extrabold text-gray-900">
                  Top Courses
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Courses available on CodeSphere
                </p>

              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="flex items-center gap-1 text-green-700 font-bold text-sm hover:gap-2 transition-all"
              >

                View All

                <ArrowBigRight size={18} />

              </button>

            </div>

            <div className="mt-6 space-y-4">

              {filteredCourses.length > 0 ? (

                filteredCourses
                  .slice(0, 5)
                  .map((course) => (

                    <div
                      key={course._id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                    >

                      <img
                        src={CourseName}
                        alt="Course"
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-gray-900 truncate">
                          {course.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          {course.teacherName ||
                            "CodeSphere Course"}
                        </p>

                      </div>

                      <BookOpen
                        size={20}
                        className="text-green-700 shrink-0"
                      />

                    </div>

                  ))

              ) : (

                <div className="py-10 text-center">

                  <BookOpen
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-gray-500 mt-3">
                    {search
                      ? "No courses found."
                      : "No courses available."}
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* REVENUE OVERVIEW */}
        {/* ================================================= */}

        <section className="mt-6">

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-extrabold text-gray-900">
                  Revenue Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Platform revenue overview
                </p>

              </div>

              <TrendingUp
                size={24}
                className="text-green-700"
              />

            </div>

            <div className="h-64 mt-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">

              <div className="text-center">

                <TrendingUp
                  size={45}
                  className="mx-auto text-green-600"
                />

                <p className="text-gray-600 font-semibold mt-3">
                  Revenue analytics
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Revenue data will appear here
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Adminhome;