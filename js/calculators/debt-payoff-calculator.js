/**
 * Debt Payoff Calculator UI Logic
 */

class DebtPayoffCalculator extends CalculatorBase {
  constructor() {
    super(DebtPayoffFormula);
  }

  init() {
    this.bindInputs([
      'debt1Balance',
      'debt1Rate',
      'debt1Payment',
      'debt2Balance',
      'debt2Rate',
      'debt2Payment',
      'extraPayment'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const debts = [
      {
        name: 'Debt 1',
        balance: this.getInput('debt1Balance'),
        rate: this.getInput('debt1Rate') / 100,
        minimumPayment: this.getInput('debt1Payment')
      },
      {
        name: 'Debt 2',
        balance: this.getInput('debt2Balance'),
        rate: this.getInput('debt2Rate') / 100,
        minimumPayment: this.getInput('debt2Payment')
      }
    ].filter(d => d.balance > 0);

    const extraPayment = this.getInput('extraPayment');

    if (debts.length === 0) {
      return;
    }

    const comparison = this.formula.compareMethods(debts, extraPayment);

    this.setResult('avalancheMonths', comparison.avalanche.months, 'months');
    this.setResult('snowballMonths', comparison.snowball.months, 'months');
    this.setResult('interestSaved', comparison.interestSaved);
    
    const recommendationEl = document.getElementById('recommendedMethod');
    if (recommendationEl) {
      recommendationEl.textContent = comparison.recommendation === 'avalanche' ? 'Avalanche (Save More)' : 'Snowball (Quick Wins)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('debtpayoffcalculator')) {
    const calculator = new DebtPayoffCalculator();
    calculator.init();
  }
});
