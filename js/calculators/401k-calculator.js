/**
 * 401k Calculator UI Logic
 */

class Calculator401k extends CalculatorBase {
  constructor() {
    super(Formula401k);
  }

  init() {
    this.bindInputs([
      'currentBalance',
      'annualSalary',
      'contributionPercent',
      'employerMatchPercent',
      'employerMatchLimit',
      'annualReturn',
      'years'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const currentBalance = this.getInput('currentBalance');
    const annualSalary = this.getInput('annualSalary');
    const contributionPercent = this.getInput('contributionPercent');
    const employerMatchPercent = this.getInput('employerMatchPercent');
    const employerMatchLimit = this.getInput('employerMatchLimit');
    const annualReturn = this.getInput('annualReturn') / 100;
    const years = this.getInput('years');

    const result = this.formula.calculate401k(
      currentBalance, annualSalary, contributionPercent,
      employerMatchPercent, employerMatchLimit, annualReturn, years
    );

    this.setResult('finalBalance', result.finalBalance);
    this.setResult('totalEmployeeContributions', result.totalEmployeeContributions);
    this.setResult('totalEmployerContributions', result.totalEmployerContributions);
    this.setResult('investmentGrowth', result.investmentGrowth);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('401kcalculator')) {
    const calculator = new Calculator401k();
    calculator.init();
  }
});
