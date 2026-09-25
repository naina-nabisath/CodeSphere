
import express from "express";
import {  addCategory,  getCategory } from "../Controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategory);

export default categoryRouter;
