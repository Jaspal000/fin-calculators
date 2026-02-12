/**
 * Mortgage Calculator Formula
 * Calculates mortgage payments, total interest, and amortization schedule
 */

const MortgageFormula = {
  /**
   * Calculate monthly mortgage payment (PITI)
   * @param {number} principal - Loan amount
   * @param {number} annualRate - Annual interest rate (as decimal, e.g., 0.065 for 6.5%)
   * @param {number} years - Loan term in years
   * @param {number} propertyTax - Annual property tax
   * @param {number} insurance - Annual homeowners insurance
   * @param {number} pmi - Annual PMI (if applicable)
   * @returns {object} Payment breakdown
   */
  calculateMonthlyPayment(principal, annualRate, years, propertyTax = 0, insurance = 0, pmi = 0) {
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    let principalInterest;
    if (annualRate === 0) {
      principalInterest = principal / numPayments;
    } else {
      principalInterest = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                         (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmi / 12;
    
    return {
      principalInterest: Math.round(principalInterest * 100) / 100,
      tax: Math.round(monthlyTax * 100) / 100,
      insurance: Math.round(monthlyInsurance * 100) / 100,
      pmi: Math.round(monthlyPMI * 100) / 100,
      total: Math.round((principalInterest + monthlyTax + monthlyInsurance + monthlyPMI) * 100) / 100
    };
  },

  /**
   * Calculate total interest paid over loan life
   * @param {number} principal - Loan amount
   * @param {number} monthlyPayment - Monthly principal + interest payment
   * @param {number} years - Loan term
   * @returns {number} Total interest
   */
  calculateTotalInterest(principal, monthlyPayment, years) {
    const totalPayments = monthlyPayment * years * 12;
    return Math.round((totalPayments - principal) * 100) / 100;
  },

  /**
   * Generate amortization schedule
   * @param {number} principal - Loan amount
   * @param {number} annualRate - Annual interest rate
   * @param {number} years - Loan term
   * @returns {array} Amortization schedule
   */
  generateAmortizationSchedule(principal, annualRate, years) {
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    const monthlyPayment = this.calculateMonthlyPayment(principal, annualRate, years).principalInterest;
    
    const schedule = [];
    let balance = principal;
    let totalInterest = 0;
    
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;
      
      if (balance < 0) balance = 0;
      
      schedule.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        balance: Math.round(balance * 100) / 100
      });
    }
    
    return schedule;
  },

  /**
   * Calculate maximum home price based on monthly budget
   * @param {number} monthlyBudget - Maximum monthly payment
   * @param {number} annualRate - Annual interest rate
   * @param {number} years - Loan term
   * @param {number} downPayment - Down payment amount
   * @returns {number} Maximum home price
   */
  calculateMaxHomePrice(monthlyBudget, annualRate, years, downPayment) {
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    let maxPrincipal;
    if (annualRate === 0) {
      maxPrincipal = monthlyBudget * numPayments;
    } else {
      maxPrincipal = monthlyBudget * (Math.pow(1 + monthlyRate, numPayments) - 1) / 
                    (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    }
    
    return Math.round((maxPrincipal + downPayment) * 100) / 100;
  },

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }
};

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MortgageFormula;
}
