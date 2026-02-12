/**
 * Home Equity Calculator Formula
 * Calculates available home equity and borrowing capacity
 */

const HomeEquityFormula = {
  /**
   * Calculate home equity details
   * @param {number} homeValue - Current home value
   * @param {number} mortgageBalance - Current mortgage balance
   * @param {number} maxLTV - Maximum loan-to-value ratio (default 0.80)
   * @returns {object} Equity details
   */
  calculateEquity(homeValue, mortgageBalance, maxLTV = 0.80) {
    const equity = homeValue - mortgageBalance;
    const equityPercentage = (equity / homeValue) * 100;
    const maxTotalLoans = homeValue * maxLTV;
    const availableEquity = Math.max(0, maxTotalLoans - mortgageBalance);
    const ltv = (mortgageBalance / homeValue) * 100;
    const combinedLTV = ((mortgageBalance + availableEquity) / homeValue) * 100;
    
    return {
      homeValue: Math.round(homeValue * 100) / 100,
      mortgageBalance: Math.round(mortgageBalance * 100) / 100,
      totalEquity: Math.round(equity * 100) / 100,
      equityPercentage: Math.round(equityPercentage * 100) / 100,
      availableEquity: Math.round(availableEquity * 100) / 100,
      currentLTV: Math.round(ltv * 100) / 100,
      maxCombinedLTV: maxLTV * 100,
      combinedLTVAfter: Math.round(combinedLTV * 100) / 100
    };
  },

  /**
   * Calculate HELOC payment
   * @param {number} balance - HELOC balance
   * @param {number} annualRate - Annual interest rate
   * @param {number} interestOnly - Whether payment is interest-only
   * @returns {object} Payment details
   */
  calculateHELOCPayment(balance, annualRate, interestOnly = true) {
    const monthlyRate = annualRate / 12;
    const interestPayment = balance * monthlyRate;
    
    if (interestOnly) {
      return {
        monthlyPayment: Math.round(interestPayment * 100) / 100,
        interestOnly: true,
        principalPayment: 0
      };
    }
    
    // 20-year amortization for repayment
    const months = 240;
    const monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      interestOnly: false,
      principalPayment: Math.round((monthlyPayment - interestPayment) * 100) / 100
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
  module.exports = HomeEquityFormula;
}
