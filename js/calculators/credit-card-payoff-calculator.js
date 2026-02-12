/**
 * Credit Card Payoff Calculator UI Logic
 */

class CreditCardPayoffCalculator extends CalculatorBase {
  constructor() {
    super(CreditCardPayoffFormula);
  }

  init() {
    this.bindInputs([
      'balance',
      'apr',
      'monthlyPayment'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const balance = this.getInput('balance');
    const apr = this.getInput('apr') / 100;
    const monthlyPayment = this.getInput('monthlyPayment');

    if (balance <= 0 || monthlyPayment <= 0) {
      return;
    }

    const result = this.formula.calculatePayoff(balance, apr, monthlyPayment);

    this.setResult('payoffTime', result.months, 'months');
    this.setResult('totalInterest', result.totalInterest);
    this.setResult('totalPaid', result.totalPaid);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('creditcardpayoffcalculator')) {
    const calculator = new CreditCardPayoffCalculator();
    calculator.init();
  }
});
