const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
    address: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  car_engine: {
    type: String,
    required: true,
  },
   mechanic: {
    type: String,
  },
  date: {
    type: Date,
  },
  
});

module.exports = appointment = mongoose.model('appointment', userSchema);
