/**
 * 401k Calculator Formula
 * Calculates 401k growth with employer matching
 */

const Formula401k = {
  /**
   * Calculate 401k projection
   * @param {number} currentBalance - Current 401k balance
   * @param {number} annualSalary - Annual salary
   * @param {number} contributionPercent - Employee contribution percentage
   * @param {number} employerMatchPercent - Employer match percentage
   * @param {number} employerMatchLimit - Employer match limit percentage
   * @param {number} annualReturn - Expected annual return
   * @param {number} years - Years until retirement
   * @param {number} annualSalaryIncrease - Expected annual salary increase
   * @returns {object} 401k projection
   */
  calculate401k(currentBalance, annualSalary, contributionPercent, employerMatchPercent, 
                employerMatchLimit, annualReturn, years, annualSalaryIncrease = 0) {
    const monthlyReturn = annualReturn / 12;
    const months = years * 12;
    
    let balance = currentBalance;
    let totalEmployeeContributions = 0;
    let totalEmployerContributions = 0;
    let currentSalary = annualSalary;
    
    const yearlyData = [];
    
    for (let year = 1; year <= years; year++) {
      const yearEmployeeContribution = currentSalary * (contributionPercent / 100);
      const matchableAmount = currentSalary * (employerMatchLimit / 100);
      const yearEmployerContribution = Math.min(
        yearEmployeeContribution * (employerMatchPercent / 100),
        matchableAmount * (employerMatchPercent / 100)
      );
      
      totalEmployeeContributions += yearEmployeeContribution;
      totalEmployerContributions += yearEmployerContribution;
      
      const monthlyEmployeeContribution = yearEmployeeContribution / 12;
      const monthlyEmployerContribution = yearEmployerContribution / 12;
      
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyEmployeeContribution + monthlyEmployerContribution;
      }
      
      yearlyData.push({
        year,
        salary: Math.round(currentSalary * 100) / 100,
        balance: Math.round(balance * 100) / 100,
        employeeContribution: Math.round(yearEmployeeContribution * 100) / 100,
        employerContribution: Math.round(yearEmployerContribution * 100) / 100
      });
      
      currentSalary = currentSalary * (1 + annualSalaryIncrease);
    }
    
    const totalContributions = totalEmployeeContributions + totalEmployerContributions;
    const investmentGrowth = balance - totalContributions - currentBalance;
    
    return {
      currentBalance: Math.round(currentBalance * 100) / 100,
      startingSalary: Math.round(annualSalary * 100) / 100,
      contributionPercent,
      employerMatchPercent,
      employerMatchLimit,
      years,
      finalBalance: Math.round(balance * 100) / 100,
      totalEmployeeContributions: Math.round(totalEmployeeContributions * 100) / 100,
      totalEmployerContributions: Math.round(totalEmployerContributions * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      investmentGrowth: Math.round(investmentGrowth * 100) / 100,
      freeMoney: Math.round(totalEmployerContributions * 100) / 100,
      yearlyData
    };
  },

  /**
   * Calculate contribution limit impact
   * @param {number} annualSalary - Annual salary
   * @param {number} contributionPercent - Current contribution percent
   * @param {number} age - Current age
   * @returns {object} Limit analysis
   */
  checkContributionLimits(annualSalary, contributionPercent, age) {
    const employeeLimit = age >= 50 ? 30500 : 23000; // 2024 limits
    const currentContribution = annualSalary * (contributionPercent / 100);
    const canIncrease = currentContribution < employeeLimit;
    const maxPercent = (employeeLimit / annualSalary) * 100;
    
    return {
      currentContribution: Math.round(currentContribution * 100) / 100,
      employeeLimit,
      remainingSpace: Math.round((employeeLimit - currentContribution) * 100) / 100,
      canIncrease,
      maxPercent: Math.round(maxPercent * 100) / 100,
      catchUpEligible: age >= 50
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
  module.exports = Formula401k;
}
