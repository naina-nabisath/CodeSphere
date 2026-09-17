import express from "express";
import { addCourse, getCourses } from "../Controller/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/", addCourse);
courseRouter.get("/", getCourses)

export default courseRouter;