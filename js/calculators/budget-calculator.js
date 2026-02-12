/**
 * Budget Calculator UI Logic
 */

class BudgetCalculator extends CalculatorBase {
  constructor() {
    super(BudgetFormula);
  }

  init() {
    this.bindInputs([
      'monthlyIncome',
      'housing',
      'utilities',
      'groceries',
      'transportation',
      'insurance',
      'debtPayments',
      'entertainment',
      'savings'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const monthlyIncome = this.getInput('monthlyIncome');
    const housing = this.getInput('housing');
    const utilities = this.getInput('utilities');
    const groceries = this.getInput('groceries');
    const transportation = this.getInput('transportation');
    const insurance = this.getInput('insurance');
    const debtPayments = this.getInput('debtPayments');
    const entertainment = this.getInput('entertainment');
    const savings = this.getInput('savings');

    const needs = housing + utilities + groceries + transportation + insurance + debtPayments;
    const wants = entertainment;
    const totalExpenses = needs + wants + savings;
    const remaining = monthlyIncome - totalExpenses;

    this.setResult('needsAmount', needs);
    this.setResult('wantsAmount', wants);
    this.setResult('savingsAmount', savings);
    this.setResult('totalExpenses', totalExpenses);
    this.setResult('remaining', remaining);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('budgetcalculator')) {
    const calculator = new BudgetCalculator();
    calculator.init();
  }
});
