/**
 * Social Security Calculator Formula
 * Estimates Social Security benefits
 */

const SocialSecurityFormula = {
  // 2024 bend points (approximate)
  firstBendPoint: 1174,
  secondBendPoint: 7078,

  /**
   * Calculate Social Security benefit
   * @param {number} aime - Average Indexed Monthly Earnings
   * @param {number} claimingAge - Age when claiming benefits
   * @param {number} fra - Full Retirement Age (default 67)
   * @returns {object} Benefit calculation
   */
  calculateBenefit(aime, claimingAge, fra = 67) {
    // Calculate PIA (Primary Insurance Amount)
    let pia = 0;
    
    if (aime <= this.firstBendPoint) {
      pia = aime * 0.90;
    } else if (aime <= this.secondBendPoint) {
      pia = (this.firstBendPoint * 0.90) + 
            ((aime - this.firstBendPoint) * 0.32);
    } else {
      pia = (this.firstBendPoint * 0.90) + 
            ((this.secondBendPoint - this.firstBendPoint) * 0.32) +
            ((aime - this.secondBendPoint) * 0.15);
    }
    
    // Apply claiming age adjustment
    const ageDiff = claimingAge - fra;
    let adjustmentFactor = 1;
    
    if (ageDiff < 0) {
      // Claiming early - reduction
      const monthsEarly = Math.abs(ageDiff) * 12;
      adjustmentFactor = 1 - (monthsEarly * 0.005556); // ~5/9 of 1% per month
    } else if (ageDiff > 0) {
      // Claiming late - increase
      const monthsLate = ageDiff * 12;
      adjustmentFactor = 1 + (monthsLate * 0.006667); // 2/3 of 1% per month
    }
    
    const monthlyBenefit = pia * adjustmentFactor;
    const annualBenefit = monthlyBenefit * 12;
    
    // Calculate benefit at different ages
    const age62Benefit = monthlyBenefit * (claimingAge === 62 ? 1 : Math.pow(1 - 0.005556 * 12, fra - 62));
    const fraBenefit = pia;
    const age70Benefit = pia * (1 + (0.006667 * 12 * 3)); // Max at age 70
    
    return {
      aime: Math.round(aime * 100) / 100,
      pia: Math.round(pia * 100) / 100,
      claimingAge,
      fra,
      adjustmentFactor: Math.round(adjustmentFactor * 10000) / 10000,
      monthlyBenefit: Math.round(monthlyBenefit * 100) / 100,
      annualBenefit: Math.round(annualBenefit * 100) / 100,
      comparison: {
        age62: Math.round(age62Benefit * 100) / 100,
        fra: Math.round(fraBenefit * 100) / 100,
        age70: Math.round(age70Benefit * 100) / 100
      },
      breakEvenAnalysis: this.calculateBreakEven(monthlyBenefit, claimingAge, fra)
    };
  },

  /**
   * Calculate AIME from annual earnings
   * @param {array} earnings - Array of annual earnings (top 35 years)
   * @returns {number} AIME
   */
  calculateAIME(earnings) {
    // Sort and take top 35 years
    const top35 = earnings
      .filter(e => e > 0)
      .sort((a, b) => b - a)
      .slice(0, 35);
    
    const totalEarnings = top35.reduce((sum, e) => sum + e, 0);
    const aime = totalEarnings / (35 * 12);
    
    return Math.round(aime * 100) / 100;
  },

  /**
   * Calculate break-even age for claiming strategy
   * @param {number} benefit - Monthly benefit at claiming age
   * @param {number} claimingAge - Age when claiming
   * @param {number} fra - Full retirement age
   * @returns {object} Break-even analysis
   */
  calculateBreakEven(benefit, claimingAge, fra) {
    const fraBenefit = benefit / (1 - (fra - claimingAge) * 12 * 0.005556);
    const cumulativeEarly = [];
    const cumulativeFRA = [];
    
    let earlyTotal = 0;
    let fraTotal = 0;
    let breakEvenAge = null;
    
    for (let age = claimingAge; age <= 100; age++) {
      if (age >= claimingAge) {
        earlyTotal += benefit * 12;
      }
      if (age >= fra) {
        fraTotal += fraBenefit * 12;
      }
      
      cumulativeEarly.push({ age, total: earlyTotal });
      cumulativeFRA.push({ age, total: fraTotal });
      
      if (breakEvenAge === null && fraTotal >= earlyTotal && age >= fra) {
        breakEvenAge = age;
      }
    }
    
    return {
      breakEvenAge,
      cumulativeEarly,
      cumulativeFRA
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
  module.exports = SocialSecurityFormula;
}
