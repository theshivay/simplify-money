import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Ask AI about gold investments
  async askQuestion(userId, question) {
    try {
      const response = await this.api.post('/ask', {
        userId,
        question
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get AI response');
    }
  }

  // Purchase digital gold
  async purchaseGold(userId, amount) {
    try {
      const response = await this.api.post('/purchase', {
        userId,
        amount: parseFloat(amount)
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to complete purchase');
    }
  }

  // Get purchase history
  async getPurchaseHistory(userId) {
    try {
      const response = await this.api.get(`/purchase/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch purchase history');
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API is not reachable');
    }
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
