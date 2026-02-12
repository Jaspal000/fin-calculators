/**
 * Mortgage Calculator UI Logic
 */

class MortgageCalculator extends CalculatorBase {
  constructor() {
    super(MortgageFormula);
  }

  init() {
    this.bindInputs([
      'homePrice',
      'downPayment',
      'downPaymentPercent',
      'interestRate',
      'loanTerm',
      'propertyTax',
      'homeInsurance',
      'pmi'
    ], () => this.calculate());

    // Sync down payment amount and percentage
    const downPaymentInput = document.getElementById('downPayment');
    const downPaymentPercentInput = document.getElementById('downPaymentPercent');
    const homePriceInput = document.getElementById('homePrice');

    if (downPaymentInput && downPaymentPercentInput && homePriceInput) {
      downPaymentInput.addEventListener('input', () => {
        const homePrice = parseFloat(homePriceInput.value) || 0;
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        if (homePrice > 0) {
          downPaymentPercentInput.value = ((downPayment / homePrice) * 100).toFixed(2);
        }
      });

      downPaymentPercentInput.addEventListener('input', () => {
        const homePrice = parseFloat(homePriceInput.value) || 0;
        const percent = parseFloat(downPaymentPercentInput.value) || 0;
        downPaymentInput.value = (homePrice * (percent / 100)).toFixed(2);
      });
    }

    // Initial calculation
    this.calculate();
  }

  calculate() {
    const homePrice = this.getInput('homePrice');
    const downPayment = this.getInput('downPayment');
    const interestRate = this.getInput('interestRate') / 100;
    const loanTerm = this.getInput('loanTerm');
    const propertyTax = this.getInput('propertyTax');
    const homeInsurance = this.getInput('homeInsurance');
    const pmi = this.getInput('pmi');

    const loanAmount = homePrice - downPayment;

    if (loanAmount <= 0 || interestRate < 0) {
      return;
    }

    // Calculate monthly payment
    const payment = this.formula.calculateMonthlyPayment(
      loanAmount,
      interestRate,
      loanTerm,
      propertyTax,
      homeInsurance,
      pmi
    );

    // Calculate total interest
    const totalInterest = this.formula.calculateTotalInterest(
      loanAmount,
      payment.principalInterest,
      loanTerm
    );

    // Update results
    this.setResult('monthlyPI', payment.principalInterest);
    this.setResult('monthlyTax', payment.tax);
    this.setResult('monthlyInsurance', payment.insurance);
    this.setResult('monthlyPMI', payment.pmi);
    this.setResult('totalMonthlyPayment', payment.total);
    this.setResult('loanAmount', loanAmount);
    this.setResult('totalInterest', totalInterest);
    this.setResult('totalCost', loanAmount + totalInterest + (propertyTax * loanTerm) + (homeInsurance * loanTerm));

    // Update down payment percentage display
    const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    this.setResult('downPaymentPercentDisplay', downPaymentPercent / 100, 'percent');

    // Show/hide PMI based on down payment
    const pmiSection = document.getElementById('pmiSection');
    if (pmiSection) {
      pmiSection.style.display = downPaymentPercent < 20 ? 'flex' : 'none';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('mortgageCalculator')) {
    const calculator = new MortgageCalculator();
    calculator.init();
  }
});
