/**
 * Retirement Income Calculator UI Logic
 */

class RetirementIncomeCalculator extends CalculatorBase {
  constructor() {
    super(RetirementIncomeFormula);
  }

  init() {
    this.bindInputs([
      'retirementSavings',
      'socialSecurity',
      'pension',
      'otherIncome',
      'withdrawalRate'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const retirementSavings = this.getInput('retirementSavings');
    const socialSecurity = this.getInput('socialSecurity');
    const pension = this.getInput('pension');
    const otherIncome = this.getInput('otherIncome');
    const withdrawalRate = this.getInput('withdrawalRate') / 100;

    const result = this.formula.calculateRetirementIncome(
      retirementSavings, socialSecurity, pension, otherIncome, withdrawalRate
    );

    this.setResult('totalMonthlyIncome', result.monthlyIncome.total);
    this.setResult('savingsWithdrawal', result.monthlyIncome.savingsWithdrawal);
    this.setResult('annualIncome', result.annualIncome.total);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('retirementincomecalculator')) {
    const calculator = new RetirementIncomeCalculator();
    calculator.init();
  }
});
