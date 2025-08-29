const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  goldGrams: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  goldPricePerGram: {
    type: Number,
    default: 5500 // ₹5500 per gram (hardcoded as mentioned in README)
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    default: 'success'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Purchase', purchaseSchema);
