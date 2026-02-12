/**
 * Loan Payoff Calculator Formula
 * Calculates payoff dates with extra payments and interest savings
 */

const LoanPayoffFormula = {
  /**
   * Calculate loan payoff with extra payments
   * @param {number} balance - Current loan balance
   * @param {number} annualRate - Annual interest rate
   * @param {number} monthlyPayment - Current monthly payment
   * @param {number} extraPayment - Additional monthly payment
   * @returns {object} Payoff details
   */
  calculatePayoff(balance, annualRate, monthlyPayment, extraPayment = 0) {
    const monthlyRate = annualRate / 12;
    const totalMonthlyPayment = monthlyPayment + extraPayment;
    
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;
    const schedule = [];
    
    while (currentBalance > 0 && months < 600) {
      const interest = currentBalance * monthlyRate;
      const principal = Math.min(totalMonthlyPayment - interest, currentBalance);
      
      currentBalance -= principal;
      totalInterest += interest;
      months++;
      
      schedule.push({
        month: months,
        payment: Math.round((principal + interest) * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(Math.max(0, currentBalance) * 100) / 100
      });
    }
    
    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPaid: Math.round((balance + totalInterest) * 100) / 100,
      schedule
    };
  },

  /**
   * Compare standard vs extra payment scenarios
   * @param {number} balance - Loan balance
   * @param {number} annualRate - Annual interest rate
   * @param {number} monthlyPayment - Standard monthly payment
   * @param {number} extraPayment - Extra monthly payment
   * @returns {object} Comparison results
   */
  compareScenarios(balance, annualRate, monthlyPayment, extraPayment) {
    const standard = this.calculatePayoff(balance, annualRate, monthlyPayment, 0);
    const withExtra = this.calculatePayoff(balance, annualRate, monthlyPayment, extraPayment);
    
    return {
      standard,
      withExtra,
      monthsSaved: standard.months - withExtra.months,
      interestSaved: Math.round((standard.totalInterest - withExtra.totalInterest) * 100) / 100,
      yearsSaved: Math.floor((standard.months - withExtra.months) / 12),
      monthsRemaining: (standard.months - withExtra.months) % 12
    };
  },

  /**
   * Calculate required extra payment to payoff by target date
   * @param {number} balance - Current balance
   * @param {number} annualRate - Annual interest rate
   * @param {number} monthlyPayment - Current monthly payment
   * @param {number} targetMonths - Target payoff in months
   * @returns {number} Required extra payment
   */
  calculateRequiredExtraPayment(balance, annualRate, monthlyPayment, targetMonths) {
    const monthlyRate = annualRate / 12;
    
    // Binary search for the required payment
    let low = 0;
    let high = balance * 2;
    let requiredPayment = monthlyPayment;
    
    for (let i = 0; i < 100; i++) {
      const testPayment = (low + high) / 2;
      const result = this.calculatePayoff(balance, annualRate, testPayment, 0);
      
      if (result.months <= targetMonths) {
        high = testPayment;
        requiredPayment = testPayment;
      } else {
        low = testPayment;
      }
    }
    
    return Math.round((requiredPayment - monthlyPayment) * 100) / 100;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LoanPayoffFormula;
}
