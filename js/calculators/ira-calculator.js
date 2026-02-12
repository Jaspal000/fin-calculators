/**
 * IRA Calculator UI Logic
 */

class IRACalculator extends CalculatorBase {
  constructor() {
    super(IRAFormula);
  }

  init() {
    this.bindInputs([
      'currentTaxRate',
      'retirementTaxRate',
      'annualContribution',
      'years',
      'annualReturn',
      'currentAge'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const currentTaxRate = this.getInput('currentTaxRate') / 100;
    const retirementTaxRate = this.getInput('retirementTaxRate') / 100;
    const annualContribution = this.getInput('annualContribution');
    const years = this.getInput('years');
    const annualReturn = this.getInput('annualReturn') / 100;
    const currentAge = this.getInput('currentAge');

    const result = this.formula.compareIRA(
      currentTaxRate, retirementTaxRate, annualContribution,
      years, annualReturn, currentAge
    );

    this.setResult('traditionalAfterTax', result.traditional.afterTaxValue);
    this.setResult('rothAfterTax', result.roth.afterTaxValue);
    
    const recommendationEl = document.getElementById('recommendation');
    if (recommendationEl) {
      recommendationEl.textContent = result.recommendation === 'roth' ? 'Roth IRA Recommended' : 'Traditional IRA Recommended';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('iracalculator')) {
    const calculator = new IRACalculator();
    calculator.init();
  }
});
