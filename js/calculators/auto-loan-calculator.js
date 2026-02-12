/**
 * Auto Loan Calculator UI Logic
 */

class AutoLoanCalculator extends CalculatorBase {
  constructor() {
    super(AutoLoanFormula);
  }

  init() {
    this.bindInputs([
      'carPrice',
      'downPayment',
      'tradeInValue',
      'salesTaxRate',
      'interestRate',
      'loanTerm',
      'fees'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const carPrice = this.getInput('carPrice');
    const downPayment = this.getInput('downPayment');
    const tradeInValue = this.getInput('tradeInValue');
    const salesTaxRate = this.getInput('salesTaxRate') / 100;
    const interestRate = this.getInput('interestRate') / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const fees = this.getInput('fees');

    const result = this.formula.calculateLoan(
      carPrice, downPayment, tradeInValue, salesTaxRate,
      interestRate, loanTerm, fees
    );

    this.setResult('monthlyPayment', result.monthlyPayment);
    this.setResult('loanAmount', result.loanAmount);
    this.setResult('salesTax', result.salesTax);
    this.setResult('totalInterest', result.totalInterest);
    this.setResult('totalCost', result.totalCost);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('autoloancalculator')) {
    const calculator = new AutoLoanCalculator();
    calculator.init();
  }
});
