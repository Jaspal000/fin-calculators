/**
 * Compound Interest Calculator Formula
 * Calculates investment growth with compound interest
 */

const CompoundInterestFormula = {
  /**
   * Calculate compound interest
   * @param {number} principal - Initial investment
   * @param {number} monthlyContribution - Monthly addition
   * @param {number} annualRate - Annual interest rate
   * @param {number} years - Investment period
   * @param {number} compoundFrequency - Times per year interest compounds
   * @returns {object} Growth details
   */
  calculateCompoundInterest(principal, monthlyContribution, annualRate, years, compoundFrequency = 12) {
    const periods = years * compoundFrequency;
    const ratePerPeriod = annualRate / compoundFrequency;
    const monthlyToPeriod = monthlyContribution * (12 / compoundFrequency);
    
    // Future value of principal
    const fvPrincipal = principal * Math.pow(1 + ratePerPeriod, periods);
    
    // Future value of contributions
    const fvContributions = monthlyToPeriod * 
      (Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod;
    
    const totalBalance = fvPrincipal + fvContributions;
    const totalContributions = principal + (monthlyContribution * 12 * years);
    const totalInterest = totalBalance - totalContributions;
    
    // Generate yearly breakdown
    const yearlyData = [];
    for (let year = 0; year <= years; year++) {
      const yearPeriods = year * compoundFrequency;
      const yearPrincipal = principal * Math.pow(1 + ratePerPeriod, yearPeriods);
      const yearContributions = monthlyToPeriod * 
        (Math.pow(1 + ratePerPeriod, yearPeriods) - 1) / ratePerPeriod;
      const yearBalance = yearPrincipal + yearContributions;
      const yearTotalContributions = principal + (monthlyContribution * 12 * year);
      
      yearlyData.push({
        year,
        balance: Math.round(yearBalance * 100) / 100,
        contributions: Math.round(yearTotalContributions * 100) / 100,
        interest: Math.round((yearBalance - yearTotalContributions) * 100) / 100
      });
    }
    
    return {
      principal: Math.round(principal * 100) / 100,
      monthlyContribution: Math.round(monthlyContribution * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      finalBalance: Math.round(totalBalance * 100) / 100,
      years,
      yearlyData
    };
  },

  /**
   * Rule of 72 - years to double investment
   * @param {number} annualRate - Annual interest rate
   * @returns {number} Years to double
   */
  ruleOf72(annualRate) {
    return annualRate > 0 ? Math.round(72 / (annualRate * 100) * 10) / 10 : 0;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompoundInterestFormula;
}
