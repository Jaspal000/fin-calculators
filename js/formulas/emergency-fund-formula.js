/**
 * Emergency Fund Calculator Formula
 * Calculates recommended emergency savings
 */

const EmergencyFundFormula = {
  /**
   * Calculate emergency fund needs
   * @param {number} monthlyExpenses - Monthly essential expenses
   * @param {number} jobStability - Job stability factor (1-5, 5 most stable)
   * @param {number} dependents - Number of dependents
   * @param {boolean} dualIncome - Whether household has dual income
   * @returns {object} Emergency fund recommendation
   */
  calculateEmergencyFund(monthlyExpenses, jobStability, dependents, dualIncome) {
    // Base recommendation: 3-6 months
    let monthsNeeded = 3;
    
    // Adjust for job stability
    if (jobStability <= 2) monthsNeeded += 3;
    else if (jobStability === 3) monthsNeeded += 1;
    
    // Adjust for dependents
    if (dependents > 0) monthsNeeded += 1;
    if (dependents > 2) monthsNeeded += 1;
    
    // Adjust for dual income
    if (dualIncome) monthsNeeded -= 1;
    
    // Cap at reasonable limits
    monthsNeeded = Math.max(3, Math.min(12, monthsNeeded));
    
    const recommendedAmount = monthlyExpenses * monthsNeeded;
    const minimumAmount = monthlyExpenses * 3;
    const idealAmount = monthlyExpenses * 6;
    
    return {
      monthlyExpenses: Math.round(monthlyExpenses * 100) / 100,
      monthsNeeded,
      recommendedAmount: Math.round(recommendedAmount * 100) / 100,
      minimumAmount: Math.round(minimumAmount * 100) / 100,
      idealAmount: Math.round(idealAmount * 100) / 100,
      factors: {
        jobStability,
        dependents,
        dualIncome
      },
      milestones: {
        oneMonth: Math.round(monthlyExpenses * 100) / 100,
        threeMonths: Math.round(monthlyExpenses * 3 * 100) / 100,
        sixMonths: Math.round(monthlyExpenses * 6 * 100) / 100,
        twelveMonths: Math.round(monthlyExpenses * 12 * 100) / 100
      }
    };
  },

  /**
   * Calculate time to reach emergency fund goal
   * @param {number} currentSavings - Current emergency savings
   * @param {number} goalAmount - Target emergency fund
   * @param {number} monthlyContribution - Monthly contribution
   * @returns {object} Timeline to goal
   */
  calculateTimeToGoal(currentSavings, goalAmount, monthlyContribution) {
    const remaining = Math.max(0, goalAmount - currentSavings);
    const months = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : Infinity;
    
    return {
      currentSavings: Math.round(currentSavings * 100) / 100,
      goalAmount: Math.round(goalAmount * 100) / 100,
      remaining: Math.round(remaining * 100) / 100,
      monthlyContribution: Math.round(monthlyContribution * 100) / 100,
      monthsToGoal: months,
      yearsToGoal: Math.floor(months / 12),
      remainingMonths: months % 12
    };
  },

  /**
   * Calculate emergency fund coverage
   * @param {number} emergencyFund - Current emergency fund
   * @param {object} expenses - Monthly expense breakdown
   * @returns {object} Coverage analysis
   */
  calculateCoverage(emergencyFund, expenses) {
    const essentialExpenses = 
      (expenses.housing || 0) +
      (expenses.utilities || 0) +
      (expenses.groceries || 0) +
      (expenses.insurance || 0) +
      (expenses.transportation || 0) +
      (expenses.minimumDebtPayments || 0);
    
    const discretionaryExpenses =
      (expenses.entertainment || 0) +
      (expenses.dining || 0) +
      (expenses.shopping || 0) +
      (expenses.subscriptions || 0);
    
    const totalExpenses = essentialExpenses + discretionaryExpenses;
    
    return {
      emergencyFund: Math.round(emergencyFund * 100) / 100,
      essentialExpenses: Math.round(essentialExpenses * 100) / 100,
      discretionaryExpenses: Math.round(discretionaryExpenses * 100) / 100,
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      coverage: {
        essentialMonths: Math.floor(emergencyFund / essentialExpenses),
        totalMonths: Math.floor(emergencyFund / totalExpenses),
        essentialPercentage: Math.round((emergencyFund / (essentialExpenses * 6)) * 10000) / 100
      }
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
  module.exports = EmergencyFundFormula;
}
