/**
 * Tax Refund Calculator Formula
 * Estimates tax refund or amount owed
 */

const TaxRefundFormula = {
  // 2024 Federal Tax Brackets (Single)
  bracketsSingle: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],

  // 2024 Federal Tax Brackets (Married Filing Jointly)
  bracketsMFJ: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],

  // Standard Deductions 2024
  standardDeductions: {
    single: 14600,
    married: 29200,
    hoh: 21900
  },

  /**
   * Calculate federal income tax
   * @param {number} income - Gross income
   * @param {string} filingStatus - single, married, hoh
   * @param {number} withholding - Total withholding
   * @param {number} deductions - Itemized deductions (0 for standard)
   * @param {number} credits - Tax credits
   * @returns {object} Tax calculation
   */
  calculateTaxRefund(income, filingStatus, withholding, deductions = 0, credits = 0) {
    const standardDeduction = this.standardDeductions[filingStatus] || this.standardDeductions.single;
    const deduction = Math.max(deductions, standardDeduction);
    const taxableIncome = Math.max(0, income - deduction);
    
    const brackets = filingStatus === 'married' ? this.bracketsMFJ : this.bracketsSingle;
    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;
    
    const bracketBreakdown = [];
    
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const bracketSize = bracket.limit - previousLimit;
      const taxableInBracket = Math.min(remainingIncome, bracketSize);
      const bracketTax = taxableInBracket * bracket.rate;
      
      tax += bracketTax;
      remainingIncome -= taxableInBracket;
      
      bracketBreakdown.push({
        rate: bracket.rate * 100,
        taxableAmount: Math.round(taxableInBracket * 100) / 100,
        tax: Math.round(bracketTax * 100) / 100
      });
      
      previousLimit = bracket.limit;
    }
    
    const taxAfterCredits = Math.max(0, tax - credits);
    const refund = withholding - taxAfterCredits;
    
    return {
      grossIncome: Math.round(income * 100) / 100,
      deduction: Math.round(deduction * 100) / 100,
      taxableIncome: Math.round(taxableIncome * 100) / 100,
      taxBeforeCredits: Math.round(tax * 100) / 100,
      credits: Math.round(credits * 100) / 100,
      taxAfterCredits: Math.round(taxAfterCredits * 100) / 100,
      withholding: Math.round(withholding * 100) / 100,
      refund: Math.round(refund * 100) / 100,
      isRefund: refund > 0,
      effectiveRate: taxableIncome > 0 ? Math.round((taxAfterCredits / income) * 10000) / 100 : 0,
      marginalRate: this.getMarginalRate(taxableIncome, brackets),
      bracketBreakdown
    };
  },

  getMarginalRate(taxableIncome, brackets) {
    let previousLimit = 0;
    for (const bracket of brackets) {
      if (taxableIncome <= bracket.limit) {
        return bracket.rate * 100;
      }
      previousLimit = bracket.limit;
    }
    return 37;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaxRefundFormula;
}
