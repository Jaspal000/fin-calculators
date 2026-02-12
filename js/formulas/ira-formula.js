/**
 * IRA Calculator Formula
 * Compares Traditional vs Roth IRA
 */

const IRAFormula = {
  // 2024 IRA contribution limits
  contributionLimit: 7000,
  catchUpContribution: 1000,

  /**
   * Compare Traditional vs Roth IRA
   * @param {number} currentTaxRate - Current marginal tax rate
   * @param {number} retirementTaxRate - Expected retirement tax rate
   * @param {number} annualContribution - Annual contribution amount
   * @param {number} years - Years until retirement
   * @param {number} annualReturn - Expected annual return
   * @param {number} currentAge - Current age
   * @returns {object} IRA comparison
   */
  compareIRA(currentTaxRate, retirementTaxRate, annualContribution, years, annualReturn, currentAge) {
    const monthlyReturn = annualReturn / 12;
    const months = years * 12;
    const monthlyContribution = annualContribution / 12;
    
    // Check contribution limit
    const limit = currentAge >= 50 ? this.contributionLimit + this.catchUpContribution : this.contributionLimit;
    const effectiveContribution = Math.min(annualContribution, limit);
    
    // Traditional IRA: tax deduction now, taxable withdrawals
    const traditionalTaxSavings = effectiveContribution * currentTaxRate;
    let traditionalBalance = 0;
    
    for (let i = 0; i < months; i++) {
      traditionalBalance = traditionalBalance * (1 + monthlyReturn) + (effectiveContribution / 12);
    }
    
    const traditionalTaxOnWithdrawal = traditionalBalance * retirementTaxRate;
    const traditionalAfterTax = traditionalBalance - traditionalTaxOnWithdrawal;
    
    // Roth IRA: after-tax contribution, tax-free growth
    const rothContribution = effectiveContribution * (1 - currentTaxRate); // After-tax equivalent
    let rothBalance = 0;
    
    for (let i = 0; i < months; i++) {
      rothBalance = rothBalance * (1 + monthlyReturn) + (effectiveContribution / 12);
    }
    
    const rothAfterTax = rothBalance; // No tax on withdrawal
    
    // Determine winner
    const difference = rothAfterTax - traditionalAfterTax;
    const winner = difference > 0 ? 'roth' : 'traditional';
    
    return {
      currentTaxRate: Math.round(currentTaxRate * 10000) / 100,
      retirementTaxRate: Math.round(retirementTaxRate * 10000) / 100,
      annualContribution: Math.round(effectiveContribution * 100) / 100,
      contributionLimit: limit,
      years,
      traditional: {
        balance: Math.round(traditionalBalance * 100) / 100,
        taxDeduction: Math.round(traditionalTaxSavings * 100) / 100,
        taxOnWithdrawal: Math.round(traditionalTaxOnWithdrawal * 100) / 100,
        afterTaxValue: Math.round(traditionalAfterTax * 100) / 100
      },
      roth: {
        balance: Math.round(rothBalance * 100) / 100,
        afterTaxValue: Math.round(rothAfterTax * 100) / 100,
        taxFreeGrowth: Math.round((rothBalance - (effectiveContribution * years)) * 100) / 100
      },
      recommendation: winner,
      difference: Math.round(Math.abs(difference) * 100) / 100,
      advantage: Math.round((Math.abs(difference) / Math.max(traditionalAfterTax, rothAfterTax)) * 10000) / 100
    };
  },

  /**
   * Calculate IRA growth over time
   * @param {number} initialBalance - Starting balance
   * @param {number} annualContribution - Annual contribution
   * @param {number} annualReturn - Expected return
   * @param {number} years - Investment period
   * @returns {array} Yearly balances
   */
  calculateGrowth(initialBalance, annualContribution, annualReturn, years) {
    const data = [];
    let balance = initialBalance;
    let totalContributions = initialBalance;
    
    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        balance: Math.round(balance * 100) / 100,
        contributions: Math.round(totalContributions * 100) / 100,
        growth: Math.round((balance - totalContributions) * 100) / 100
      });
      
      balance = balance * (1 + annualReturn) + annualContribution;
      totalContributions += annualContribution;
    }
    
    return data;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = IRAFormula;
}
