/**
 * Tax Refund Calculator UI Logic
 */

class TaxRefundCalculator extends CalculatorBase {
  constructor() {
    super(TaxRefundFormula);
  }

  init() {
    this.bindInputs([
      'income',
      'withholding',
      'deductions',
      'credits',
      'filingStatus'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const income = this.getInput('income');
    const withholding = this.getInput('withholding');
    const deductions = this.getInput('deductions');
    const credits = this.getInput('credits');
    const filingStatus = document.getElementById('filingStatus').value;

    const result = this.formula.calculateTaxRefund(
      income, filingStatus, withholding, deductions, credits
    );

    this.setResult('taxableIncome', result.taxableIncome);
    this.setResult('taxBeforeCredits', result.taxBeforeCredits);
    this.setResult('taxAfterCredits', result.taxAfterCredits);
    this.setResult('refund', Math.abs(result.refund));
    this.setResult('effectiveRate', result.effectiveRate / 100, 'percent');

    // Update refund label
    const refundLabel = document.querySelector('#refund').closest('.breakdown-item').querySelector('.breakdown-label');
    if (refundLabel) {
      refundLabel.textContent = result.isRefund ? 'Refund' : 'Amount Owed';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('taxrefundcalculator')) {
    const calculator = new TaxRefundCalculator();
    calculator.init();
  }
});
