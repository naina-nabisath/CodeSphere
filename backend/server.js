import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './src/config/db.js';
import userRouter from './src/Router/userRouter.js'
import categoryRouter from './src/Router/categoryRouter.js';
import courseRouter from './src/Router/courseRouter.js';
connectDB();

const port = process.env.PORT;

app.use(express.json());

app.get("/api/user", (req, res)=>{
    res.send("Server is ready")
});
app.use("/api/user",userRouter );
app.use("/api/category", categoryRouter);
app.use("/api/course", courseRouter);


app.listen(port, ()=>{
    console.log("Server is running");
})