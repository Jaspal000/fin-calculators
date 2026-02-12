/**
 * Capital Gains Tax Calculator UI Logic
 */

class CapitalGainsTaxCalculator extends CalculatorBase {
  constructor() {
    super(CapitalGainsTaxFormula);
  }

  init() {
    this.bindInputs([
      'purchasePrice',
      'salePrice',
      'holdingPeriod',
      'filingStatus',
      'ordinaryIncome'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const purchasePrice = this.getInput('purchasePrice');
    const salePrice = this.getInput('salePrice');
    const holdingPeriod = this.getInput('holdingPeriod');
    const filingStatus = document.getElementById('filingStatus').value;
    const ordinaryIncome = this.getInput('ordinaryIncome');

    const result = this.formula.calculateCapitalGains(
      purchasePrice, salePrice, holdingPeriod, filingStatus, ordinaryIncome
    );

    this.setResult('gain', result.gain);
    this.setResult('tax', result.tax);
    this.setResult('taxRate', result.taxRate / 100, 'percent');
    this.setResult('netProceeds', result.netProceeds);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('capitalgainstaxcalculator')) {
    const calculator = new CapitalGainsTaxCalculator();
    calculator.init();
  }
});
