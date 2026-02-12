/**
 * Refinance Calculator UI Logic
 */

class RefinanceCalculator extends CalculatorBase {
  constructor() {
    super(RefinanceFormula);
  }

  init() {
    this.bindInputs([
      'currentBalance',
      'currentRate',
      'currentPayment',
      'newRate',
      'newTerm',
      'closingCosts'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const currentBalance = this.getInput('currentBalance');
    const currentRate = this.getInput('currentRate') / 100;
    const currentPayment = this.getInput('currentPayment');
    const newRate = this.getInput('newRate') / 100;
    const newTerm = parseInt(document.getElementById('newTerm').value);
    const closingCosts = this.getInput('closingCosts');

    const result = this.formula.calculateRefinance(
      currentBalance, currentRate, currentPayment,
      newRate, newTerm, closingCosts
    );

    this.setResult('newMonthlyPayment', result.newMonthlyPayment);
    this.setResult('monthlySavings', result.monthlySavings);
    this.setResult('breakEvenMonths', result.breakEvenMonths, 'number');
    this.setResult('totalInterestSavings', result.totalInterestSavings);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('refinancecalculator')) {
    const calculator = new RefinanceCalculator();
    calculator.init();
  }
});
