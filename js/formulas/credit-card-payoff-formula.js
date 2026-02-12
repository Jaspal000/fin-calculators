/**
 * Credit Card Payoff Calculator Formula
 * Calculates credit card debt elimination
 */

const CreditCardPayoffFormula = {
  /**
   * Calculate credit card payoff
   * @param {number} balance - Current balance
   * @param {number} apr - Annual percentage rate
   * @param {number} monthlyPayment - Monthly payment amount
   * @returns {object} Payoff details
   */
  calculatePayoff(balance, apr, monthlyPayment) {
    const monthlyRate = apr / 12;
    let remaining = balance;
    let months = 0;
    let totalInterest = 0;
    const schedule = [];
    
    while (remaining > 0 && months < 600) {
      months++;
      const interest = remaining * monthlyRate;
      const principal = Math.min(monthlyPayment - interest, remaining);
      
      remaining = remaining + interest - monthlyPayment;
      totalInterest += interest;
      
      if (remaining < 0) remaining = 0;
      
      schedule.push({
        month: months,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(remaining * 100) / 100
      });
    }
    
    const totalPaid = balance + totalInterest;
    
    return {
      balance: Math.round(balance * 100) / 100,
      apr: Math.round(apr * 10000) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPaid: Math.round(totalPaid * 100) / 100,
      schedule: schedule.slice(0, 24) // First 24 months for display
    };
  },

  /**
   * Calculate minimum payment scenario
   * @param {number} balance - Current balance
   * @param {number} apr - Annual percentage rate
   * @param {number} minPaymentPercent - Minimum payment percentage
   * @returns {object} Minimum payment details
   */
  calculateMinimumPayment(balance, apr, minPaymentPercent = 0.02) {
    const minimumPayment = Math.max(25, balance * minPaymentPercent);
    return this.calculatePayoff(balance, apr, minimumPayment);
  },

  /**
   * Find payment to payoff by target date
   * @param {number} balance - Current balance
   * @param {number} apr - Annual percentage rate
   * @param {number} targetMonths - Target months to payoff
   * @returns {number} Required monthly payment
   */
  calculateRequiredPayment(balance, apr, targetMonths) {
    const monthlyRate = apr / 12;
    
    if (apr === 0) {
      return balance / targetMonths;
    }
    
    const payment = balance * (monthlyRate * Math.pow(1 + monthlyRate, targetMonths)) /
                   (Math.pow(1 + monthlyRate, targetMonths) - 1);
    
    return Math.ceil(payment * 100) / 100;
  },

  /**
   * Compare payment scenarios
   * @param {number} balance - Current balance
   * @param {number} apr - Annual percentage rate
   * @param {number} currentPayment - Current monthly payment
   * @param {number} increasedPayment - Increased monthly payment
   * @returns {object} Comparison
   */
  compareScenarios(balance, apr, currentPayment, increasedPayment) {
    const current = this.calculatePayoff(balance, apr, currentPayment);
    const increased = this.calculatePayoff(balance, apr, increasedPayment);
    
    return {
      current,
      increased,
      monthsSaved: current.months - increased.months,
      interestSaved: Math.round((current.totalInterest - increased.totalInterest) * 100) / 100,
      additionalMonthly: Math.round((increasedPayment - currentPayment) * 100) / 100
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
  module.exports = CreditCardPayoffFormula;
}
