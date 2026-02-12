/**
 * Dividend Calculator Formula
 * Calculates dividend income and yield
 */

const DividendFormula = {
  /**
   * Calculate dividend metrics
   * @param {number} sharePrice - Current share price
   * @param {number} sharesOwned - Number of shares owned
   * @param {number} annualDividend - Annual dividend per share
   * @param {number} dividendGrowth - Expected annual dividend growth rate
   * @param {number} years - Projection period
   * @returns {object} Dividend analysis
   */
  calculateDividends(sharePrice, sharesOwned, annualDividend, dividendGrowth = 0, years = 10) {
    const currentYield = (annualDividend / sharePrice) * 100;
    const annualIncome = annualDividend * sharesOwned;
    const portfolioValue = sharePrice * sharesOwned;
    
    // Project future dividends
    const projections = [];
    let projectedDividend = annualDividend;
    let cumulativeDividends = 0;
    
    for (let year = 1; year <= years; year++) {
      projectedDividend = projectedDividend * (1 + dividendGrowth);
      const yearIncome = projectedDividend * sharesOwned;
      cumulativeDividends += yearIncome;
      
      projections.push({
        year,
        dividendPerShare: Math.round(projectedDividend * 100) / 100,
        annualIncome: Math.round(yearIncome * 100) / 100,
        yieldOnCost: Math.round((projectedDividend / sharePrice) * 10000) / 100,
        cumulativeDividends: Math.round(cumulativeDividends * 100) / 100
      });
    }
    
    // Dividend reinvestment scenario
    let reinvestedShares = sharesOwned;
    let reinvestedValue = portfolioValue;
    
    for (let year = 1; year <= years; year++) {
      const yearDividend = annualDividend * Math.pow(1 + dividendGrowth, year);
      const yearIncome = yearDividend * reinvestedShares;
      const newShares = yearIncome / sharePrice;
      reinvestedShares += newShares;
      reinvestedValue = reinvestedShares * sharePrice;
    }
    
    return {
      sharePrice: Math.round(sharePrice * 100) / 100,
      sharesOwned: Math.round(sharesOwned * 100) / 100,
      portfolioValue: Math.round(portfolioValue * 100) / 100,
      annualDividend: Math.round(annualDividend * 100) / 100,
      currentYield: Math.round(currentYield * 100) / 100,
      annualIncome: Math.round(annualIncome * 100) / 100,
      monthlyIncome: Math.round((annualIncome / 12) * 100) / 100,
      dividendGrowth: Math.round(dividendGrowth * 10000) / 100,
      projections,
      reinvestmentScenario: {
        finalShares: Math.round(reinvestedShares * 100) / 100,
        finalValue: Math.round(reinvestedValue * 100) / 100,
        additionalShares: Math.round((reinvestedShares - sharesOwned) * 100) / 100,
        additionalValue: Math.round((reinvestedValue - portfolioValue) * 100) / 100
      }
    };
  },

  /**
   * Calculate dividend yield on cost
   * @param {number} costBasis - Original cost per share
   * @param {number} currentDividend - Current annual dividend
   * @returns {number} Yield on cost percentage
   */
  calculateYieldOnCost(costBasis, currentDividend) {
    return Math.round((currentDividend / costBasis) * 10000) / 100;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DividendFormula;
}
