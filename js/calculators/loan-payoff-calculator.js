/**
 * Loan Payoff Calculator UI Logic
 */

class LoanPayoffCalculator extends CalculatorBase {
  constructor() {
    super(LoanPayoffFormula);
  }

  init() {
    this.bindInputs([
      'loanBalance',
      'interestRate',
      'monthlyPayment',
      'extraPayment'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const balance = this.getInput('loanBalance');
    const rate = this.getInput('interestRate') / 100;
    const monthlyPayment = this.getInput('monthlyPayment');
    const extraPayment = this.getInput('extraPayment');

    if (balance <= 0 || monthlyPayment <= 0) {
      return;
    }

    const comparison = this.formula.compareScenarios(balance, rate, monthlyPayment, extraPayment);

    // Update results
    this.setResult('payoffDate', `${comparison.withExtra.years} years ${comparison.withExtra.remainingMonths} months`, 'text');
    this.setResult('monthsSaved', comparison.monthsSaved, 'number');
    this.setResult('interestSaved', comparison.interestSaved);
    this.setResult('totalInterest', comparison.withExtra.totalInterest);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loanpayoffcalculator')) {
    const calculator = new LoanPayoffCalculator();
    calculator.init();
  }
});
