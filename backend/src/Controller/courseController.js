import Course from "../Model/courseModel.js";

const addCourse = async (req, res) => {
  try {
    const { title, teacherName, teacher, category } = req.body;

    if (!title || !teacherName || !teacher || !category) {
      return res.status(400).json({
        message: "Course title, teacher name and category are required",
      });
    }

    const course = await Course.create({
      title: title.trim(),
      teacherName: teacherName.trim(),
      teacher,
      category,
    });

    res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    console.log("Add course error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getCourses = async (req, res) => { 
    try { 
        const courses = await Course.find() 
        .populate("category", "name"); 
        
        res.status(200).json(courses); 
    } catch (error) { 
        console.log("Get courses error:", error); 
        res.status(500).json({ 
            message: "Server error", 
            error: error.message, 
        }); 
    } 
};

export { addCourse , getCourses };