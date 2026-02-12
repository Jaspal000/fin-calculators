/**
 * Tax-Deferred Growth Calculator Formula
 * Compares taxable vs tax-deferred investment growth
 */

const TaxDeferredFormula = {
  calculateGrowth(initialInvestment, monthlyContribution, annualReturn, years, taxRate, contributionType = 'traditional') {
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    
    // Taxable account calculation
    let taxableBalance = initialInvestment;
    let taxableContributions = initialInvestment;
    let taxableCostBasis = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      const returnAmount = taxableBalance * monthlyRate;
      const taxOnReturn = returnAmount * taxRate;
      taxableBalance += returnAmount - taxOnReturn + monthlyContribution;
      taxableContributions += monthlyContribution;
      taxableCostBasis += monthlyContribution;
    }
    
    // Tax-deferred account calculation (Traditional 401k/IRA)
    let deferredBalance = initialInvestment;
    let deferredContributions = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      deferredBalance = deferredBalance * (1 + monthlyRate) + monthlyContribution;
      deferredContributions += monthlyContribution;
    }
    
    // After-tax value of deferred account
    const deferredTax = (deferredBalance - deferredContributions) * taxRate;
    const deferredAfterTax = deferredBalance - deferredTax;
    
    // Roth account calculation (after-tax contributions, tax-free growth)
    let rothBalance = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      rothBalance = rothBalance * (1 + monthlyRate) + monthlyContribution;
    }
    
    return {
      years,
      initialInvestment: Math.round(initialInvestment * 100) / 100,
      totalContributions: Math.round(deferredContributions * 100) / 100,
      taxable: {
        balance: Math.round(taxableBalance * 100) / 100,
        contributions: Math.round(taxableContributions * 100) / 100,
        growth: Math.round((taxableBalance - taxableContributions) * 100) / 100
      },
      traditional: {
        balance: Math.round(deferredBalance * 100) / 100,
        contributions: Math.round(deferredContributions * 100) / 100,
        growth: Math.round((deferredBalance - deferredContributions) * 100) / 100,
        taxOnWithdrawal: Math.round(deferredTax * 100) / 100,
        afterTaxValue: Math.round(deferredAfterTax * 100) / 100
      },
      roth: {
        balance: Math.round(rothBalance * 100) / 100,
        contributions: Math.round(deferredContributions * 100) / 100,
        growth: Math.round((rothBalance - deferredContributions) * 100) / 100,
        afterTaxValue: Math.round(rothBalance * 100) / 100
      },
      advantage: Math.round((deferredAfterTax - taxableBalance) * 100) / 100
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
  module.exports = TaxDeferredFormula;
}
