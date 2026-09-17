import { useEffect, useState } from "react";
import axios from "axios";

function AddCourse() {

  const [courseTitle, setCourseTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.log("Category error:", error);
      }
    };
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!otherCategory.trim()) {
      alert("Please enter a category");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/category",
        {
          name: otherCategory
        }
      );
      alert("Category added successfully");
      setCategories((previousCategories) => [
        ...previousCategories,
        response.data.category
      ]);
      setCategory(response.data.category._id);
      setOtherCategory("");
    } catch (error) {
      console.log("Add category error:", error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseTitle.trim()) {
      alert("Please enter course name");
      return;
    }
    if (!category || category === "Others") {
      alert("Please select a category");
      return;
    }
    if (!user) {
      alert("User not found");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/course",
        {
          title: courseTitle,
          teacherName: user.name,
          teacher: user.id,
          category: category
        }
      );
      alert("Course added successfully");
      console.log("Course:", response.data);

      setCourseTitle("");
      setCategory("");
    } catch (error) {
      console.log("Course error:", error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-5">
        <label>Course</label>
        <input
          type="text"
          placeholder="Course name"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <br />
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((item) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.name}
            </option>
          ))}
          <option value="Others">Others</option>
        </select>
        <br />
        {category === "Others" && (
          <div>
            <label>New Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>Add Category</button>
          </div>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>

  );
}

export default AddCourse;