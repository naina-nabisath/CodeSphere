import Logo from "../../assets/Logo.jpeg";
import { Search, BookOpen, ArrowBigRight, Play, NotebookText, TimerIcon, Medal, Bell, Menu, X, LogOut, User} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Studenthome() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

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

  const filteredCourses = courses
    .filter((course) =>
      course.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 6);

    return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-6">
            <div
              onClick={() => navigate("/studenthome")}
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

              <button
                className="relative text-gray-700 font-semibold hover:text-green-700 transition group"
              >
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
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-gray-100 border border-transparent rounded-xl py-2.5 pl-11 pr-4 outline-none text-sm focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">

              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-green-50 transition"
              >
                <Bell
                  size={21}
                  className="text-gray-700"
                />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
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
                  placeholder="Search courses..."
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
                className="block w-full text-left font-semibold text-gray-700 py-2"
              >
                Exams
              </button>
              <button
                onClick={() => navigate("/profile")}
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
          <div className="relative grid lg:grid-cols-3 gap-8 p-6 sm:p-10 lg:p-12">
           <div className="lg:col-span-2">
              <span className="inline-flex items-center bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                Keep going 🚀
              </span>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Welcome back,
                <span className="block text-green-100">
                  {user.name}
                </span>
              </h1>
              <p className="mt-4 text-green-50 text-base sm:text-lg max-w-xl leading-relaxed">
                Keep learning and achieve your
                goals. You're doing great!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="group flex items-center justify-center gap-2 bg-white text-green-800 px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Browse Courses
                  <ArrowBigRight
                    size={21}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button className="group flex items-center justify-center gap-2 border-2 border-white/70 text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-800 transition-all">
                  <Play
                    size={19}
                    fill="currentColor"
                  />
                  Continue Learning
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold">
                Your Learning Progress
              </h2>
              <div className="relative w-36 h-36 mt-5">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="62.8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold">
                      75%
                    </span>
                    <p className="text-xs text-green-100">
                      Completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  8
                </p>
                <p className="text-sm text-gray-500">
                  Courses Enrolled
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
                <NotebookText size={24} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  24
                </p>
                <p className="text-sm text-gray-500">
                  Lessons Completed
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">
                <TimerIcon size={24} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  12h 43m
                </p>
                <p className="text-sm text-gray-500">
                  Total Time Spent
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
                <Medal size={24} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  3
                </p>
                <p className="text-sm text-gray-500">
                  Certificates Earned
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="courses"
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Recommended for you
              </h2>
              <p className="text-gray-500 mt-1">
                Continue building your skills
              </p>
            </div>
            <button className="flex items-center gap-1 text-green-700 font-bold hover:gap-2 transition-all">
              View All
              <ArrowBigRight size={20} />
            </button>
          </div>
          <div className="mt-7">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(
                  (course) => (
                    <div
                      key={course._id}
                      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-green-700/0 group-hover:bg-green-700/5 transition" />
                        <BookOpen
                          size={50}
                          className="text-green-700/40 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Learn practical skills and
                          improve your knowledge.
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
                  )
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                <BookOpen
                  size={45}
                  className="mx-auto text-gray-300"
                />
                <p className="text-lg font-semibold text-gray-500 mt-4">
                  {search
                    ? "No courses found."
                    : "No courses added yet."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Studenthome;