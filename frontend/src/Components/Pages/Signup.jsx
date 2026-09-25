import axios from "axios";
import Logo from "../../assets/Logo.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.handleGoogleSignup = async (response) => {
      if (!role) {
        alert("Please select a role first");
        return;
      }

      try {
        const result = await axios.post(
          "http://localhost:3000/api/user/google-signup",
          {
            credential: response.credential,
            role: role,
          }
        );

        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );

        if (role === "student") {
          navigate("/studenthome");
        } else if (role === "teacher") {
          navigate("/teacherhome");
        } else if (role === "admin") {
          navigate("/adminhome");
        }
      } catch (error) {
        console.log("Google signup error:", error);

        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Google signup failed");
        }
      }
    };

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      delete window.handleGoogleSignup;

      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [role, navigate]);


  useEffect(() => {
    const renderGoogleButton = () => {
      if (
        window.google &&
        document.getElementById("googleButton")
      ) {
        window.google.accounts.id.initialize({
          client_id:
            import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: window.handleGoogleSignup,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleButton"),
          {
            theme: "outline",
            size: "large",
            width: 400,
            text: "signup_with",
          }
        );
      }
    };

    const interval = setInterval(
      renderGoogleButton,
      500
    );

    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "") {
      alert("Specify the role");
      return;
    }

    const namePattern = /^[A-Za-z]+ [A-Za-z]+$/;

    if (!namePattern.test(name.trim())) {
      alert(
        "Please enter your first name and last name"
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      alert(
        "Password must contain at least 8 characters, one capital letter, one number, and one special character"
      );
      return;
    }

    if (password !== cpassword) {
      alert("Password do not match");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/signup",
        {
          name,
          email,
          password,
          role,
        }
      );

      navigate(`/login?role=${role}`);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };


  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Learn new skills",
      icon: GraduationCap,
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Share your knowledge",
      icon: User,
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage the platform",
      icon: ShieldCheck,
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-8 sm:px-6">
      <div className="pointer-events-none fixed -left-32 -top-32 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="relative mx-auto w-full max-w-5xl">
        <div
          onClick={() => navigate("/")}
          className="mb-8 flex cursor-pointer items-center justify-center gap-3"
        >
          <img
            src={Logo}
            alt="CodeSphere"
            className="h-12 w-12 rounded-xl object-cover shadow-sm transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              CodeSphere
            </h1>
            <p className="text-[9px] font-medium tracking-[0.18em] text-gray-500">
              LEARN • BUILD • GROW
            </p>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Join thousands of learners and educators
          </p>
        </div>
        <div className="mx-auto overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="p-5 sm:p-8 lg:p-10">

            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Sign Up as
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose how you want to use CodeSphere
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {roles.map((item) => {
                  const Icon = item.icon;
                  const selected = role === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRole(item.id)}
                      className={`group relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 sm:block sm:text-center ${selected
                          ? "border-[#0C6A12] bg-green-50 shadow-md"
                          : "border-gray-200 bg-white hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
                        }`}
                    >
                      {selected && (
                        <div className="absolute right-3 top-3">
                          <CheckCircle
                            size={20}
                            className="text-[#0C6A12]"
                            fill="#dcfce7"
                          />
                        </div>
                      )}


                      <div
                        className={`mx-0 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 sm:mx-auto ${selected
                            ? "bg-[#0C6A12] text-white"
                            : "bg-green-50 text-[#0C6A12] group-hover:scale-110"
                          }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="sm:mt-3">
                        <h3
                          className={`font-bold ${selected
                              ? "text-[#0C6A12]"
                              : "text-gray-800"
                            }`}
                        >
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#0C6A12] focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#0C6A12] focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm outline-none transition-all duration-200 focus:border-[#0C6A12] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#0C6A12]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={
                        showCPassword
                          ? "text"
                          : "password"
                      }
                      value={cpassword}
                      onChange={(e) =>
                        setCpassword(e.target.value)
                      }
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-11 text-sm outline-none transition-all duration-200 focus:border-[#0C6A12] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCPassword(!showCPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#0C6A12]"
                    >
                      {showCPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

              </div>

              <button
                type="submit"
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C6A12] py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09530e] hover:shadow-xl"
              >
                Create Account
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex justify-center overflow-hidden">
              <div id="googleButton"></div>
            </div>

            <div className="mt-7 text-center">
              <span className="text-sm text-gray-500">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-[#0C6A12] transition-colors hover:text-[#08440c] hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By creating an account, you agree to CodeSphere's
          terms and conditions.
        </p>
      </div>
    </div>
  );
}

export default Signup;