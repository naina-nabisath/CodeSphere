import "./Signup.css";
import axios from "axios";
import Logo from "../../assets/Logo.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
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
        localStorage.setItem(
          "token",
          result.data.token
        );
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
    script.src =
      "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

   return () => {
      delete window.handleGoogleSignup;
      document.body.removeChild(script);
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

    const namePattern =
      /^[A-Za-z]+ [A-Za-z]+$/;
    if (!namePattern.test(name.trim())) {
      alert(
        "Please enter your first name and last name"
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      alert(
        "Please enter a valid email address"
      );
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="logo">
        <img
          src={Logo}
          alt="logo"
        />
        <h1>CodeSphere</h1>
     </div>
      <div className="text-center">
        <h1 className="text-4xl font-lighter">
          Create Your Account
        </h1>
        <h1 className="text-3xl text-gray-700">
          Join thousands of learners and educators
        </h1>
      </div>

      <div className="w-250 h-screen m-5">
        <h1 className="text-2xl font-bold">
          Sign Up as
        </h1>
        <div className="flex gap-30 justify-center p-3">
          <div
            onClick={() => setRole("admin")}
            className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "admin"
                ? "bg-green-800 text-white"
                : "border-gray-200"
              }`}
          >
            <h1>Admin</h1>
          </div>
         <div
            onClick={() => setRole("teacher")}
            className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "teacher"
                ? "bg-green-800 text-white"
                : "border-gray-200"
              }`}
          >
            <h1>Teacher</h1>
          </div>
          <div
            onClick={() => setRole("student")}
            className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${role === "student"
                ? "bg-green-800 text-white"
                : "border-gray-200"
              }`}
          >
            <h1>Student</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex flex-col">
            <label
              htmlFor="name"
              className="text-2xl font-bold"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border-2 w-250 p-3"
              placeholder="Enter Your Full Name"
            />
            <label
              htmlFor="email"
              className="text-2xl font-bold"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border-2 w-250 p-3"
              placeholder="Enter Email"
            />
            <label
              htmlFor="password"
              className="text-2xl font-bold"
            >
              Password
            </label>
           <input
              type="password"
              name="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="border-2 w-250 p-3"
              placeholder="Create a password"
            />
            <label
              htmlFor="cpassword"
              className="text-2xl font-bold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              value={cpassword}
              onChange={(e) =>
                setCpassword(e.target.value)
              }
              className="border-2 w-250 p-3"
              placeholder="Confirm your password"
            />
          </div>
          <div className="m-5 border-2 h-20 rounded-4xl bg-green-800 flex items-center justify-center cursor-pointer">
            <button
              type="submit"
              className="text-white text-4xl"
            >
              Sign Up
          </button>
          </div>
        </form>
        <div className="flex justify-center my-5">
          <div id="googleButton"></div>
        </div>
        <div className="flex justify-center">
          <h3 className="text-3xl font-bold">
            Already have an account?{" "}
          </h3>
          <h3
            className="text-3xl font-bold text-green-800 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </h3>
        </div>
      </div>
    </div>

  );

}

export default Signup;