/**
 * Capital Gains Tax Calculator Formula
 * Calculates short-term and long-term capital gains tax
 */

const CapitalGainsTaxFormula = {
  // 2024 Long-term capital gains brackets
  ltcgBrackets: {
    single: [
      { limit: 47025, rate: 0 },
      { limit: 518900, rate: 0.15 },
      { limit: Infinity, rate: 0.20 }
    ],
    married: [
      { limit: 94050, rate: 0 },
      { limit: 583750, rate: 0.15 },
      { limit: Infinity, rate: 0.20 }
    ],
    hoh: [
      { limit: 63000, rate: 0 },
      { limit: 551350, rate: 0.15 },
      { limit: Infinity, rate: 0.20 }
    ]
  },

  // NIIT threshold
  niitThreshold: {
    single: 200000,
    married: 250000,
    hoh: 200000
  },

  calculateCapitalGains(purchasePrice, salePrice, holdingPeriodMonths, filingStatus = 'single', ordinaryIncome = 0) {
    const gain = salePrice - purchasePrice;
    const isLongTerm = holdingPeriodMonths >= 12;
    
    let tax = 0;
    let taxRate = 0;
    let niit = 0;
    
    if (gain <= 0) {
      return {
        purchasePrice: Math.round(purchasePrice * 100) / 100,
        salePrice: Math.round(salePrice * 100) / 100,
        gain: Math.round(gain * 100) / 100,
        isLongTerm,
        holdingPeriodMonths,
        tax: 0,
        taxRate: 0,
        niit: 0,
        totalTax: 0,
        netProceeds: Math.round(salePrice * 100) / 100
      };
    }
    
    if (isLongTerm) {
      // Long-term capital gains
      const brackets = this.ltcgBrackets[filingStatus] || this.ltcgBrackets.single;
      const totalIncome = ordinaryIncome + gain;
      
      // Find applicable rate based on total income
      for (const bracket of brackets) {
        if (totalIncome <= bracket.limit) {
          taxRate = bracket.rate;
          break;
        }
      }
      
      // If in highest bracket, all gains at 20%
      if (totalIncome > brackets[brackets.length - 2].limit) {
        taxRate = 0.20;
      }
      
      tax = gain * taxRate;
      
      // NIIT (3.8% for high earners)
      const niitThreshold = this.niitThreshold[filingStatus] || this.niitThreshold.single;
      if (totalIncome > niitThreshold) {
        const niitAmount = Math.min(gain, totalIncome - niitThreshold);
        niit = niitAmount * 0.038;
      }
    } else {
      // Short-term capital gains (taxed as ordinary income)
      // Simplified - assumes 22% for demonstration
      taxRate = 0.22;
      tax = gain * taxRate;
    }
    
    const totalTax = tax + niit;
    
    return {
      purchasePrice: Math.round(purchasePrice * 100) / 100,
      salePrice: Math.round(salePrice * 100) / 100,
      gain: Math.round(gain * 100) / 100,
      isLongTerm,
      holdingPeriodMonths,
      tax: Math.round(tax * 100) / 100,
      taxRate: Math.round(taxRate * 10000) / 100,
      niit: Math.round(niit * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      netProceeds: Math.round((salePrice - totalTax) * 100) / 100,
      effectiveRate: gain > 0 ? Math.round((totalTax / gain) * 10000) / 100 : 0
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
  module.exports = CapitalGainsTaxFormula;
}
