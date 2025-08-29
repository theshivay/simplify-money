import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import PurchaseHistory from './components/PurchaseHistory';
import apiServiceInstance from './services/api';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => {
    // Generate or get existing user ID
    const stored = localStorage.getItem('simplify_money_user_id');
    if (stored) return stored;
    
    const newUserId = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    localStorage.setItem('simplify_money_user_id', newUserId);
    return newUserId;
  });
  
  const [purchaseHistory, setPurchaseHistory] = useState({
    purchases: [],
    user: null
  });

  // Load purchase history on component mount
  const loadPurchaseHistory = React.useCallback(async () => {
    try {
      const history = await apiServiceInstance.getPurchaseHistory(userId);
      setPurchaseHistory(history);
    } catch (error) {
      console.error('Failed to load purchase history:', error);
      // Don't show error to user for initial load failure
    }
  }, [userId]);

  useEffect(() => {
    loadPurchaseHistory();
  }, [userId, loadPurchaseHistory]);

  const handleAskQuestion = async (question) => {
    setLoading(true);
    try {
      const response = await apiServiceInstance.askQuestion(userId, question);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseGold = async (amount) => {
    setLoading(true);
    try {
      const result = await apiServiceInstance.purchaseGold(userId, amount);
      
      // Refresh purchase history after successful purchase
      await loadPurchaseHistory();
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <ChatInterface
          onAskQuestion={handleAskQuestion}
          onPurchaseGold={handlePurchaseGold}
          loading={loading}
        />
        
        <PurchaseHistory
          userId={userId}
          purchases={purchaseHistory.purchases}
          totalInvestment={purchaseHistory.user?.totalInvestment}
          totalGoldGrams={purchaseHistory.user?.totalGoldGrams}
        />
        
        <footer className="app-footer">
          <p>
            🏆 Simplify Money - AI-powered Gold Investment Platform<br/>
            <small>Emulating Kuberi AI workflow for digital gold investments</small>
          </p>
          <div className="user-info">
            <small>User ID: {userId}</small>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
