/**
 * Dollar Cost Averaging Calculator UI Logic
 */

class DollarCostAveragingCalculator extends CalculatorBase {
  constructor() {
    super(DollarCostAveragingFormula);
  }

  init() {
    this.bindInputs([
      'totalAmount',
      'monthlyInvestment',
      'months',
      'expectedReturn'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const totalAmount = this.getInput('totalAmount');
    const monthlyInvestment = this.getInput('monthlyInvestment');
    const months = this.getInput('months');
    const expectedReturn = this.getInput('expectedReturn') / 100;

    const result = this.formula.simulateDCA(
      totalAmount, monthlyInvestment, months, expectedReturn
    );

    this.setResult('dcaFinalBalance', result.dca.finalBalance);
    this.setResult('lumpSumFinalBalance', result.lumpSum.finalBalance);
    this.setResult('comparison', result.comparison.difference);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dollarcostaveragingcalculator')) {
    const calculator = new DollarCostAveragingCalculator();
    calculator.init();
  }
});
