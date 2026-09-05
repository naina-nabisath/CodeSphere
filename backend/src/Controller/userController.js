import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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

    console.log("Signup password:", JSON.stringify(password));

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Signup password:", JSON.stringify(password));
console.log("Signup hash:", hashedPassword);

const testMatch = await bcrypt.compare(password, hashedPassword);
console.log("Signup immediate compare:", testMatch);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
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

export { registerUser, loginUser };
