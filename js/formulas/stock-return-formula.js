/**
 * Stock Return Calculator Formula
 * Calculates stock investment returns with dividends
 */

const StockReturnFormula = {
  /**
   * Calculate stock return
   * @param {number} purchasePrice - Price per share at purchase
   * @param {number} shares - Number of shares
   * @param {number} currentPrice - Current price per share
   * @param {number} totalDividends - Total dividends received
   * @param {boolean} dividendReinvested - Whether dividends were reinvested
   * @returns {object} Stock return details
   */
  calculateStockReturn(purchasePrice, shares, currentPrice, totalDividends = 0, dividendReinvested = false) {
    const initialInvestment = purchasePrice * shares;
    const currentValue = currentPrice * shares;
    
    let dividendValue = totalDividends;
    let effectiveShares = shares;
    
    if (dividendReinvested && totalDividends > 0) {
      // Approximate additional shares from dividend reinvestment
      const avgPrice = (purchasePrice + currentPrice) / 2;
      const additionalShares = totalDividends / avgPrice;
      effectiveShares = shares + additionalShares;
      dividendValue = additionalShares * currentPrice;
    }
    
    const finalValue = (effectiveShares * currentPrice);
    const capitalGain = (currentPrice - purchasePrice) * shares;
    const totalReturn = capitalGain + dividendValue;
    const totalReturnPercent = (totalReturn / initialInvestment) * 100;
    
    return {
      purchasePrice: Math.round(purchasePrice * 100) / 100,
      shares: Math.round(effectiveShares * 100) / 100,
      currentPrice: Math.round(currentPrice * 100) / 100,
      initialInvestment: Math.round(initialInvestment * 100) / 100,
      currentValue: Math.round(currentValue * 100) / 100,
      capitalGain: Math.round(capitalGain * 100) / 100,
      dividends: Math.round(dividendValue * 100) / 100,
      totalReturn: Math.round(totalReturn * 100) / 100,
      totalReturnPercent: Math.round(totalReturnPercent * 100) / 100,
      dividendReinvested
    };
  },

  /**
   * Calculate cost basis for multiple purchases
   * @param {array} purchases - Array of {price, shares, date}
   * @returns {object} Cost basis details
   */
  calculateCostBasis(purchases) {
    let totalShares = 0;
    let totalCost = 0;
    
    for (const purchase of purchases) {
      totalShares += purchase.shares;
      totalCost += purchase.price * purchase.shares;
    }
    
    const averageCost = totalShares > 0 ? totalCost / totalShares : 0;
    
    return {
      totalShares: Math.round(totalShares * 10000) / 10000,
      totalCost: Math.round(totalCost * 100) / 100,
      averageCostPerShare: Math.round(averageCost * 100) / 100
    };
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StockReturnFormula;
}
