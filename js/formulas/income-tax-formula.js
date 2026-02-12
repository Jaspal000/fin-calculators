/**
 * Income Tax Calculator Formula
 * Calculates federal income tax based on brackets
 */

const IncomeTaxFormula = {
  brackets2024: {
    single: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    married: [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ],
    hoh: [
      { limit: 16550, rate: 0.10 },
      { limit: 63100, rate: 0.12 },
      { limit: 100500, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243700, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ]
  },

  standardDeductions: {
    single: 14600,
    married: 29200,
    hoh: 21900
  },

  calculateIncomeTax(income, filingStatus = 'single', deductions = 0) {
    const standardDeduction = this.standardDeductions[filingStatus] || this.standardDeductions.single;
    const deduction = Math.max(deductions, standardDeduction);
    const taxableIncome = Math.max(0, income - deduction);
    
    const brackets = this.brackets2024[filingStatus] || this.brackets2024.single;
    let totalTax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;
    
    const bracketDetails = [];
    
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const bracketSize = bracket.limit === Infinity ? Infinity : bracket.limit - previousLimit;
      const taxableInBracket = Math.min(remainingIncome, bracketSize);
      const taxInBracket = taxableInBracket * bracket.rate;
      
      totalTax += taxInBracket;
      remainingIncome -= taxableInBracket;
      
      bracketDetails.push({
        bracket: `${(bracket.rate * 100).toFixed(0)}%`,
        incomeInBracket: Math.round(taxableInBracket * 100) / 100,
        tax: Math.round(taxInBracket * 100) / 100
      });
      
      previousLimit = bracket.limit;
    }
    
    return {
      grossIncome: Math.round(income * 100) / 100,
      standardDeduction: Math.round(standardDeduction * 100) / 100,
      itemizedDeductions: deductions > standardDeduction ? Math.round(deductions * 100) / 100 : 0,
      totalDeductions: Math.round(deduction * 100) / 100,
      taxableIncome: Math.round(taxableIncome * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      effectiveTaxRate: income > 0 ? Math.round((totalTax / income) * 10000) / 100 : 0,
      marginalTaxRate: this.getMarginalRate(taxableIncome, brackets),
      takeHomePay: Math.round((income - totalTax) * 100) / 100,
      bracketDetails
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
  module.exports = IncomeTaxFormula;
}
