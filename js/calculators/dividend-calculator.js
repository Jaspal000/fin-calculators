/**
 * Dividend Calculator UI Logic
 */

class DividendCalculator extends CalculatorBase {
  constructor() {
    super(DividendFormula);
  }

  init() {
    this.bindInputs([
      'sharePrice',
      'sharesOwned',
      'annualDividend',
      'dividendGrowth',
      'years'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const sharePrice = this.getInput('sharePrice');
    const sharesOwned = this.getInput('sharesOwned');
    const annualDividend = this.getInput('annualDividend');
    const dividendGrowth = this.getInput('dividendGrowth') / 100;
    const years = this.getInput('years');

    const result = this.formula.calculateDividends(
      sharePrice, sharesOwned, annualDividend, dividendGrowth, years
    );

    this.setResult('portfolioValue', result.portfolioValue);
    this.setResult('currentYield', result.currentYield / 100, 'percent');
    this.setResult('annualIncome', result.annualIncome);
    this.setResult('monthlyIncome', result.monthlyIncome);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dividendcalculator')) {
    const calculator = new DividendCalculator();
    calculator.init();
  }
});
