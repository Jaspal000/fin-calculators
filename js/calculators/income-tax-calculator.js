/**
 * Income Tax Calculator UI Logic
 */

class IncomeTaxCalculator extends CalculatorBase {
  constructor() {
    super(IncomeTaxFormula);
  }

  init() {
    this.bindInputs([
      'income',
      'filingStatus',
      'deductions'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const income = this.getInput('income');
    const filingStatus = document.getElementById('filingStatus').value;
    const deductions = this.getInput('deductions');

    const result = this.formula.calculateIncomeTax(income, filingStatus, deductions);

    this.setResult('taxableIncome', result.taxableIncome);
    this.setResult('totalTax', result.totalTax);
    this.setResult('effectiveTaxRate', result.effectiveTaxRate / 100, 'percent');
    this.setResult('marginalTaxRate', result.marginalTaxRate / 100, 'percent');
    this.setResult('takeHomePay', result.takeHomePay);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('incometaxcalculator')) {
    const calculator = new IncomeTaxCalculator();
    calculator.init();
  }
});
