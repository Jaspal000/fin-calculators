/**
 * Budget Calculator Formula
 * Creates personalized budgets using various methods
 */

const BudgetFormula = {
  /**
   * Calculate 50/30/20 budget
   * @param {number} income - Monthly after-tax income
   * @returns {object} Budget breakdown
   */
  calculate503020Budget(income) {
    const needs = income * 0.50;
    const wants = income * 0.30;
    const savings = income * 0.20;
    
    return {
      method: '50/30/20 Rule',
      income: Math.round(income * 100) / 100,
      categories: {
        needs: {
          amount: Math.round(needs * 100) / 100,
          percentage: 50,
          examples: ['Rent/Mortgage', 'Utilities', 'Groceries', 'Insurance', 'Minimum Debt Payments']
        },
        wants: {
          amount: Math.round(wants * 100) / 100,
          percentage: 30,
          examples: ['Dining Out', 'Entertainment', 'Hobbies', 'Subscriptions', 'Shopping']
        },
        savings: {
          amount: Math.round(savings * 100) / 100,
          percentage: 20,
          examples: ['Emergency Fund', 'Retirement', 'Debt Payoff', 'Investments']
        }
      }
    };
  },

  /**
   * Calculate zero-based budget
   * @param {number} income - Monthly income
   * @param {object} expenses - Expense categories
   * @returns {object} Budget analysis
   */
  calculateZeroBasedBudget(income, expenses) {
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const remaining = income - totalExpenses;
    
    return {
      method: 'Zero-Based Budget',
      income: Math.round(income * 100) / 100,
      expenses: Object.entries(expenses).map(([category, amount]) => ({
        category,
        amount: Math.round(amount * 100) / 100,
        percentage: Math.round((amount / income) * 10000) / 100
      })),
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      remaining: Math.round(remaining * 100) / 100,
      balanced: remaining === 0
    };
  },

  /**
   * Calculate envelope budget allocations
   * @param {number} income - Monthly income
   * @param {object} allocations - Category percentages
   * @returns {object} Envelope allocations
   */
  calculateEnvelopeBudget(income, allocations) {
    const envelopes = Object.entries(allocations).map(([category, percentage]) => ({
      category,
      percentage,
      amount: Math.round(income * (percentage / 100) * 100) / 100
    }));
    
    const totalAllocated = envelopes.reduce((sum, env) => sum + env.amount, 0);
    
    return {
      method: 'Envelope Budget',
      income: Math.round(income * 100) / 100,
      envelopes,
      totalAllocated: Math.round(totalAllocated * 100) / 100,
      unallocated: Math.round((income - totalAllocated) * 100) / 100
    };
  },

  /**
   * Analyze spending vs recommended
   * @param {number} income - Monthly income
   * @param {object} actualSpending - Actual spending by category
   * @returns {object} Spending analysis
   */
  analyzeSpending(income, actualSpending) {
    const recommended = {
      housing: income * 0.30,
      food: income * 0.15,
      transportation: income * 0.10,
      utilities: income * 0.10,
      savings: income * 0.20,
      debt: income * 0.10,
      other: income * 0.05
    };
    
    const analysis = Object.entries(actualSpending).map(([category, actual]) => {
      const rec = recommended[category] || 0;
      const difference = actual - rec;
      const status = difference > rec * 0.1 ? 'over' : difference < -rec * 0.1 ? 'under' : 'on-track';
      
      return {
        category,
        actual: Math.round(actual * 100) / 100,
        recommended: Math.round(rec * 100) / 100,
        difference: Math.round(difference * 100) / 100,
        status
      };
    });
    
    return {
      income: Math.round(income * 100) / 100,
      analysis,
      totalSpending: Math.round(Object.values(actualSpending).reduce((sum, val) => sum + val, 0) * 100) / 100
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
  module.exports = BudgetFormula;
}
