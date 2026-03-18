import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    unique: true
  },
  open: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  }
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;