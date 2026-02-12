/**
 * Dollar Cost Averaging Calculator Formula
 * Compares DCA vs lump sum investing
 */

const DollarCostAveragingFormula = {
  /**
   * Simulate dollar cost averaging
   * @param {number} totalAmount - Total amount to invest
   * @param {number} monthlyInvestment - Monthly investment amount
   * @param {number} months - Number of months
   * @param {number} expectedReturn - Expected annual return
   * @param {number} volatility - Expected volatility (standard deviation)
   * @returns {object} DCA analysis
   */
  simulateDCA(totalAmount, monthlyInvestment, months, expectedReturn, volatility = 0.15) {
    const monthlyReturn = expectedReturn / 12;
    const monthlyVolatility = volatility / Math.sqrt(12);
    
    // Simplified simulation using expected values
    let dcaBalance = 0;
    let totalInvested = 0;
    const monthlyData = [];
    
    for (let month = 1; month <= months; month++) {
      totalInvested += monthlyInvestment;
      dcaBalance = (dcaBalance + monthlyInvestment) * (1 + monthlyReturn);
      
      monthlyData.push({
        month,
        invested: Math.round(totalInvested * 100) / 100,
        balance: Math.round(dcaBalance * 100) / 100,
        shares: Math.round((totalInvested / (100 * (1 + monthlyReturn * month))) * 100) / 100
      });
    }
    
    // Lump sum scenario
    const lumpSumBalance = totalAmount * Math.pow(1 + monthlyReturn, months);
    
    // Average cost per share (simplified)
    const averageCost = totalInvested / months;
    
    return {
      totalAmount: Math.round(totalAmount * 100) / 100,
      monthlyInvestment: Math.round(monthlyInvestment * 100) / 100,
      months,
      expectedReturn: Math.round(expectedReturn * 10000) / 100,
      dca: {
        totalInvested: Math.round(totalInvested * 100) / 100,
        finalBalance: Math.round(dcaBalance * 100) / 100,
        totalReturn: Math.round((dcaBalance - totalInvested) * 100) / 100,
        returnPercent: Math.round(((dcaBalance - totalInvested) / totalInvested) * 10000) / 100
      },
      lumpSum: {
        totalInvested: Math.round(totalAmount * 100) / 100,
        finalBalance: Math.round(lumpSumBalance * 100) / 100,
        totalReturn: Math.round((lumpSumBalance - totalAmount) * 100) / 100,
        returnPercent: Math.round(((lumpSumBalance - totalAmount) / totalAmount) * 10000) / 100
      },
      comparison: {
        difference: Math.round((lumpSumBalance - dcaBalance) * 100) / 100,
        winner: lumpSumBalance > dcaBalance ? 'lumpSum' : 'dca',
        dcaAdvantage: Math.round(((dcaBalance - lumpSumBalance) / lumpSumBalance) * 10000) / 100
      },
      monthlyData
    };
  },

  /**
   * Calculate average cost basis from multiple purchases
   * @param {array} purchases - Array of {amount, price} objects
   * @returns {object} Cost basis analysis
   */
  calculateAverageCost(purchases) {
    let totalShares = 0;
    let totalCost = 0;
    
    for (const purchase of purchases) {
      const shares = purchase.amount / purchase.price;
      totalShares += shares;
      totalCost += purchase.amount;
    }
    
    const averageCost = totalShares > 0 ? totalCost / totalShares : 0;
    
    return {
      totalInvested: Math.round(totalCost * 100) / 100,
      totalShares: Math.round(totalShares * 10000) / 10000,
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
  module.exports = DollarCostAveragingFormula;
}
