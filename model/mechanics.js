const mongoose = require('mongoose');

const mechanics = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },

});

module.exports = mechanic = mongoose.model('Mechanics', mechanics);
