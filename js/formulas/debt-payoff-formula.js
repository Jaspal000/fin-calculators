/**
 * Debt Payoff Calculator Formula
 * Calculates debt elimination strategies
 */

const DebtPayoffFormula = {
  /**
   * Calculate debt payoff using avalanche method
   * @param {array} debts - Array of debt objects {name, balance, rate, minimumPayment}
   * @param {number} extraPayment - Extra monthly payment
   * @returns {object} Payoff plan
   */
  calculateAvalanche(debts, extraPayment) {
    // Sort by interest rate (highest first)
    const sortedDebts = [...debts].sort((a, b) => b.rate - a.rate);
    
    return this.calculatePayoffPlan(sortedDebts, extraPayment, 'avalanche');
  },

  /**
   * Calculate debt payoff using snowball method
   * @param {array} debts - Array of debt objects
   * @param {number} extraPayment - Extra monthly payment
   * @returns {object} Payoff plan
   */
  calculateSnowball(debts, extraPayment) {
    // Sort by balance (smallest first)
    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    
    return this.calculatePayoffPlan(sortedDebts, extraPayment, 'snowball');
  },

  /**
   * Calculate payoff plan
   * @param {array} sortedDebts - Debts sorted by strategy
   * @param {number} extraPayment - Extra monthly payment
   * @param {string} method - 'avalanche' or 'snowball'
   * @returns {object} Payoff details
   */
  calculatePayoffPlan(sortedDebts, extraPayment, method) {
    const debts = sortedDebts.map(d => ({ ...d, remaining: d.balance }));
    let month = 0;
    let totalInterest = 0;
    const schedule = [];
    const payoffOrder = [];
    
    while (debts.some(d => d.remaining > 0) && month < 600) {
      month++;
      let monthlyExtra = extraPayment;
      const monthData = { month, payments: [], totalPaid: 0 };
      
      for (const debt of debts) {
        if (debt.remaining <= 0) continue;
        
        const interest = debt.remaining * (debt.rate / 12);
        totalInterest += interest;
        debt.remaining += interest;
        
        let payment = debt.minimumPayment;
        
        // Apply extra to first non-zero debt
        if (monthlyExtra > 0 && debt.remaining > 0) {
          payment += monthlyExtra;
          monthlyExtra = 0;
        }
        
        // Don't overpay
        payment = Math.min(payment, debt.remaining);
        debt.remaining -= payment;
        
        monthData.payments.push({
          name: debt.name,
          payment: Math.round(payment * 100) / 100,
          interest: Math.round(interest * 100) / 100,
          remaining: Math.round(Math.max(0, debt.remaining) * 100) / 100
        });
        
        monthData.totalPaid += payment;
        
        // Track payoff
        if (debt.remaining <= 0 && !payoffOrder.find(p => p.name === debt.name)) {
          payoffOrder.push({ name: debt.name, month });
        }
      }
      
      schedule.push(monthData);
    }
    
    const totalPayments = debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest;
    
    return {
      method,
      months: month,
      years: Math.floor(month / 12),
      remainingMonths: month % 12,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayments: Math.round(totalPayments * 100) / 100,
      payoffOrder,
      schedule: schedule.slice(0, 12) // First year only for display
    };
  },

  /**
   * Compare avalanche vs snowball
   * @param {array} debts - Array of debt objects
   * @param {number} extraPayment - Extra monthly payment
   * @returns {object} Comparison
   */
  compareMethods(debts, extraPayment) {
    const avalanche = this.calculateAvalanche(debts, extraPayment);
    const snowball = this.calculateSnowball(debts, extraPayment);
    
    return {
      avalanche,
      snowball,
      winner: avalanche.totalInterest < snowball.totalInterest ? 'avalanche' : 'snowball',
      interestDifference: Math.round(Math.abs(avalanche.totalInterest - snowball.totalInterest) * 100) / 100,
      timeDifference: Math.abs(avalanche.months - snowball.months),
      recommendation: avalanche.totalInterest < snowball.totalInterest * 0.95 
        ? 'avalanche' 
        : 'snowball'
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
  module.exports = DebtPayoffFormula;
}
