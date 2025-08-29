import React, { useState } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ onAskQuestion, onPurchaseGold, loading }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI assistant for gold investments. Ask me anything about gold investments, market trends, or investment strategies!'
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    // Add user message
    const userMessage = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    
    const currentQuestion = question;
    setQuestion('');

    try {
      // Get AI response
      const response = await onAskQuestion(currentQuestion);
      
      // Add AI response
      const aiMessage = {
        type: 'ai',
        content: response.answer || response.fullResponse,
        nudge: response.nudge,
        showPurchaseButton: true,
        source: response.source
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Sorry, I encountered an error: ${error.message}`
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handlePurchase = async (amount = 10) => {
    try {
      const result = await onPurchaseGold(amount);
      const successMessage = {
        type: 'success',
        content: `🎉 ${result.message}`,
        details: {
          transactionId: result.transactionId,
          goldGrams: result.goldGrams,
          amount: `₹${amount}`
        }
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Purchase failed: ${error.message}`
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>💰 Simplify Money - Gold Investment AI</h2>
        <p>Your intelligent assistant for gold investments</p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
              
              {message.source === 'system_fallback' && (
                <div className="fallback-notice">
                  <small>⚡ High demand - using our knowledge base to assist you</small>
                </div>
              )}
              
              {message.nudge && (
                <div className="nudge">
                  <p>{message.nudge}</p>
                </div>
              )}
              
              {message.showPurchaseButton && (
                <div className="purchase-actions">
                  <button 
                    onClick={() => handlePurchase(10)}
                    className="purchase-btn"
                    disabled={loading}
                  >
                    Invest ₹10 in Gold
                  </button>
                  <button 
                    onClick={() => handlePurchase(50)}
                    className="purchase-btn"
                    disabled={loading}
                  >
                    Invest ₹50 in Gold
                  </button>
                </div>
              )}

              {message.details && (
                <div className="transaction-details">
                  <h4>Transaction Details:</h4>
                  <p><strong>Transaction ID:</strong> {message.details.transactionId}</p>
                  <p><strong>Gold Purchased:</strong> {message.details.goldGrams}</p>
                  <p><strong>Amount:</strong> {message.details.amount}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message ai">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me about gold investments..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
