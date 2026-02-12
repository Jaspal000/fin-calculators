/**
 * Compound Interest Calculator UI Logic
 */

class CompoundInterestCalculator extends CalculatorBase {
  constructor() {
    super(CompoundInterestFormula);
  }

  init() {
    this.bindInputs([
      'initialInvestment',
      'monthlyContribution',
      'annualReturn',
      'years'
    ], () => this.calculate());

    this.calculate();
  }

  calculate() {
    const principal = this.getInput('initialInvestment');
    const monthlyContribution = this.getInput('monthlyContribution');
    const annualReturn = this.getInput('annualReturn') / 100;
    const years = this.getInput('years');

    const result = this.formula.calculateCompoundInterest(
      principal,
      monthlyContribution,
      annualReturn,
      years
    );

    // Update results
    this.setResult('finalBalance', result.finalBalance);
    this.setResult('totalContributions', result.totalContributions);
    this.setResult('totalInterest', result.totalInterest);
    
    // Rule of 72
    const doublingTime = this.formula.ruleOf72(annualReturn);
    this.setResult('doublingTime', doublingTime, 'number');

    // Update chart if exists
    this.updateChart(result.yearlyData);
  }

  updateChart(yearlyData) {
    const chartContainer = document.getElementById('growthChart');
    if (!chartContainer) return;

    // Simple bar chart using CSS
    const maxValue = Math.max(...yearlyData.map(d => d.balance));
    let chartHTML = '<div class="chart-bars">';
    
    const step = Math.ceil(yearlyData.length / 10);
    for (let i = 0; i < yearlyData.length; i += step) {
      const data = yearlyData[i];
      const height = (data.balance / maxValue) * 100;
      chartHTML += `
        <div class="chart-bar" style="height: ${height}%" title="Year ${data.year}: ${Utils.formatCurrency(data.balance)}">
          <span class="chart-label">${data.year}</span>
        </div>
      `;
    }
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('compoundInterestCalculator')) {
    const calculator = new CompoundInterestCalculator();
    calculator.init();
  }
});
