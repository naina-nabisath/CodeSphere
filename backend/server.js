import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import studentRoutes from './src/Router/studentRouter.js'
import { connectDB } from './src/config/db.js';
connectDB();

const port = process.env.PORT;

app.use(express.json());

app.get("/api/student", (req, res)=>{
    res.send("Server is ready")
});
app.use("/api/student",studentRoutes )

app.listen(port, ()=>{
    console.log("Server is running");
})