import React, { useState, useEffect } from 'react';
import './PurchaseHistory.css';

const PurchaseHistory = ({ userId, purchases, totalInvestment, totalGoldGrams }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!purchases || purchases.length === 0) {
    return null;
  }

  return (
    <div className="purchase-history">
      <div className="history-header">
        <h3 onClick={() => setIsVisible(!isVisible)}>
          📊 Investment Portfolio {isVisible ? '▼' : '▶'}
        </h3>
      </div>

      {isVisible && (
        <div className="history-content">
          <div className="portfolio-summary">
            <div className="summary-card">
              <h4>Total Investment</h4>
              <p className="amount">₹{totalInvestment?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="summary-card">
              <h4>Total Gold</h4>
              <p className="gold">{totalGoldGrams?.toFixed(6) || '0.000000'}g</p>
            </div>
            <div className="summary-card">
              <h4>Transactions</h4>
              <p className="count">{purchases.length}</p>
            </div>
          </div>

          <div className="transactions-list">
            <h4>Recent Transactions</h4>
            {purchases.slice(0, 5).map((purchase, index) => (
              <div key={purchase._id || index} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-amount">₹{purchase.amount}</div>
                  <div className="transaction-gold">{purchase.goldGrams}g</div>
                </div>
                <div className="transaction-details">
                  <div className="transaction-id">ID: {purchase.transactionId}</div>
                  <div className="transaction-date">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
