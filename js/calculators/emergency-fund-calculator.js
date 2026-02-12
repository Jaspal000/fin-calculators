/**
 * Emergency Fund Calculator UI Logic
 */

class EmergencyFundCalculator extends CalculatorBase {
  constructor() {
    super(EmergencyFundFormula);
  }

  init() {
    this.bindInputs([
      'monthlyExpenses',
      'jobStability',
      'dependents',
      'dualIncome',
      'currentSavings'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const monthlyExpenses = this.getInput('monthlyExpenses');
    const jobStability = parseInt(document.getElementById('jobStability').value);
    const dependents = this.getInput('dependents');
    const dualIncome = document.getElementById('dualIncome')?.checked || false;

    const result = this.formula.calculateEmergencyFund(
      monthlyExpenses, jobStability, dependents, dualIncome
    );

    this.setResult('recommendedAmount', result.recommendedAmount);
    this.setResult('minimumAmount', result.minimumAmount);
    this.setResult('idealAmount', result.idealAmount);
    this.setResult('monthsNeeded', result.monthsNeeded, 'number');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('emergencyfundcalculator')) {
    const calculator = new EmergencyFundCalculator();
    calculator.init();
  }
});
