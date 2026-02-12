/**
 * Investment Return Calculator UI Logic
 */

class InvestmentReturnCalculator extends CalculatorBase {
  constructor() {
    super(InvestmentReturnFormula);
  }

  init() {
    this.bindInputs([
      'initialInvestment',
      'finalValue',
      'dividends',
      'years'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const initialInvestment = this.getInput('initialInvestment');
    const finalValue = this.getInput('finalValue');
    const dividends = this.getInput('dividends');
    const years = this.getInput('years');

    const totalReturn = this.formula.calculateTotalReturn(initialInvestment, finalValue, dividends);
    const cagr = this.formula.calculateCAGR(initialInvestment, finalValue + dividends, years);

    this.setResult('totalReturn', totalReturn.totalReturn);
    this.setResult('totalReturnPercent', totalReturn.totalReturnPercent / 100, 'percent');
    this.setResult('cagr', cagr.cagr / 100, 'percent');
    this.setResult('annualizedReturn', cagr.cagr / 100, 'percent');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('investmentreturncalculator')) {
    const calculator = new InvestmentReturnCalculator();
    calculator.init();
  }
});
