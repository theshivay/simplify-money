const Purchase = require('../models/Purchase');
const User = require('../models/User');

const purchaseController = {
  async handlePurchase(req, res) {
    try {
      const { userId, amount } = req.body;

      if (!userId || !amount) {
        return res.status(400).json({
          error: 'Both userId and amount are required'
        });
      }

      if (amount < 1) {
        return res.status(400).json({
          error: 'Minimum investment amount is ₹1'
        });
      }

      // Hardcoded gold price per gram (as mentioned in README)
      const goldPricePerGram = 5500; // ₹5500 per gram
      const goldGrams = parseFloat((amount / goldPricePerGram).toFixed(6));

      // Generate transaction ID
      const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

      // Create purchase record
      const purchase = new Purchase({
        userId,
        amount,
        goldGrams,
        transactionId,
        goldPricePerGram
      });

      await purchase.save();

      // Update or create user record
      await User.findOneAndUpdate(
        { userId },
        {
          $inc: {
            totalInvestment: amount,
            totalGoldGrams: goldGrams
          }
        },
        { upsert: true, new: true }
      );

      res.json({
        status: 'success',
        message: `₹${amount} digital gold purchase completed successfully!`,
        transactionId,
        userId,
        goldGrams: `${goldGrams}g`,
        goldPricePerGram: `₹${goldPricePerGram}`,
        purchaseDate: new Date().toISOString()
      });

    } catch (error) {
      console.error('Purchase API error:', error);
      res.status(500).json({
        error: 'Failed to complete purchase. Please try again.',
        details: error.message
      });
    }
  },

  async getPurchaseHistory(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          error: 'userId is required'
        });
      }

      const purchases = await Purchase.find({ userId }).sort({ createdAt: -1 });
      const user = await User.findOne({ userId });

      res.json({
        user: user || { userId, totalInvestment: 0, totalGoldGrams: 0 },
        purchases,
        totalPurchases: purchases.length
      });

    } catch (error) {
      console.error('Purchase history error:', error);
      res.status(500).json({
        error: 'Failed to fetch purchase history',
        details: error.message
      });
    }
  }
};

module.exports = purchaseController;
