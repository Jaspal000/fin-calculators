/**
 * Self-Employment Tax Calculator UI Logic
 */

class SelfEmploymentTaxCalculator extends CalculatorBase {
  constructor() {
    super(SelfEmploymentTaxFormula);
  }

  init() {
    this.bindInputs([
      'netEarnings',
      'otherWages'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const netEarnings = this.getInput('netEarnings');
    const otherWages = this.getInput('otherWages');

    const result = this.formula.calculateSETax(netEarnings, otherWages);

    this.setResult('taxableEarnings', result.taxableEarnings);
    this.setResult('socialSecurityTax', result.socialSecurityTax);
    this.setResult('medicareTax', result.medicareTax);
    this.setResult('totalSETax', result.totalSETax);
    this.setResult('quarterlyPayment', result.quarterlyPayment);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('selfemploymenttaxcalculator')) {
    const calculator = new SelfEmploymentTaxCalculator();
    calculator.init();
  }
});
