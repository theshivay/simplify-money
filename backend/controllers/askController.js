const geminiClient = require('../utils/geminiClient');

const askController = {
  async handleAskQuery(req, res) {
    try {
      const { userId, question } = req.body;

      if (!userId || !question) {
        return res.status(400).json({
          error: 'Both userId and question are required'
        });
      }

      // Get AI response from Gemini (with fallback handling)
      const aiResponse = await geminiClient.getGoldInvestmentAdvice(question);

      // Split the response into fact and nudge (simple approach)
      const responseParts = aiResponse.split('Would you like to proceed');
      const fact = responseParts[0].trim();
      const nudge = responseParts.length > 1 
        ? 'Would you like to proceed' + responseParts[1].trim()
        : 'You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?';

      res.json({
        answer: fact,
        nudge: nudge,
        fullResponse: aiResponse,
        source: 'ai' // Indicate this came from AI (could be 'fallback' if needed)
      });

    } catch (error) {
      console.error('Ask API error:', error);
      
      // Provide a graceful fallback response even if everything fails
      res.json({
        answer: "I'm currently experiencing high demand, but I can still help! Gold is a time-tested investment that serves as a hedge against inflation and economic uncertainty. It's particularly valuable for portfolio diversification.",
        nudge: "You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?",
        fullResponse: "I'm currently experiencing high demand, but I can still help! Gold is a time-tested investment that serves as a hedge against inflation and economic uncertainty. It's particularly valuable for portfolio diversification. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?",
        source: 'system_fallback'
      });
    }
  }
};

module.exports = askController;
