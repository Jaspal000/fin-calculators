/**
 * Tax-Deferred Calculator UI Logic
 */

class TaxDeferredCalculator extends CalculatorBase {
  constructor() {
    super(TaxDeferredFormula);
  }

  init() {
    this.bindInputs([
      'initialInvestment',
      'monthlyContribution',
      'annualReturn',
      'years',
      'taxRate'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const initialInvestment = this.getInput('initialInvestment');
    const monthlyContribution = this.getInput('monthlyContribution');
    const annualReturn = this.getInput('annualReturn') / 100;
    const years = this.getInput('years');
    const taxRate = this.getInput('taxRate') / 100;

    const result = this.formula.calculateGrowth(
      initialInvestment, monthlyContribution, annualReturn, years, taxRate
    );

    this.setResult('taxableBalance', result.taxable.balance);
    this.setResult('traditionalBalance', result.traditional.afterTaxValue);
    this.setResult('rothBalance', result.roth.balance);
    this.setResult('advantage', result.advantage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('taxdeferredcalculator')) {
    const calculator = new TaxDeferredCalculator();
    calculator.init();
  }
});
