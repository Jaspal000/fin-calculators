/**
 * Auto Loan Calculator Formula
 * Calculates car loan payments with trade-in and down payment
 */

const AutoLoanFormula = {
  /**
   * Calculate auto loan details
   * @param {number} carPrice - Vehicle price
   * @param {number} downPayment - Down payment amount
   * @param {number} tradeInValue - Trade-in value
   * @param {number} salesTaxRate - Sales tax rate (as decimal)
   * @param {number} annualRate - Annual interest rate
   * @param {number} months - Loan term in months
   * @param {number} fees - Additional fees
   * @returns {object} Loan details
   */
  calculateLoan(carPrice, downPayment, tradeInValue, salesTaxRate, annualRate, months, fees = 0) {
    const salesTax = carPrice * salesTaxRate;
    const loanAmount = carPrice + salesTax + fees - downPayment - tradeInValue;
    const monthlyRate = annualRate / 12;
    
    let monthlyPayment;
    if (annualRate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                      (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - loanAmount;
    const totalCost = carPrice + salesTax + fees + totalInterest;
    
    return {
      carPrice: Math.round(carPrice * 100) / 100,
      salesTax: Math.round(salesTax * 100) / 100,
      fees: Math.round(fees * 100) / 100,
      downPayment: Math.round(downPayment * 100) / 100,
      tradeInValue: Math.round(tradeInValue * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayments: Math.round(totalPayments * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100
    };
  },

  /**
   * Calculate affordable car price based on monthly budget
   * @param {number} monthlyBudget - Maximum monthly payment
   * @param {number} downPayment - Available down payment
   * @param {number} tradeInValue - Trade-in value
   * @param {number} salesTaxRate - Sales tax rate
   * @param {number} annualRate - Annual interest rate
   * @param {number} months - Loan term
   * @returns {number} Affordable car price
   */
  calculateAffordablePrice(monthlyBudget, downPayment, tradeInValue, salesTaxRate, annualRate, months) {
    const monthlyRate = annualRate / 12;
    
    let maxLoanAmount;
    if (annualRate === 0) {
      maxLoanAmount = monthlyBudget * months;
    } else {
      maxLoanAmount = monthlyBudget * (Math.pow(1 + monthlyRate, months) - 1) /
                     (monthlyRate * Math.pow(1 + monthlyRate, months));
    }
    
    const availableFunds = maxLoanAmount + downPayment + tradeInValue;
    const affordablePrice = availableFunds / (1 + salesTaxRate);
    
    return Math.round(affordablePrice * 100) / 100;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AutoLoanFormula;
}
