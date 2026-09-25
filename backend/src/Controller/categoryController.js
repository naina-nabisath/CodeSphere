import Category from "../Model/categoryModel.js";

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
    const categoryExist = await Category.findOne({
      name: name.trim(),
    });
    if (categoryExist) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }
    const category = await Category.create({
      name: name.trim(),
    });
    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.log("Add category error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    console.log("Get categories error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { addCategory, getCategory };
