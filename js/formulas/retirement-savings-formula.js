/**
 * Retirement Savings Calculator Formula
 * Calculates retirement savings needs and projections
 */

const RetirementSavingsFormula = {
  /**
   * Calculate retirement savings projection
   * @param {number} currentAge - Current age
   * @param {number} retirementAge - Desired retirement age
   * @param {number} currentSavings - Current retirement savings
   * @param {number} monthlyContribution - Monthly contribution
   * @param {number} annualReturn - Expected annual return
   * @param {number} desiredIncome - Desired annual retirement income
   * @returns {object} Retirement analysis
   */
  calculateRetirementSavings(currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, desiredIncome) {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = annualReturn / 12;
    
    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
    
    // Future value of contributions
    const fvContributions = monthlyContribution * 
      (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn;
    
    const projectedSavings = fvCurrentSavings + fvContributions;
    
    // Required savings using 4% rule
    const requiredSavings = desiredIncome / 0.04;
    
    // Gap analysis
    const savingsGap = Math.max(0, requiredSavings - projectedSavings);
    
    // Required monthly contribution to meet goal
    let requiredMonthlyContribution = 0;
    if (savingsGap > 0) {
      requiredMonthlyContribution = savingsGap * monthlyReturn / 
        (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1);
    }
    
    // Yearly projection
    const yearlyData = [];
    let runningBalance = currentSavings;
    for (let year = currentAge; year <= retirementAge; year++) {
      yearlyData.push({
        age: year,
        balance: Math.round(runningBalance * 100) / 100,
        contributions: Math.round((year - currentAge) * 12 * monthlyContribution * 100) / 100
      });
      runningBalance = runningBalance * (1 + annualReturn) + (monthlyContribution * 12);
    }
    
    return {
      currentAge,
      retirementAge,
      yearsToRetirement,
      currentSavings: Math.round(currentSavings * 100) / 100,
      monthlyContribution: Math.round(monthlyContribution * 100) / 100,
      projectedSavings: Math.round(projectedSavings * 100) / 100,
      requiredSavings: Math.round(requiredSavings * 100) / 100,
      savingsGap: Math.round(savingsGap * 100) / 100,
      requiredMonthlyContribution: Math.round(requiredMonthlyContribution * 100) / 100,
      onTrack: projectedSavings >= requiredSavings,
      yearlyData,
      safeWithdrawal: Math.round(projectedSavings * 0.04 * 100) / 100
    };
  },

  /**
   * Calculate how long savings will last in retirement
   * @param {number} startingBalance - Retirement savings at start
   * @param {number} annualWithdrawal - Annual withdrawal amount
   * @param {number} annualReturn - Expected annual return in retirement
   * @returns {number} Years savings will last
   */
  calculateSavingsLongevity(startingBalance, annualWithdrawal, annualReturn) {
    if (annualWithdrawal >= startingBalance * annualReturn) {
      // Will eventually deplete
      let balance = startingBalance;
      let years = 0;
      while (balance > 0 && years < 100) {
        balance = balance * (1 + annualReturn) - annualWithdrawal;
        years++;
      }
      return years;
    }
    return Infinity; // Will last indefinitely
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RetirementSavingsFormula;
}
