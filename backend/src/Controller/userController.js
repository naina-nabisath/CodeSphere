import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignup = async (req, res) => {
  try {
    const { credential, role } = req.body;

    if (!credential || !role) {
      return res.status(400).json({
        message: "Google credential and role are required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const name = payload.name;
    const email = payload.email;

    let user = await User.findOne({ email, role });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        role,
      });
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Google signup successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Google signup error:", error);

    res.status(500).json({
      message: "Google signup failed",
      error: error.message,
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential, role } = req.body;

    if (!credential || !role) {
      return res.status(400).json({
        message: "Google credential and role are required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email;

    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(404).json({
        message:
          "Account not found. Please sign up first.",
      });
    }

    if (user.googleId && user.googleId !== googleId) {
      return res.status(401).json({
        message: "Google account does not match.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Google login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("Google login error:", error);

    res.status(500).json({
      message: "Google login failed",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExist = await User.findOne({ email, role });

    if (userExist) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {     //postman
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid data",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }

  console.log("Name :", name);
  console.log("Email :", email);
  console.log("Role :", role);
  
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });

    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({
        message: "invalid user or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);
    console.log("Login password length:", password.length);
    console.log("Login password:", JSON.stringify(password));
    console.log("Stored hash:", JSON.stringify(user.password));

    if (!isMatch) {
      return res.status(401).json({
        message: "invalid user or password",
      });
    }
    const token = generateToken(user._id);

    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "server error",
    });
  }
};

const getTeacherCount = async (req, res)=>{
  try{
    const count = await User.countDocuments({ role: "teacher" });

    res.status(200).json({
      count
    });
  } catch(error) {
    res.status(500).json({
      message: "Serrver Error",
      error: error.message
    })
  }
  
};

const getStudentCount = async (req, res)=>{
  try{
    const count = await User.countDocuments({ role: "student" });

    res.status(200).json({
      count
    });
  } catch(error) {
    res.status(500).json({
      message: "Serrver Error",
      error: error.message
    })
  }
};

const getTeacher = async (req, res) => {
  try {
    const teachers = await User.find(
      { role: "teacher" },
      { name: 1, createdAt: 1, _id: 1 }
    );

    res.status(200).json({
      teachers
    });

  } catch (error) {
    console.log("Get teacher error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};

export { googleSignup, googleLogin, registerUser, loginUser, getTeacherCount, getStudentCount, getTeacher };
