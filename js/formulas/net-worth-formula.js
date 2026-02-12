/**
 * Net Worth Calculator Formula
 * Calculates net worth from assets and liabilities
 */

const NetWorthFormula = {
  /**
   * Calculate net worth
   * @param {object} assets - Asset categories
   * @param {object} liabilities - Liability categories
   * @returns {object} Net worth analysis
   */
  calculateNetWorth(assets, liabilities) {
    const assetCategories = {
      cash: assets.cash || 0,
      investments: assets.investments || 0,
      retirement: assets.retirement || 0,
      realEstate: assets.realEstate || 0,
      vehicles: assets.vehicles || 0,
      personalProperty: assets.personalProperty || 0,
      otherAssets: assets.otherAssets || 0
    };
    
    const liabilityCategories = {
      mortgage: liabilities.mortgage || 0,
      carLoans: liabilities.carLoans || 0,
      studentLoans: liabilities.studentLoans || 0,
      creditCards: liabilities.creditCards || 0,
      personalLoans: liabilities.personalLoans || 0,
      otherDebts: liabilities.otherDebts || 0
    };
    
    const totalAssets = Object.values(assetCategories).reduce((sum, val) => sum + val, 0);
    const totalLiabilities = Object.values(liabilityCategories).reduce((sum, val) => sum + val, 0);
    const netWorth = totalAssets - totalLiabilities;
    
    // Calculate asset allocation
    const assetAllocation = Object.entries(assetCategories).map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: totalAssets > 0 ? Math.round((amount / totalAssets) * 10000) / 100 : 0
    })).sort((a, b) => b.amount - a.amount);
    
    // Calculate debt composition
    const debtComposition = Object.entries(liabilityCategories).map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: totalLiabilities > 0 ? Math.round((amount / totalLiabilities) * 10000) / 100 : 0
    })).sort((a, b) => b.amount - a.amount);
    
    // Key ratios
    const debtToAsset = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    const liquidAssets = assetCategories.cash + assetCategories.investments;
    const liquidityRatio = totalLiabilities > 0 ? (liquidAssets / totalLiabilities) * 100 : 0;
    
    return {
      assets: {
        breakdown: assetCategories,
        total: Math.round(totalAssets * 100) / 100,
        allocation: assetAllocation
      },
      liabilities: {
        breakdown: liabilityCategories,
        total: Math.round(totalLiabilities * 100) / 100,
        composition: debtComposition
      },
      netWorth: Math.round(netWorth * 100) / 100,
      ratios: {
        debtToAsset: Math.round(debtToAsset * 100) / 100,
        liquidityRatio: Math.round(liquidityRatio * 100) / 100,
        netWorthStatus: netWorth > 0 ? 'positive' : 'negative'
      }
    };
  },

  /**
   * Project net worth over time
   * @param {number} currentNetWorth - Current net worth
   * @param {number} annualSavings - Annual savings rate
   * @param {number} annualReturn - Expected return on assets
   * @param {number} years - Projection period
   * @returns {array} Yearly projections
   */
  projectNetWorth(currentNetWorth, annualSavings, annualReturn, years) {
    const projections = [];
    let netWorth = currentNetWorth;
    
    for (let year = 0; year <= years; year++) {
      projections.push({
        year,
        netWorth: Math.round(netWorth * 100) / 100,
        totalSavings: Math.round(annualSavings * year * 100) / 100,
        investmentGrowth: Math.round((netWorth - (currentNetWorth + annualSavings * year)) * 100) / 100
      });
      
      netWorth = netWorth * (1 + annualReturn) + annualSavings;
    }
    
    return projections;
  },

  /**
   * Compare to benchmarks
   * @param {number} netWorth - Current net worth
   * @param {number} age - Current age
   * @param {number} income - Annual income
   * @returns {object} Benchmark comparison
   */
  compareToBenchmarks(netWorth, age, income) {
    // Common benchmarks
    const benchmarks = {
      byAge: {
        '30': age * income / 10,
        '40': age * income / 5,
        '50': age * income / 3.5,
        '60': age * income / 2.5
      },
      medianByAge: {
        '30': 35000,
        '40': 90000,
        '50': 170000,
        '60': 250000
      }
    };
    
    const ageBracket = Math.floor(age / 10) * 10;
    const target = benchmarks.byAge[ageBracket] || netWorth;
    const median = benchmarks.medianByAge[ageBracket] || netWorth;
    
    return {
      yourNetWorth: Math.round(netWorth * 100) / 100,
      targetForAge: Math.round(target * 100) / 100,
      medianForAge: Math.round(median * 100) / 100,
      vsTarget: Math.round(((netWorth - target) / target) * 10000) / 100,
      vsMedian: Math.round(((netWorth - median) / median) * 10000) / 100,
      onTrack: netWorth >= target * 0.8
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
  module.exports = NetWorthFormula;
}
