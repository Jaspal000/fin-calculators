/**
 * Home Equity Calculator UI Logic
 */

class HomeEquityCalculator extends CalculatorBase {
  constructor() {
    super(HomeEquityFormula);
  }

  init() {
    this.bindInputs([
      'homeValue',
      'mortgageBalance',
      'maxLTV'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const homeValue = this.getInput('homeValue');
    const mortgageBalance = this.getInput('mortgageBalance');
    const maxLTV = this.getInput('maxLTV') / 100;

    const result = this.formula.calculateEquity(homeValue, mortgageBalance, maxLTV);

    this.setResult('totalEquity', result.totalEquity);
    this.setResult('equityPercentage', result.equityPercentage / 100, 'percent');
    this.setResult('availableEquity', result.availableEquity);
    this.setResult('currentLTV', result.currentLTV / 100, 'percent');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('homeequitycalculator')) {
    const calculator = new HomeEquityCalculator();
    calculator.init();
  }
});
