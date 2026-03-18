import express from 'express';
import Stock from '../models/Stock.js';

const router = express.Router();

router.get("/stocks", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ error: "start_date and end_date are required" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const stocks = await Stock.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).sort({ timestamp: 1 });

    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/stocks/metrics", async (req, res) => {
  try {
    const { field, start_date, end_date } = req.query;

    if (!field) {
      return res.status(400).json({ error: "field is required" });
    }

    if (!['open', 'high', 'low', 'close', 'volume'].includes(field)) {
      return res.status(400).json({ error: "invalid field" });
    }

    if (!start_date || !end_date) {
      return res.status(400).json({ error: "start_date and end_date are required" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const data = await Stock.find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).select(field);

    if (data.length === 0) {
      return res.status(404).json({ error: "no data found for the given range" });
    }

    const values = data.map(item => item[field]);

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const stdDev = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length);

    res.json({ field, average: avg, min, max, standardDeviation: stdDev });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
