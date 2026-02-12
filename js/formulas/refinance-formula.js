/**
 * Refinance Calculator Formula
 * Calculates break-even and savings from refinancing
 */

const RefinanceFormula = {
  /**
   * Calculate refinance savings
   * @param {number} currentBalance - Current loan balance
   * @param {number} currentRate - Current interest rate
   * @param {number} currentPayment - Current monthly payment
   * @param {number} newRate - New interest rate
   * @param {number} newTerm - New loan term in years
   * @param {number} closingCosts - Total closing costs
   * @returns {object} Refinance analysis
   */
  calculateRefinance(currentBalance, currentRate, currentPayment, newRate, newTerm, closingCosts) {
    const monthlyNewRate = newRate / 12;
    const newMonths = newTerm * 12;
    
    // Calculate new monthly payment
    let newMonthlyPayment;
    if (newRate === 0) {
      newMonthlyPayment = currentBalance / newMonths;
    } else {
      newMonthlyPayment = currentBalance * (monthlyNewRate * Math.pow(1 + monthlyNewRate, newMonths)) /
                         (Math.pow(1 + monthlyNewRate, newMonths) - 1);
    }
    
    const monthlySavings = currentPayment - newMonthlyPayment;
    
    // Calculate break-even
    const breakEvenMonths = closingCosts / monthlySavings;
    
    // Calculate total interest comparison
    const currentMonthsRemaining = this.estimateRemainingMonths(currentBalance, currentRate, currentPayment);
    const currentTotalInterest = (currentPayment * currentMonthsRemaining) - currentBalance;
    const newTotalInterest = (newMonthlyPayment * newMonths) - currentBalance;
    const interestSavings = currentTotalInterest - newTotalInterest;
    
    return {
      newMonthlyPayment: Math.round(newMonthlyPayment * 100) / 100,
      monthlySavings: Math.round(monthlySavings * 100) / 100,
      breakEvenMonths: Math.ceil(breakEvenMonths),
      breakEvenYears: Math.floor(breakEvenMonths / 12),
      breakEvenRemainingMonths: Math.ceil(breakEvenMonths % 12),
      totalInterestSavings: Math.round(interestSavings * 100) / 100,
      closingCosts: Math.round(closingCosts * 100) / 100,
      shouldRefinance: monthlySavings > 0 && breakEvenMonths < 60
    };
  },

  /**
   * Estimate remaining months on current loan
   * @param {number} balance - Current balance
   * @param {number} rate - Annual rate
   * @param {number} monthlyPayment - Monthly payment
   * @returns {number} Estimated remaining months
   */
  estimateRemainingMonths(balance, rate, monthlyPayment) {
    const monthlyRate = rate / 12;
    let months = 0;
    let currentBalance = balance;
    
    while (currentBalance > 0 && months < 600) {
      const interest = currentBalance * monthlyRate;
      const principal = monthlyPayment - interest;
      currentBalance -= principal;
      months++;
    }
    
    return months;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RefinanceFormula;
}
