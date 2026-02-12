/**
 * Self-Employment Tax Calculator Formula
 * Calculates SE tax for freelancers and contractors
 */

const SelfEmploymentTaxFormula = {
  // 2024 rates
  socialSecurityRate: 0.124,
  medicareRate: 0.029,
  additionalMedicareRate: 0.009,
  socialSecurityWageBase: 168600,
  selfEmploymentTaxRate: 0.153, // 12.4% + 2.9%

  calculateSETax(netEarnings, otherWages = 0) {
    // 92.35% of net earnings is subject to SE tax
    const taxableEarnings = netEarnings * 0.9235;
    
    // Social Security portion (capped at wage base)
    const remainingWageBase = Math.max(0, this.socialSecurityWageBase - otherWages);
    const socialSecurityEarnings = Math.min(taxableEarnings, remainingWageBase);
    const socialSecurityTax = socialSecurityEarnings * this.socialSecurityRate;
    
    // Medicare portion (no cap)
    const medicareTax = taxableEarnings * this.medicareRate;
    
    // Additional Medicare for high earners
    const additionalMedicareThreshold = 200000; // Single filer
    let additionalMedicareTax = 0;
    if (taxableEarnings > additionalMedicareThreshold) {
      additionalMedicareTax = (taxableEarnings - additionalMedicareThreshold) * this.additionalMedicareRate;
    }
    
    const totalSETax = socialSecurityTax + medicareTax + additionalMedicareTax;
    
    // Deductible portion (50% of SE tax)
    const deductiblePortion = totalSETax * 0.5;
    
    // Quarterly estimated payments
    const quarterlyPayment = totalSETax / 4;
    
    return {
      netEarnings: Math.round(netEarnings * 100) / 100,
      taxableEarnings: Math.round(taxableEarnings * 100) / 100,
      socialSecurityTax: Math.round(socialSecurityTax * 100) / 100,
      medicareTax: Math.round(medicareTax * 100) / 100,
      additionalMedicareTax: Math.round(additionalMedicareTax * 100) / 100,
      totalSETax: Math.round(totalSETax * 100) / 100,
      deductiblePortion: Math.round(deductiblePortion * 100) / 100,
      quarterlyPayment: Math.round(quarterlyPayment * 100) / 100,
      effectiveRate: netEarnings > 0 ? Math.round((totalSETax / netEarnings) * 10000) / 100 : 0
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
  module.exports = SelfEmploymentTaxFormula;
}
