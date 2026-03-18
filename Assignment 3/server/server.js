import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogsRoutes from './routes/blogs.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(blogsRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to MongoDB && listening on", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });