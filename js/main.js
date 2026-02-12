/**
 * Financial Calculators - Main JavaScript
 * Shared functionality and layout management
 */

// ============================================
// LAYOUT INJECTION
// ============================================

const LayoutManager = {
  headerHTML: `
    <header class="header">
      <div class="header-container">
        <a href="/index.html" class="logo">
          <div class="logo-icon">💰</div>
          <span>Financial Calculators</span>
        </a>
        <nav class="nav">
          <ul class="nav-menu" id="navMenu">
            <li><a href="/index.html" class="nav-link">Home</a></li>
            <li><a href="/us/loan-calculators/mortgage-calculator.html" class="nav-link">Loans</a></li>
            <li><a href="/us/tax-calculators/tax-refund-calculator.html" class="nav-link">Taxes</a></li>
            <li><a href="/us/investment-calculators/compound-interest-calculator.html" class="nav-link">Invest</a></li>
            <li><a href="/us/retirement-calculators/retirement-savings-calculator.html" class="nav-link">Retire</a></li>
            <li><a href="/us/personal-finance/budget-calculator.html" class="nav-link">Finance</a></li>
          </ul>
          <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">☰</button>
        </nav>
      </div>
    </header>
  `,

  footerHTML: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Loan Calculators</h4>
            <ul>
              <li><a href="/us/loan-calculators/mortgage-calculator.html">Mortgage Calculator</a></li>
              <li><a href="/us/loan-calculators/auto-loan-calculator.html">Auto Loan Calculator</a></li>
              <li><a href="/us/loan-calculators/loan-payoff-calculator.html">Loan Payoff Calculator</a></li>
              <li><a href="/us/loan-calculators/refinance-calculator.html">Refinance Calculator</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Tax Calculators</h4>
            <ul>
              <li><a href="/us/tax-calculators/tax-refund-calculator.html">Tax Refund Calculator</a></li>
              <li><a href="/us/tax-calculators/income-tax-calculator.html">Income Tax Calculator</a></li>
              <li><a href="/us/tax-calculators/self-employment-tax-calculator.html">Self-Employment Tax</a></li>
              <li><a href="/us/tax-calculators/capital-gains-tax-calculator.html">Capital Gains Tax</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Investment Calculators</h4>
            <ul>
              <li><a href="/us/investment-calculators/compound-interest-calculator.html">Compound Interest</a></li>
              <li><a href="/us/investment-calculators/investment-return-calculator.html">Investment Return</a></li>
              <li><a href="/us/investment-calculators/dividend-calculator.html">Dividend Calculator</a></li>
              <li><a href="/us/investment-calculators/dollar-cost-averaging-calculator.html">Dollar Cost Averaging</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Retirement Calculators</h4>
            <ul>
              <li><a href="/us/retirement-calculators/retirement-savings-calculator.html">Retirement Savings</a></li>
              <li><a href="/us/retirement-calculators/401k-calculator.html">401k Calculator</a></li>
              <li><a href="/us/retirement-calculators/ira-calculator.html">IRA Calculator</a></li>
              <li><a href="/us/retirement-calculators/social-security-calculator.html">Social Security</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Financial Calculators. All rights reserved. | 
          <a href="/privacy.html">Privacy Policy</a> | 
          <a href="/terms.html">Terms of Use</a></p>
        </div>
      </div>
    </footer>
  `,

  inject() {
    // Inject header before main content
    const main = document.querySelector('main');
    if (main && !document.querySelector('.header')) {
      main.insertAdjacentHTML('beforebegin', this.headerHTML);
    }

    // Inject footer after main content
    if (main && !document.querySelector('.footer')) {
      main.insertAdjacentHTML('afterend', this.footerHTML);
    }

    // Initialize mobile menu
    this.initMobileMenu();
  },

  initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navMenu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
      });
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const Utils = {
  /**
   * Format number as currency
   */
  formatCurrency(value) {
    if (isNaN(value) || value === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  },

  /**
   * Format number as percentage
   */
  formatPercent(value, decimals = 2) {
    if (isNaN(value) || value === null) return '0%';
    return `${(value * 100).toFixed(decimals)}%`;
  },

  /**
   * Format number with commas
   */
  formatNumber(value, decimals = 0) {
    if (isNaN(value) || value === null) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },

  /**
   * Parse currency input
   */
  parseCurrency(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
  },

  /**
   * Parse percentage input
   */
  parsePercent(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const parsed = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    return parsed > 1 ? parsed / 100 : parsed || 0;
  },

  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Add input formatting listeners
   */
  initCurrencyInputs() {
    document.querySelectorAll('input[data-currency]').forEach(input => {
      input.addEventListener('blur', (e) => {
        const value = this.parseCurrency(e.target.value);
        e.target.value = this.formatCurrency(value);
      });
      
      input.addEventListener('focus', (e) => {
        const value = this.parseCurrency(e.target.value);
        e.target.value = value;
        e.target.select();
      });
    });
  },

  /**
   * Add percentage input formatting
   */
  initPercentInputs() {
    document.querySelectorAll('input[data-percent]').forEach(input => {
      input.addEventListener('blur', (e) => {
        const value = this.parsePercent(e.target.value);
        e.target.value = `${(value * 100).toFixed(2)}%`;
      });
      
      input.addEventListener('focus', (e) => {
        const value = this.parsePercent(e.target.value);
        e.target.value = (value * 100).toFixed(2);
        e.target.select();
      });
    });
  }
};

// ============================================
// CALCULATOR BASE CLASS
// ============================================

class CalculatorBase {
  constructor(formulaModule) {
    this.formula = formulaModule;
    this.inputs = {};
    this.results = {};
  }

  /**
   * Get input value by ID
   */
  getInput(id, type = 'number') {
    const element = document.getElementById(id);
    if (!element) return type === 'number' ? 0 : '';
    
    const value = element.value;
    
    switch (type) {
      case 'currency':
        return Utils.parseCurrency(value);
      case 'percent':
        return Utils.parsePercent(value);
      case 'integer':
        return parseInt(value) || 0;
      case 'boolean':
        return element.checked;
      default:
        return parseFloat(value) || 0;
    }
  }

  /**
   * Set result value
   */
  setResult(id, value, format = 'currency') {
    const element = document.getElementById(id);
    if (!element) return;
    
    let formattedValue;
    switch (format) {
      case 'currency':
        formattedValue = Utils.formatCurrency(value);
        break;
      case 'percent':
        formattedValue = Utils.formatPercent(value);
        break;
      case 'number':
        formattedValue = Utils.formatNumber(value);
        break;
      case 'months':
        const years = Math.floor(value / 12);
        const months = value % 12;
        formattedValue = years > 0 ? `${years} yr ${months} mo` : `${months} mo`;
        break;
      default:
        formattedValue = value;
    }
    
    element.textContent = formattedValue;
  }

  /**
   * Show/hide element
   */
  toggleVisibility(id, show) {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle('hidden', !show);
    }
  }

  /**
   * Bind input events for auto-calculation
   */
  bindInputs(inputIds, callback, debounceMs = 100) {
    const debouncedCallback = Utils.debounce(callback, debounceMs);
    
    inputIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('input', debouncedCallback);
        element.addEventListener('change', callback);
      }
    });
  }

  /**
   * Initialize the calculator
   */
  init() {
    // Override in subclass
  }

  /**
   * Calculate and display results
   */
  calculate() {
    // Override in subclass
  }
}

// ============================================
// INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  LayoutManager.inject();
  Utils.initCurrencyInputs();
  Utils.initPercentInputs();
});

// Export for use in calculator modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LayoutManager, Utils, CalculatorBase };
}
