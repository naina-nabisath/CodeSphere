import axios from "axios";
import { ArrowLeftIcon, Plus, Send, Trash, Video } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"


function AddCourse() {
  const [video, setVideo] = useState([
    {
      title: "",
      url: "",
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.log("Category Error", error);
      }
    };

    getCategory();
  }, [])

  const addVideo = () => {
    setVideo([
      ...video, {
        title: "",
        url: ""
      },
    ]);
  };

  const deleteVideo = (index) => {
    const updatedVideo = video.filter(
      (_, videoIndex) => videoIndex !== index
    );

    setVideo(updatedVideo);
  }

  const handleSubmit = async (status) => {
    if (!title.trim()) {
      alert("Please enter course title");
      return;
    }

    if (!category) {
      alert("Please select category");
      return;
    }

    if (!level) {
      alert("Please select level");
      return;
    }

    if (price === "") {
      alert("Please course price");
      return;
    }

    try {
      setLoading(true)

      const response = await axios.post(
        "http://localhost:3000/api/course",
        {
          title: title.trim(),
          category,
          level,
          price: Number(price),
          thumbnail,
          teacher: user.id,
          teacherName: user.name,
          video,
          status,
        }
      );

      console.log("Course Created: ", response.data);

      navigate('/teacherhome');
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-5">
      <div className="bg-white flex justify-between border-white">
        <button onClick={() => { navigate('/teacherhome') }}>
          <h1 className="flex items-center">
            <ArrowLeftIcon /> Back to Dashboard
          </h1>
        </button>
        <div>
          <h3>Teacher</h3>
          <h1 className="text-3xl">{user.name}</h1>
        </div>
      </div>

      <div className="bg-blue-50 p-6">
        <div>
          <h5 className="text-green-500 font-bold">
            MyCourse/ Create New Course
          </h5>
          <h1 className="font-bold text-4xl">
            Create New Course
          </h1>
          <h6 className="font-lighter">
            Add the details of your course and publish it for your students.
          </h6>
        </div>
        <div className="bg-white border-2 border-gray-400 rounded-2xl my-5 p-5">
          <h1 className="font-bold text-4xl">Course Information</h1>
          <h4>Enter the basic information about the course</h4>
          <div className="my-5">
            <div className="flex flex-col">
              <label htmlFor="">Course Title</label>
              <input type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                placeholder="Enter course title"
                className="border-2 border-gray-400 rounded-2xl my-2 p-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="">Category</label>
                <select value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition">
                  <option value="">Select Category</option>
                  {categories.map((categoryItem) => (
                    <option key={categoryItem._id} value={categoryItem._id}>
                      {categoryItem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Level</label>
                <select value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 transition"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="">Price</label>
                <input type="text"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value) }}
                  placeholder="Enter course price"
                  className="border-2 border-gray-400 rounded-2xl my-2 p-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Thumbnail</label>
                <input type="text"
                  value={thumbnail}
                  onChange={(e) => { setThumbnail(e.target.value) }}
                  placeholder="Enter thumbnail URL"
                  className="border-2 border-gray-400 rounded-2xl my-2 p-3" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-4xl">Course Videos</h1>
              <h5>Add the videos that belong to this course</h5>
            </div>
            <button type="button"
              className="border-2 border-green-700 rounded-2xl bg-green-700 text-white font-bold flex gap-3 justify-center items-center px-2"
              onClick={addVideo}>
              <Plus /> Add New Video
            </button>
          </div>

          {
            video.map((video, index) => (
              <div key={index} className="bg-blue-50 border-0 rounded-2xl p-5 my-5">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="border-2 w-fit border-green-200 rounded-2xl bg-green-200 p-1">
                      <Video stroke="green" size={40} />
                    </div>
                    <div>
                      <h1 className="font-bold">Video {index + 1}</h1>
                      <h6>Course Lesson</h6>
                    </div>
                  </div>

                  <button className="flex items-center"
                    onClick={() => deleteVideo(index)}>
                    <Trash stroke="red" />
                  </button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
                  <div className="flex flex-col">
                    <label htmlFor="">Video Title</label>
                    <input type="text" placeholder="Example: Intro to JavaScript" className="border-2 border-gray-400 rounded-2xl my-2 p-3" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Video URL</label>
                    <input type="text" placeholder="Enter video URL" className="border-2 border-gray-400 rounded-2xl my-2 p-3" />
                  </div>
                </div>
              </div>
            ))
          }









        </div>
        <div className="flex justify-end gap-3">
          <button type="button"
            disabled={loading}
            onClick={() => { handleSubmit("draft") }}
            className="border-2 border-gray-400 rounded-2xl text-2xl font-bold p-3 px-5">
            Save Draft
          </button>
          <button type="button"
                  disabled={loading}
                  onClick={()=>{handleSubmit("publish")}}
                  className="flex items-center gap-3 border-2 border-green-700 bg-green-700 rounded-2xl text-2xl text-white font-bold p-3 px-5">
            <Send size={19} />
            {loading ? "Publishing..." : "Publish Course"}
            
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse