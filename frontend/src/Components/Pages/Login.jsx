import "./Login.css";
import axios from "axios";
import Logo from "../../assets/Logo.jpeg";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const selectedRole = searchParams.get("role");
    if (selectedRole) {
      setRole(selectedRole);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select your role");
      return;
    }

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password, role, }
      );
      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      if (response.data.user.role === "student") {
        navigate("/studenthome");
      } else if (response.data.user.role === "teacher") {
        navigate("/teacherhome");
      } else if (response.data.user.role === "admin") {
        navigate("/adminhome");
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  useEffect(() => {
    window.handleGoogleLogin = async (response) => {
      if (!role) {
        alert("Please select your role first");
        return;
      }
      try {
        const result = await axios.post(
          "http://localhost:3000/api/user/google-login",
          { credential: response.credential,  role: role, }
        );
        localStorage.setItem(
          "token",
          result.data.token
        );
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );
        if (result.data.user.role === "student") {
          navigate("/studenthome");
        } else if (result.data.user.role === "teacher") {
          navigate("/teacherhome");
        } else if (result.data.user.role === "admin") {
          navigate("/adminhome");
        }
      } catch (error) {
        console.log(
          "Google login error:",error
        );
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Google login failed");
        }
      }
    };

    const script = document.createElement("script");
    script.src ="https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      delete window.handleGoogleLogin;
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
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: window.handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleButton"),
          { theme: "outline", size: "large", width: 400, text: "signin_with" }
        );
      }
    };

    const interval = setInterval(
      renderGoogleButton,
      500
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h1>CodeSphere</h1>
      </div>
     <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <h1 className="text-2xl text-gray-700">Login to continue learning</h1>
      </div>
      <div className="w-250 m-5">
        <h1 className="text-2xl font-bold">Login as</h1>
        <div className="flex gap-30 justify-center p-3">
          <div
            onClick={() => setRole("admin")}
            className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${
              role === "admin"
                ? "bg-green-800 text-white"
                : ""
            }`}
          >
            Admin
          </div>
          <div
            onClick={() => setRole("teacher")}
            className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${
              role === "teacher"
                ? "bg-green-800 text-white"
                : ""
            }`}
          >
            Teacher
          </div>
          <div onClick={() => setRole("student")} 
          className={`border-6 border-gray-200 rounded-4xl text-2xl w-75 p-3 text-center cursor-pointer ${ role === "student"
            ? "bg-green-800 text-white"
                : ""
            }`}
          >
            Student
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mt-3 flex flex-col">
            <label htmlFor="email" className="text-2xl font-bold" >
              Email
            </label>
            <input type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 w-250 p-3"
              placeholder="Enter Email"
            />
            <label htmlFor="password" className="text-2xl font-bold">Password</label>
            <input type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value) } 
              className="border-2 w-250 p-3" 
              placeholder="Enter Password" />
          </div>
          <div className="m-5 border-2 h-20 rounded-4xl bg-green-800 flex items-center justify-center cursor-pointer">
            <button type="submit" className="text-white text-4xl">Login </button>
          </div>
        </form>
        <div className="flex justify-center my-5">
          <div id="googleButton"></div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl">Don't have an account?{" "}
            <span className="text-green-800 font-bold cursor-pointer"  onClick={() =>navigate(`/signup?role=${role}`)}>Sign Up</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;