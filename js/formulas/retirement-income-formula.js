/**
 * Retirement Income Calculator Formula
 * Estimates retirement income from all sources
 */

const RetirementIncomeFormula = {
  /**
   * Calculate retirement income
   * @param {number} retirementSavings - Total retirement savings
   * @param {number} socialSecurity - Monthly Social Security benefit
   * @param {number} pension - Monthly pension income
   * @param {number} otherIncome - Other monthly income
   * @param {number} withdrawalRate - Safe withdrawal rate (default 4%)
   * @returns {object} Income breakdown
   */
  calculateRetirementIncome(retirementSavings, socialSecurity, pension, otherIncome, withdrawalRate = 0.04) {
    const annualSavingsWithdrawal = retirementSavings * withdrawalRate;
    const monthlySavingsWithdrawal = annualSavingsWithdrawal / 12;
    
    const totalMonthlyIncome = monthlySavingsWithdrawal + socialSecurity + pension + otherIncome;
    const totalAnnualIncome = totalMonthlyIncome * 12;
    
    return {
      retirementSavings: Math.round(retirementSavings * 100) / 100,
      withdrawalRate: Math.round(withdrawalRate * 10000) / 100,
      monthlyIncome: {
        savingsWithdrawal: Math.round(monthlySavingsWithdrawal * 100) / 100,
        socialSecurity: Math.round(socialSecurity * 100) / 100,
        pension: Math.round(pension * 100) / 100,
        other: Math.round(otherIncome * 100) / 100,
        total: Math.round(totalMonthlyIncome * 100) / 100
      },
      annualIncome: {
        savingsWithdrawal: Math.round(annualSavingsWithdrawal * 100) / 100,
        socialSecurity: Math.round(socialSecurity * 12 * 100) / 100,
        pension: Math.round(pension * 12 * 100) / 100,
        other: Math.round(otherIncome * 12 * 100) / 100,
        total: Math.round(totalAnnualIncome * 100) / 100
      },
      incomeSources: {
        savings: Math.round((monthlySavingsWithdrawal / totalMonthlyIncome) * 10000) / 100,
        socialSecurity: Math.round((socialSecurity / totalMonthlyIncome) * 10000) / 100,
        pension: Math.round((pension / totalMonthlyIncome) * 10000) / 100,
        other: Math.round((otherIncome / totalMonthlyIncome) * 10000) / 100
      }
    };
  },

  /**
   * Calculate required savings for target income
   * @param {number} targetMonthlyIncome - Desired monthly income
   * @param {number} socialSecurity - Expected Social Security
   * @param {number} pension - Expected pension
   * @param {number} withdrawalRate - Safe withdrawal rate
   * @returns {object} Required savings
   */
  calculateRequiredSavings(targetMonthlyIncome, socialSecurity, pension, withdrawalRate = 0.04) {
    const incomeGap = Math.max(0, targetMonthlyIncome - socialSecurity - pension);
    const requiredSavings = (incomeGap * 12) / withdrawalRate;
    
    return {
      targetMonthlyIncome: Math.round(targetMonthlyIncome * 100) / 100,
      guaranteedIncome: Math.round((socialSecurity + pension) * 100) / 100,
      incomeGap: Math.round(incomeGap * 100) / 100,
      requiredSavings: Math.round(requiredSavings * 100) / 100,
      withdrawalRate: Math.round(withdrawalRate * 10000) / 100
    };
  },

  /**
   * Project income over retirement years
   * @param {number} startingSavings - Initial retirement savings
   * @param {number} monthlyIncome - Monthly income needed
   * @param {number} annualReturn - Expected return in retirement
   * @param {number} inflation - Expected inflation rate
   * @returns {array} Yearly projections
   */
  projectRetirementYears(startingSavings, monthlyIncome, annualReturn, inflation = 0.025) {
    const projections = [];
    let balance = startingSavings;
    let currentIncome = monthlyIncome;
    let year = 0;
    
    while (balance > 0 && year < 50) {
      const annualWithdrawal = currentIncome * 12;
      const investmentReturn = balance * annualReturn;
      
      balance = balance + investmentReturn - annualWithdrawal;
      
      projections.push({
        year,
        startingBalance: Math.round((balance + annualWithdrawal - investmentReturn) * 100) / 100,
        withdrawals: Math.round(annualWithdrawal * 100) / 100,
        investmentReturn: Math.round(investmentReturn * 100) / 100,
        endingBalance: Math.round(Math.max(0, balance) * 100) / 100,
        monthlyIncome: Math.round(currentIncome * 100) / 100
      });
      
      currentIncome = currentIncome * (1 + inflation);
      year++;
    }
    
    return projections;
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RetirementIncomeFormula;
}
