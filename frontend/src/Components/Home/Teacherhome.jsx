import Logo from "../../assets/Logo.jpeg";
import { Search, Plus, BookOpenCheck, Star, Menu, X, LogOut, User, BookOpen, ArrowBigRight, } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Teacherhome() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

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
        console.log("Course error:", error);
      }
    };

    getCategories();
    getCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

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

  const myCourses = courses.filter((course) => {
    if (!course.teacher) {
      return false;
    }

    const teacherId =
      typeof course.teacher === "object"
        ? course.teacher._id
        : course.teacher;

    return teacherId?.toString() === user.id?.toString();
  });

  const filteredCourses = myCourses.filter((course) =>
    course.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-6">
            <div
              onClick={() => navigate("/teacherhome")}
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
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => {
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="relative text-gray-700 font-semibold hover:text-green-700 transition group"
              >
                Courses
                <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-green-700 transition-all duration-300 group-hover:w-full" />
              </button>
              <button className="relative text-gray-700 font-semibold hover:text-green-700 transition group">
                Exams
                <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-green-700 transition-all duration-300 group-hover:w-full" />
              </button>

            </div>
            <div className="hidden md:flex flex-1 max-w-sm">
              <div className="relative w-full">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search my courses..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-gray-100 border border-transparent rounded-xl py-2.5 pl-11 pr-4 outline-none text-sm focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition" >
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
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-green-700 text-green-700 px-4 py-2 rounded-xl font-semibold hover:bg-green-700 hover:text-white transition"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
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
          {mobileMenu && (
            <div className="md:hidden border-t border-gray-100 py-5 space-y-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search my courses..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-4 focus:ring-green-100"
                />
              </div>
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
              <button
                onClick={() => navigate("/teacher/exams")}
                className="block w-full text-left font-semibold text-gray-700 py-2"
              >
                Exams
              </button>
              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="flex items-center gap-3 w-full text-left font-semibold text-gray-700 py-2"
              >
                <User size={18} />
                Profile
              </button>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-400 text-white shadow-xl">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-green-900/10 rounded-full blur-3xl" />
          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                Teacher Dashboard 👨‍🏫
              </span>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Welcome back,
                <span className="block text-green-100">
                  {user.name}
                </span>
              </h1>
              <p className="mt-4 text-green-50 text-base sm:text-lg max-w-xl leading-relaxed">
                Manage your courses, create new learning
                content and help students grow their skills.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">

              </div>
            </div>
          </div>
        </section>
        
        <section className="mt-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Quick Actions
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your teaching activities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
            <button
              onClick={() =>
                navigate("/teacher/addcourse")
              }
              className="group bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition">
                  <Plus size={30} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700">
                    Create Course
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Add a new course for students
                  </p>
                </div>
              </div>
            </button>
            <button
              onClick={() =>
                navigate("/teacher/exams")
              }
              className="group bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition">
                  <BookOpenCheck size={30} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-700">
                    Create Exam
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Create an exam for your students
                  </p>
                </div>
              </div>
            </button>
          </div>
        </section>
        <section
          id="courses"
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                My Courses
              </h2>
              <p className="text-gray-500 mt-1">
                Manage the courses you have created
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-green-700 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-800 transition">
              <h1 className="flex gap-3"> View All <ArrowBigRight /> </h1>
            </button>
          </div>
          <div className="mt-8">
            {categories.map((categoryItem) => {
              const categoryCourses =
                filteredCourses.filter((course) => {
                  if (!course.category) {
                    return false;
                  }
                  const categoryId =
                    typeof course.category === "object"
                      ? course.category._id
                      : course.category;
                  return (
                    categoryId?.toString() ===
                    categoryItem._id?.toString()
                  );
                });
              if (categoryCourses.length === 0) {
                return null;
              }
              return (
                <div
                  key={categoryItem._id}
                  className="mb-12"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {categoryItem.name}
                      </h2>
                      <p className="text-gray-500 mt-1">
                        {categoryCourses.length}{" "}
                        {categoryCourses.length === 1
                          ? "course"
                          : "courses"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryCourses.map((course) => (
                      <div
                        key={course._id}
                        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-green-700/0 group-hover:bg-green-700/5 transition" />
                          <BookOpen
                            size={55}
                            className="text-green-700/40 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Star
                                size={20}
                                fill="gold"
                                strokeWidth={0}
                              />
                              <span className="text-sm font-semibold text-gray-700">
                                4.8 (120)
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-500">
                              12 Lessons
                            </span>
                          </div>
                          <p className="text-lg font-bold text-green-700 mt-4">
                            $ 5.2
                          </p>
                          
                          <button
                            onClick={() =>
                              console.log(
                                "Course:",
                                course._id
                              )
                            }
                            className="mt-5 w-full border-2 border-green-700 text-green-700 py-2.5 rounded-xl font-semibold hover:bg-green-700 hover:text-white transition-all"
                          >
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
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                <BookOpen
                  size={50}
                  className="mx-auto text-gray-300"
                />
                <p className="text-lg font-semibold text-gray-500 mt-4">
                  You haven't added any courses yet.
                </p>
                <button
                  onClick={() =>
                    navigate("/teacher/addcourse")
                  }
                  className="mt-5 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
                >
                  Create Your First Course
                </button>
              </div>
            )}
            {myCourses.length > 0 &&
              filteredCourses.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                  <Search
                    size={50}
                    className="mx-auto text-gray-300"
                  />
                  <p className="text-lg font-semibold text-gray-500 mt-4">
                    No courses found.
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try searching with another course name.
                  </p>
                </div>
              )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Teacherhome;