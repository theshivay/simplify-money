const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiClient {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-1.5-flash for better rate limits (faster, more efficient)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.lastApiCall = 0;
    this.minCallInterval = 2000; // 2 seconds between calls for better rate limiting
    
    // Fallback responses for when API is unavailable
    this.fallbackResponses = [
      {
        keywords: ['good', 'investment', 'should', 'invest', 'now', 'today', 'current'],
        response: "Gold has historically been a reliable store of value and hedge against inflation. In the current economic climate with market volatility, gold remains an attractive option for portfolio diversification. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
      },
      {
        keywords: ['price', 'rates', 'cost', 'expensive', 'cheap'],
        response: "Gold prices fluctuate based on various economic factors, but it generally maintains its value over time. Digital gold eliminates storage and purity concerns while offering fractional ownership. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
      },
      {
        keywords: ['safe', 'secure', 'risk', 'risky'],
        response: "Gold is considered one of the safest investment options, especially during uncertain economic times. It acts as a hedge against inflation and currency devaluation. Digital gold through Simplify Money offers the same benefits with added convenience and security. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
      },
      {
        keywords: ['future', 'long', 'term', '2025', '2026'],
        response: "Gold has shown consistent long-term growth and is expected to remain a valuable asset in the future. With increasing digitalization, digital gold investments offer modern convenience with traditional security. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
      },
      {
        keywords: ['digital', 'physical', 'difference', 'better'],
        response: "Digital gold offers the same value as physical gold but without storage hassles, making charges, or purity concerns. It's backed by actual gold reserves and can be converted to physical form when needed. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
      }
    ];
  }

  async generateResponse(prompt) {
    try {
      // Simple rate limiting
      const now = Date.now();
      const timeSinceLastCall = now - this.lastApiCall;
      if (timeSinceLastCall < this.minCallInterval) {
        await new Promise(resolve => setTimeout(resolve, this.minCallInterval - timeSinceLastCall));
      }
      
      this.lastApiCall = Date.now();
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Check if it's a rate limit error
      if (error.status === 429 || error.message.includes('quota') || error.message.includes('rate')) {
        console.log('Rate limit detected, using fallback response');
        return null; // Signal to use fallback
      }
      
      throw new Error('Failed to generate AI response');
    }
  }

  getFallbackResponse(question) {
    const questionLower = question.toLowerCase();
    
    // Find the best matching fallback response
    for (const fallback of this.fallbackResponses) {
      const matchCount = fallback.keywords.filter(keyword => 
        questionLower.includes(keyword)
      ).length;
      
      if (matchCount > 0) {
        return fallback.response;
      }
    }
    
    // Default fallback response
    return "Gold is a precious metal that has been valued for centuries as a store of wealth and hedge against economic uncertainty. It's particularly attractive during periods of inflation and market volatility. You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?";
  }

  async getGoldInvestmentAdvice(question) {
    const prompt = `
      You are an AI assistant for Simplify Money, a digital gold investment platform.
      
      User question: "${question}"
      
      Please provide:
      1. A helpful fact or insight about gold investments (2-3 sentences)
      2. A gentle nudge to invest in digital gold through Simplify Money
      
      Keep the response professional, informative, and encouraging about gold investments.
      Focus on gold as a safe investment option, hedge against inflation, portfolio diversification, etc.
      
      Format your response as a natural conversation, ending with something like:
      "You can start investing in digital gold with Simplify Money for as little as ₹10. Would you like to proceed with a small investment?"
    `;

    try {
      const aiResponse = await this.generateResponse(prompt);
      
      // If we got null (rate limit), use fallback
      if (aiResponse === null) {
        console.log('Using fallback response due to API rate limits');
        return this.getFallbackResponse(question);
      }
      
      return aiResponse;
    } catch (error) {
      console.log('Gemini API unavailable, using fallback response');
      return this.getFallbackResponse(question);
    }
  }
}

module.exports = new GeminiClient();
