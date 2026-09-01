import Student from "../Model/studentModel.js";

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const studentExist = await Student.findOne({ email });

    if (studentExist) {
      return res.status(400).json({
        message: "User already Exist",
      });
    }

    const student = await Student.create({
      name,
      email,
      password,
    });

    if (student) {
      res.status(201).json({
        id: student._id,
        name: student.name,
        email: student.email,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid data",
      });
    }

} catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }

  console.log("Name :", name);
  console.log("Email :", email);
};

export { registerStudent };
