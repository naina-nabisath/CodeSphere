
import express from "express";
import {  addCategory,  getCategories } from "../Controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;
