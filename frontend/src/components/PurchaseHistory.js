import React, { useState } from 'react';
import './PurchaseHistory.css';

const PurchaseHistory = ({ userId, purchases, totalInvestment, totalGoldGrams }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!purchases || purchases.length === 0) {
    return (
      <div className="purchase-history">
        <div className="history-header">
          <h3>
            Investment Portfolio
            <span className="toggle-icon">↗</span>
          </h3>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">🪙</div>
          <h4>Start Your Gold Investment Journey</h4>
          <p>Your portfolio will appear here once you make your first investment</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatGold = (grams) => {
    return `${(grams || 0).toFixed(6)}g`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGoldValue = () => {
    const goldPricePerGram = 5500; // Current gold price
    return (totalGoldGrams || 0) * goldPricePerGram;
  };

  const getProfitLoss = () => {
    const currentValue = getGoldValue();
    const invested = totalInvestment || 0;
    return currentValue - invested;
  };

  const getProfitLossPercentage = () => {
    const invested = totalInvestment || 0;
    if (invested === 0) return 0;
    return ((getProfitLoss() / invested) * 100);
  };

  return (
    <div className="purchase-history">
      <div className="history-header">
        <h3 onClick={() => setIsVisible(!isVisible)}>
          Investment Portfolio
          <span className={`toggle-icon ${isVisible ? 'expanded' : ''}`}>▶</span>
        </h3>
      </div>

      {isVisible && (
        <div className="history-content">
          <div className="portfolio-summary">
            <div className="summary-card">
              <h4>Total Invested</h4>
              <p className="amount">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="summary-card">
              <h4>Gold Holdings</h4>
              <p className="gold">{formatGold(totalGoldGrams)}</p>
            </div>
            <div className="summary-card">
              <h4>Current Value</h4>
              <p className="amount">{formatCurrency(getGoldValue())}</p>
            </div>
            <div className="summary-card">
              <h4>P&L</h4>
              <p className={getProfitLoss() >= 0 ? "amount" : "count"}>
                {getProfitLoss() >= 0 ? '+' : ''}{formatCurrency(getProfitLoss())}
                <br />
                <small style={{fontSize: '0.8rem', opacity: 0.8}}>
                  ({getProfitLoss() >= 0 ? '+' : ''}{getProfitLossPercentage().toFixed(2)}%)
                </small>
              </p>
            </div>
          </div>

          <div className="transactions-list">
            <h4>Recent Transactions ({purchases.length})</h4>
            {purchases.slice(0, 10).map((purchase, index) => (
              <div key={purchase._id || index} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-amount">
                    {formatCurrency(purchase.amount)}
                  </div>
                  <div className="transaction-gold">
                    {formatGold(purchase.goldGrams)}
                  </div>
                </div>
                <div className="transaction-details">
                  <div className="transaction-date">
                    {formatDate(purchase.createdAt)}
                  </div>
                  <div className="transaction-id">
                    {purchase.transactionId}
                  </div>
                </div>
              </div>
            ))}
            
            {purchases.length > 10 && (
              <div style={{textAlign: 'center', marginTop: '16px'}}>
                <small style={{color: 'var(--text-gray)'}}>
                  Showing 10 of {purchases.length} transactions
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
