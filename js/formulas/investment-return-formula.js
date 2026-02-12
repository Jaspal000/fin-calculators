/**
 * Investment Return Calculator Formula
 * Calculates ROI, CAGR, and annualized returns
 */

const InvestmentReturnFormula = {
  /**
   * Calculate total return
   * @param {number} initialInvestment - Initial amount invested
   * @param {number} finalValue - Final investment value
   * @param {number} dividends - Dividends received
   * @returns {object} Return details
   */
  calculateTotalReturn(initialInvestment, finalValue, dividends = 0) {
    const totalReturn = (finalValue - initialInvestment) + dividends;
    const totalReturnPercent = (totalReturn / initialInvestment) * 100;
    
    return {
      initialInvestment: Math.round(initialInvestment * 100) / 100,
      finalValue: Math.round(finalValue * 100) / 100,
      dividends: Math.round(dividends * 100) / 100,
      totalReturn: Math.round(totalReturn * 100) / 100,
      totalReturnPercent: Math.round(totalReturnPercent * 100) / 100
    };
  },

  /**
   * Calculate CAGR (Compound Annual Growth Rate)
   * @param {number} initialValue - Starting value
   * @param {number} finalValue - Ending value
   * @param {number} years - Number of years
   * @returns {object} CAGR details
   */
  calculateCAGR(initialValue, finalValue, years) {
    const cagr = Math.pow(finalValue / initialValue, 1 / years) - 1;
    const cagrPercent = cagr * 100;
    
    return {
      initialValue: Math.round(initialValue * 100) / 100,
      finalValue: Math.round(finalValue * 100) / 100,
      years,
      cagr: Math.round(cagrPercent * 100) / 100,
      doublingTime: cagr > 0 ? Math.round(72 / cagrPercent * 10) / 10 : 0
    };
  },

  /**
   * Calculate annualized return
   * @param {number} totalReturnPercent - Total return percentage
   * @param {number} years - Investment period
   * @returns {number} Annualized return percentage
   */
  calculateAnnualizedReturn(totalReturnPercent, years) {
    const totalReturn = totalReturnPercent / 100;
    const annualized = Math.pow(1 + totalReturn, 1 / years) - 1;
    return Math.round(annualized * 10000) / 100;
  },

  /**
   * Compare multiple investments
   * @param {array} investments - Array of investment objects
   * @returns {array} Comparison results
   */
  compareInvestments(investments) {
    return investments.map(inv => {
      const totalReturn = this.calculateTotalReturn(inv.initial, inv.final, inv.dividends || 0);
      const cagr = this.calculateCAGR(inv.initial, inv.final + (inv.dividends || 0), inv.years);
      
      return {
        name: inv.name,
        ...totalReturn,
        cagr: cagr.cagr,
        annualizedReturn: this.calculateAnnualizedReturn(totalReturn.totalReturnPercent, inv.years)
      };
    });
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  formatPercent(value) {
    return `${value}%`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = InvestmentReturnFormula;
}
