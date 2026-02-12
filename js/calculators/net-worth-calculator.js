/**
 * Net Worth Calculator UI Logic
 */

class NetWorthCalculator extends CalculatorBase {
  constructor() {
    super(NetWorthFormula);
  }

  init() {
    this.bindInputs([
      'cash',
      'investments',
      'retirement',
      'realEstate',
      'vehicles',
      'mortgage',
      'carLoans',
      'studentLoans',
      'creditCards'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const assets = {
      cash: this.getInput('cash'),
      investments: this.getInput('investments'),
      retirement: this.getInput('retirement'),
      realEstate: this.getInput('realEstate'),
      vehicles: this.getInput('vehicles'),
      personalProperty: 0,
      otherAssets: 0
    };

    const liabilities = {
      mortgage: this.getInput('mortgage'),
      carLoans: this.getInput('carLoans'),
      studentLoans: this.getInput('studentLoans'),
      creditCards: this.getInput('creditCards'),
      personalLoans: 0,
      otherDebts: 0
    };

    const result = this.formula.calculateNetWorth(assets, liabilities);

    this.setResult('totalAssets', result.assets.total);
    this.setResult('totalLiabilities', result.liabilities.total);
    this.setResult('netWorth', result.netWorth);
    this.setResult('debtToAsset', result.ratios.debtToAsset / 100, 'percent');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('networthcalculator')) {
    const calculator = new NetWorthCalculator();
    calculator.init();
  }
});
