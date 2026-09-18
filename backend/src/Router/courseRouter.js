import express from "express";
import { addCourse, getCourseCount, getCourses } from "../Controller/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/", addCourse);
courseRouter.get("/", getCourses);
courseRouter.get('/courses/count', getCourseCount);

export default courseRouter;