import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ onAskQuestion, onPurchaseGold, loading }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! 👋 I\'m your AI assistant for gold investments. Ask me anything about gold investments, market trends, or investment strategies!',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Is gold a good investment now?",
    "How does digital gold work?", 
    "What are the benefits of gold investment?",
    "Is gold safe for beginners?"
  ];

  const handleQuickQuestion = (quickQuestion) => {
    if (loading) return;
    setQuestion(quickQuestion);
    setTimeout(() => handleSubmit(null, quickQuestion), 100);
  };

  const handleSubmit = async (e, quickQ = null) => {
    if (e) e.preventDefault();
    const currentQuestion = quickQ || question;
    if (!currentQuestion.trim() || loading) return;

    // Add user message
    const userMessage = { 
      type: 'user', 
      content: currentQuestion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
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
        source: response.source,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: new Date()
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
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Purchase failed: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
                    <h2>Investment Advisory</h2>
        <p>Get personalized advice and invest in digital gold instantly</p>
      </div>

      {messages.length === 1 && (
        <div className="quick-questions">
          <p>Quick questions to get started:</p>
          <div className="quick-question-buttons">
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(q)}
                className="quick-question-btn"
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

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
                    💎 Invest ₹50 in Gold
                  </button>
                  <button 
                    onClick={() => handlePurchase(100)}
                    className="purchase-btn"
                    disabled={loading}
                  >
                    🏆 Invest ₹100 in Gold
                  </button>
                </div>
              )}

              {message.details && (
                <div className="transaction-details">
                  <h4>✅ Transaction Successful</h4>
                  <p><strong>Transaction ID:</strong> {message.details.transactionId}</p>
                  <p><strong>Gold Purchased:</strong> {message.details.goldGrams}</p>
                  <p><strong>Amount Invested:</strong> {message.details.amount}</p>
                </div>
              )}
            </div>
            
            {message.timestamp && (
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            )}
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
              <span className="typing-text">AI is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me about gold investments, market trends, or strategies..."
          disabled={loading}
          maxLength={500}
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Sending...
            </>
          ) : (
            <>
              📤 Send
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
