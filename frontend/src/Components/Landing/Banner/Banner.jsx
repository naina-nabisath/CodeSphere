import { ArrowRight, Play, Star, Award, BookOpen, Video, Users, BriefcaseBusiness, CheckCircle, } from "lucide-react";
import Student from "../../../assets/Student-photo.png";
import js from "../../../assets/Javascript.png";
import Certificate from "../../../assets/certificate.png";

function Banner() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0C6A12] via-[#3da847] to-[#a6e3aa]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#08440c]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[35%] top-[20%] h-32 w-32 rounded-full border border-white/10" />
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-16 xl:gap-20">
        <div className="z-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0C6A12]">
              <Star size={17} fill="currentColor" />
            </div>
            <span className="text-sm font-semibold sm:text-base">
              Learn Without Limits
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Learn.
              <br />
              <span className="text-[#d9f5dc]">
                Build. Grow.
              </span>
            </h1>
            <h2 className="mt-4 text-3xl font-semibold text-[#08440c] sm:text-4xl lg:text-5xl">
              Grow Your Future
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/90 sm:text-lg lg:text-xl">
            Gain in-demand skills with expert-led courses,
            real-world projects, and industry-recognized
            certifications.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              className="group flex items-center justify-center gap-3 rounded-xl bg-[#08440c] px-7 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#063409] hover:shadow-2xl sm:px-8 sm:text-lg"
            >
              Explore Courses
              <ArrowRight
                size={21}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              className="group flex items-center justify-center gap-3 rounded-xl border-2 border-white/80 bg-white/95 px-7 py-4 text-base font-bold text-[#08440c] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:px-8 sm:text-lg"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0C6A12] text-white">
                <Play size={13} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle size={17} />
              Expert Instructors
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={17} />
              Real Projects
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={17} />
              Certifications
            </div>
          </div>
        </div>
        <div className="relative mx-auto flex h-[550px] w-full max-w-[620px] items-center justify-center sm:h-[620px] lg:h-[650px]">
          <div className="absolute h-[350px] w-[350px] rounded-full bg-white/20 blur-3xl sm:h-[450px] sm:w-[450px]" />
          <img
            src={Student}
            alt="Student"
            className="relative z-10 h-[480px] w-[380px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03] sm:h-[570px] sm:w-[450px]"
          />
          <div className="absolute left-0 top-16 z-20 flex w-[245px] animate-[float_5s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl backdrop-blur-sm sm:left-2 sm:w-[270px]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <img
                src={js}
                alt="Javascript"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gray-900 sm:text-sm">
                Full Stack Web Development
              </h5>
              <span className="mt-1 inline-block rounded-md bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
                Beginner
              </span>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                <Star
                  size={13}
                  fill="#f59e0b"
                  className="text-yellow-500"
                />
                <span>4.8 (120 Reviews)</span>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-24 z-20 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur-sm animate-[float_4s_ease-in-out_infinite]">
            <img
              src={Certificate}
              alt="Certificate"
              className="h-12 w-12 object-contain"
            />
            <div>
              <p className="text-[10px] text-gray-500">
                Achievement
              </p>
              <h5 className="text-xs font-bold text-gray-900">
                Certificate of
                <br />
                Completion
              </h5>
            </div>
          </div>
          <div className="absolute bottom-24 left-0 z-20 w-[190px] rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm animate-[float_6s_ease-in-out_infinite] sm:left-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-[#0C6A12]">
                Your Progress
              </h5>
              <span className="text-xs font-bold text-gray-500">
                30%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[30%] rounded-full bg-[#0C6A12]" />
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-600">
              Keep Learning! 🚀
            </p>
          </div>
          <div className="absolute bottom-20 right-0 z-20 w-[210px] rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm animate-[float_5.5s_ease-in-out_infinite]">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-[#0C6A12]">
                <BriefcaseBusiness size={18} />
              </div>
              <h5 className="text-xs font-semibold text-gray-500">
                Career Path
              </h5>
            </div>
            <h4 className="mt-2 text-sm font-bold text-gray-900">
              Full Stack Developer
            </h4>
            <p className="mt-1 text-[11px] text-gray-500">
              12 Courses • 8 Projects
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group flex items-center gap-4 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#0C6A12] transition-transform duration-300 group-hover:scale-110">
              <Video size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                2 Free Videos
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Preview every course
              </p>
            </div>
          </div>
          <div className="group flex items-center gap-4 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#0C6A12] transition-transform duration-300 group-hover:scale-110">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Expert Instructors
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Learn from professionals
              </p>
            </div>
          </div>
          <div className="group flex items-center gap-4 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#0C6A12] transition-transform duration-300 group-hover:scale-110">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Full Courses
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Access premium content
              </p>
            </div>
          </div>
          <div className="group flex items-center gap-4 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#0C6A12] transition-transform duration-300 group-hover:scale-110">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Get Certified
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Earn completion certificates
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </section>
  );
}

export default Banner;