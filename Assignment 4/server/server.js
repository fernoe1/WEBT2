import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';

import stockRoutes from './routes/stocks.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(stockRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to MongoDB && listening on", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });