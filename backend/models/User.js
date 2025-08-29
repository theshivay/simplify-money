const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: 'Anonymous User'
  },
  email: {
    type: String,
    default: ''
  },
  totalInvestment: {
    type: Number,
    default: 0
  },
  totalGoldGrams: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
