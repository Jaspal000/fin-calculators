/**
 * Stock Return Calculator UI Logic
 */

class StockReturnCalculator extends CalculatorBase {
  constructor() {
    super(StockReturnFormula);
  }

  init() {
    this.bindInputs([
      'purchasePrice',
      'shares',
      'currentPrice',
      'totalDividends',
      'dividendReinvested'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const purchasePrice = this.getInput('purchasePrice');
    const shares = this.getInput('shares');
    const currentPrice = this.getInput('currentPrice');
    const totalDividends = this.getInput('totalDividends');
    const dividendReinvested = document.getElementById('dividendReinvested')?.checked || false;

    const result = this.formula.calculateStockReturn(
      purchasePrice, shares, currentPrice, totalDividends, dividendReinvested
    );

    this.setResult('initialInvestment', result.initialInvestment);
    this.setResult('currentValue', result.currentValue);
    this.setResult('capitalGain', result.capitalGain);
    this.setResult('totalReturn', result.totalReturn);
    this.setResult('totalReturnPercent', result.totalReturnPercent / 100, 'percent');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('stockreturncalculator')) {
    const calculator = new StockReturnCalculator();
    calculator.init();
  }
});
