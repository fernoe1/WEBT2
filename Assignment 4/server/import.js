import mongoose from 'mongoose';
import Stock from './models/Stock.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const data = JSON.parse(fs.readFileSync('./data/stock.json', 'utf-8'));

async function insertData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Stock.insertMany(data, { ordered: false }); 
    console.log('Data inserted successfully');

  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await mongoose.disconnect();
  }
}

insertData();
