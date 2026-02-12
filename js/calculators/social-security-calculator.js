/**
 * Social Security Calculator UI Logic
 */

class SocialSecurityCalculator extends CalculatorBase {
  constructor() {
    super(SocialSecurityFormula);
  }

  init() {
    this.bindInputs([
      'aime',
      'claimingAge',
      'fra'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const aime = this.getInput('aime');
    const claimingAge = parseInt(document.getElementById('claimingAge').value);
    const fra = parseInt(document.getElementById('fra').value);

    const result = this.formula.calculateBenefit(aime, claimingAge, fra);

    this.setResult('monthlyBenefit', result.monthlyBenefit);
    this.setResult('annualBenefit', result.annualBenefit);
    this.setResult('age62Benefit', result.comparison.age62);
    this.setResult('fraBenefit', result.comparison.fra);
    this.setResult('age70Benefit', result.comparison.age70);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('socialsecuritycalculator')) {
    const calculator = new SocialSecurityCalculator();
    calculator.init();
  }
});
