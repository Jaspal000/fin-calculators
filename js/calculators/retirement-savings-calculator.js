/**
 * Retirement Savings Calculator UI Logic
 */

class RetirementSavingsCalculator extends CalculatorBase {
  constructor() {
    super(RetirementSavingsFormula);
  }

  init() {
    this.bindInputs([
      'currentAge',
      'retirementAge',
      'currentSavings',
      'monthlyContribution',
      'annualReturn',
      'desiredIncome'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const currentAge = this.getInput('currentAge');
    const retirementAge = this.getInput('retirementAge');
    const currentSavings = this.getInput('currentSavings');
    const monthlyContribution = this.getInput('monthlyContribution');
    const annualReturn = this.getInput('annualReturn') / 100;
    const desiredIncome = this.getInput('desiredIncome');

    if (retirementAge <= currentAge) {
      return;
    }

    const result = this.formula.calculateRetirementSavings(
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      annualReturn,
      desiredIncome
    );

    // Update results
    this.setResult('projectedSavings', result.projectedSavings);
    this.setResult('requiredSavings', result.requiredSavings);
    this.setResult('savingsGap', result.savingsGap);
    this.setResult('requiredMonthlyContribution', result.requiredMonthlyContribution);
    this.setResult('safeWithdrawal', result.safeWithdrawal);
    this.setResult('yearsToRetirement', result.yearsToRetirement, 'number');

    // Update status
    const statusElement = document.getElementById('onTrackStatus');
    if (statusElement) {
      statusElement.textContent = result.onTrack ? 'On Track!' : 'Adjust Needed';
      statusElement.className = result.onTrack ? 'status-success' : 'status-warning';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('retirementSavingsCalculator')) {
    const calculator = new RetirementSavingsCalculator();
    calculator.init();
  }
});
