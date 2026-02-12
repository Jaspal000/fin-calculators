/**
 * Financial Calculators Registry
 * Central configuration for all calculators
 * Scale to 100+ calculators by adding entries here
 */

const CalculatorRegistry = {
  // ============================================
  // LOAN CALCULATORS (5)
  // ============================================
  'mortgage-calculator': {
    slug: 'mortgage-calculator',
    category: 'loan-calculators',
    title: 'Mortgage Calculator',
    metaDescription: 'Calculate your monthly mortgage payments, total interest, and amortization schedule. Free mortgage calculator with taxes and insurance options.',
    h1: 'Mortgage Calculator - Calculate Your Home Loan Payments',
    introduction: `Our free mortgage calculator helps you estimate your monthly home loan payments with precision. Whether you're a first-time homebuyer or refinancing, this tool calculates principal, interest, taxes, and insurance (PITI) to give you a complete picture of your housing costs. Input your loan amount, interest rate, and term to see your amortization schedule and understand how much house you can afford.`,
    relatedCalculators: ['loan-payoff-calculator', 'refinance-calculator', 'home-equity-calculator', 'debt-to-income-calculator'],
    formulaFile: 'mortgage-formula.js',
    uiFile: 'mortgage-calculator.js',
    faqs: [
      { question: 'How is mortgage interest calculated?', answer: 'Mortgage interest is calculated monthly based on your remaining loan balance. The formula uses your annual interest rate divided by 12, multiplied by the outstanding principal.' },
      { question: 'What is included in PITI?', answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents your total monthly housing payment including property taxes and homeowners insurance.' },
      { question: 'How can I pay off my mortgage faster?', answer: 'You can pay off your mortgage faster by making extra principal payments, switching to biweekly payments, or refinancing to a shorter loan term.' }
    ],
    icon: '🏠',
    path: '/us/loan-calculators/mortgage-calculator.html'
  },
  'loan-payoff-calculator': {
    slug: 'loan-payoff-calculator',
    category: 'loan-calculators',
    title: 'Loan Payoff Calculator',
    metaDescription: 'Discover how extra payments can accelerate your loan payoff. Calculate interest savings and early payoff dates for any loan type.',
    h1: 'Loan Payoff Calculator - Pay Off Debt Faster',
    introduction: `Use our loan payoff calculator to see how making extra payments can save you thousands in interest and help you become debt-free sooner. This powerful tool shows you exactly when you'll pay off your loan and how much interest you'll save by increasing your monthly payment. Perfect for student loans, car loans, and personal loans.`,
    relatedCalculators: ['mortgage-calculator', 'debt-payoff-calculator', 'auto-loan-calculator', 'student-loan-calculator'],
    formulaFile: 'loan-payoff-formula.js',
    uiFile: 'loan-payoff-calculator.js',
    faqs: [
      { question: 'How much will extra payments save me?', answer: 'Even small extra payments can save significant interest over time. Use this calculator to see your specific savings based on your loan terms.' },
      { question: 'Should I pay off my loan early?', answer: 'Consider your interest rate, other debts, and investment opportunities. High-interest loans are usually best to pay off first.' },
      { question: 'Can I make lump sum payments?', answer: 'Most loans allow lump sum payments toward principal. Check with your lender for any prepayment penalties.' }
    ],
    icon: '💰',
    path: '/us/loan-calculators/loan-payoff-calculator.html'
  },
  'auto-loan-calculator': {
    slug: 'auto-loan-calculator',
    category: 'loan-calculators',
    title: 'Auto Loan Calculator',
    metaDescription: 'Calculate your car loan payments, total interest, and affordability. Free auto loan calculator with trade-in and down payment options.',
    h1: 'Auto Loan Calculator - Car Payment Estimator',
    introduction: `Planning to buy a new or used car? Our auto loan calculator helps you determine your monthly car payments and total loan cost. Factor in your down payment, trade-in value, sales tax, and interest rate to get an accurate estimate. This tool helps you negotiate better and ensures you stay within your budget when purchasing your next vehicle.`,
    relatedCalculators: ['mortgage-calculator', 'loan-payoff-calculator', 'debt-to-income-calculator', 'personal-finance-calculator'],
    formulaFile: 'auto-loan-formula.js',
    uiFile: 'auto-loan-calculator.js',
    faqs: [
      { question: 'What is a good interest rate for a car loan?', answer: 'Good auto loan rates typically range from 3% to 6% for new cars and 4% to 8% for used cars, depending on your credit score.' },
      { question: 'How much should I put down on a car?', answer: 'Aim for at least 20% down on a new car or 10% on a used car to avoid being upside down on your loan.' },
      { question: 'What loan term should I choose?', answer: 'Shorter terms (36-48 months) have higher payments but less total interest. Avoid terms longer than 60 months if possible.' }
    ],
    icon: '🚗',
    path: '/us/loan-calculators/auto-loan-calculator.html'
  },
  'refinance-calculator': {
    slug: 'refinance-calculator',
    category: 'loan-calculators',
    title: 'Refinance Calculator',
    metaDescription: 'Determine if refinancing your mortgage or loan makes financial sense. Calculate break-even points and potential savings.',
    h1: 'Refinance Calculator - Should You Refinance?',
    introduction: `Wondering if refinancing is right for you? Our refinance calculator helps you determine your break-even point and potential savings. Compare your current loan terms with new offers to see how much you could save monthly and over the life of the loan. Factor in closing costs to make an informed decision about refinancing your mortgage or other loans.`,
    relatedCalculators: ['mortgage-calculator', 'home-equity-calculator', 'loan-payoff-calculator', 'debt-consolidation-calculator'],
    formulaFile: 'refinance-formula.js',
    uiFile: 'refinance-calculator.js',
    faqs: [
      { question: 'When should I refinance my mortgage?', answer: 'Consider refinancing when rates drop at least 0.5-1% below your current rate, or if you need to access equity or change loan terms.' },
      { question: 'What are typical closing costs?', answer: 'Closing costs typically range from 2% to 6% of the loan amount, including appraisal, title, and lender fees.' },
      { question: 'How long does it take to break even?', answer: 'Break-even periods vary but typically range from 2-5 years. Use this calculator to find your specific break-even point.' }
    ],
    icon: '🔄',
    path: '/us/loan-calculators/refinance-calculator.html'
  },
  'home-equity-calculator': {
    slug: 'home-equity-calculator',
    category: 'loan-calculators',
    title: 'Home Equity Calculator',
    metaDescription: 'Calculate your available home equity and potential HELOC or home equity loan amounts. Free home equity calculator.',
    h1: 'Home Equity Calculator - Access Your Home\'s Value',
    introduction: `Discover how much equity you've built in your home with our home equity calculator. This tool estimates your current home value minus your mortgage balance to show available equity. Learn how much you could borrow through a HELOC or home equity loan for renovations, debt consolidation, or other major expenses.`,
    relatedCalculators: ['mortgage-calculator', 'refinance-calculator', 'debt-consolidation-calculator', 'personal-finance-calculator'],
    formulaFile: 'home-equity-formula.js',
    uiFile: 'home-equity-calculator.js',
    faqs: [
      { question: 'How is home equity calculated?', answer: 'Home equity is your home\'s current market value minus your outstanding mortgage balance and any other liens.' },
      { question: 'How much equity can I borrow?', answer: 'Most lenders allow you to borrow up to 80-85% of your home\'s value minus your mortgage balance.' },
      { question: 'What can I use home equity for?', answer: 'Common uses include home improvements, debt consolidation, education expenses, and emergency funds.' }
    ],
    icon: '🏡',
    path: '/us/loan-calculators/home-equity-calculator.html'
  },

  // ============================================
  // TAX CALCULATORS (5)
  // ============================================
  'tax-refund-calculator': {
    slug: 'tax-refund-calculator',
    category: 'tax-calculators',
    title: 'Tax Refund Calculator',
    metaDescription: 'Estimate your tax refund or amount owed with our free tax calculator. Includes federal withholding and deductions.',
    h1: 'Tax Refund Calculator - Estimate Your Return',
    introduction: `Get an early estimate of your tax refund or amount owed with our comprehensive tax calculator. Input your income, withholdings, deductions, and credits to see where you stand. This tool helps you plan ahead and adjust your W-4 if needed to avoid surprises when filing your tax return.`,
    relatedCalculators: ['income-tax-calculator', 'self-employment-tax-calculator', 'capital-gains-tax-calculator', 'tax-deferred-calculator'],
    formulaFile: 'tax-refund-formula.js',
    uiFile: 'tax-refund-calculator.js',
    faqs: [
      { question: 'How accurate is this tax estimate?', answer: 'This calculator provides estimates based on current tax brackets. Actual results may vary based on specific deductions and credits.' },
      { question: 'Why is my refund different than expected?', answer: 'Changes in income, deductions, credits, or withholding can all affect your final refund amount.' },
      { question: 'How can I increase my refund?', answer: 'Maximize deductions, claim all eligible credits, and adjust your W-4 to have more tax withheld throughout the year.' }
    ],
    icon: '💵',
    path: '/us/tax-calculators/tax-refund-calculator.html'
  },
  'income-tax-calculator': {
    slug: 'income-tax-calculator',
    category: 'tax-calculators',
    title: 'Income Tax Calculator',
    metaDescription: 'Calculate your federal income tax based on current IRS tax brackets. Free income tax estimator for US taxpayers.',
    h1: 'Income Tax Calculator - Federal Tax Estimator',
    introduction: `Calculate your federal income tax liability using current IRS tax brackets and rates. Our income tax calculator shows you exactly how much tax you owe based on your taxable income and filing status. Understand how progressive taxation works and plan your finances with accurate tax estimates.`,
    relatedCalculators: ['tax-refund-calculator', 'self-employment-tax-calculator', 'capital-gains-tax-calculator', 'tax-deferred-calculator'],
    formulaFile: 'income-tax-formula.js',
    uiFile: 'income-tax-calculator.js',
    faqs: [
      { question: 'What are the current federal tax brackets?', answer: 'Federal tax brackets range from 10% to 37% depending on your income and filing status. This calculator uses the most current rates.' },
      { question: 'How do tax brackets work?', answer: 'The US uses a progressive tax system. Only income within each bracket is taxed at that rate, not your entire income.' },
      { question: 'What is taxable income?', answer: 'Taxable income is your gross income minus deductions, exemptions, and adjustments.' }
    ],
    icon: '📊',
    path: '/us/tax-calculators/income-tax-calculator.html'
  },
  'self-employment-tax-calculator': {
    slug: 'self-employment-tax-calculator',
    category: 'tax-calculators',
    title: 'Self-Employment Tax Calculator',
    metaDescription: 'Calculate self-employment tax for freelancers, contractors, and small business owners. Includes quarterly payment estimates.',
    h1: 'Self-Employment Tax Calculator - 1099 Tax Estimator',
    introduction: `Freelancers, contractors, and small business owners can calculate their self-employment tax with ease. This tool computes both the employer and employee portions of Social Security and Medicare taxes. Get quarterly estimated payment amounts to avoid penalties and plan your tax obligations throughout the year.`,
    relatedCalculators: ['income-tax-calculator', 'tax-refund-calculator', 'tax-deferred-calculator', 'retirement-contribution-calculator'],
    formulaFile: 'self-employment-tax-formula.js',
    uiFile: 'self-employment-tax-calculator.js',
    faqs: [
      { question: 'What is the self-employment tax rate?', answer: 'The self-employment tax rate is 15.3%, consisting of 12.4% for Social Security and 2.9% for Medicare.' },
      { question: 'Do I need to pay quarterly taxes?', answer: 'If you expect to owe $1,000 or more in taxes, you should make quarterly estimated payments to avoid penalties.' },
      { question: 'Can I deduct self-employment tax?', answer: 'You can deduct the employer portion (50%) of self-employment tax when calculating your adjusted gross income.' }
    ],
    icon: '💼',
    path: '/us/tax-calculators/self-employment-tax-calculator.html'
  },
  'capital-gains-tax-calculator': {
    slug: 'capital-gains-tax-calculator',
    category: 'tax-calculators',
    title: 'Capital Gains Tax Calculator',
    metaDescription: 'Calculate capital gains tax on stocks, real estate, and investments. Distinguishes between short-term and long-term gains.',
    h1: 'Capital Gains Tax Calculator - Investment Tax Estimator',
    introduction: `Understand the tax implications of your investments with our capital gains tax calculator. This tool differentiates between short-term and long-term capital gains, applying the appropriate tax rates for each. Whether you're selling stocks, real estate, or other assets, get an accurate estimate of your tax liability.`,
    relatedCalculators: ['income-tax-calculator', 'investment-return-calculator', 'tax-deferred-calculator', 'retirement-contribution-calculator'],
    formulaFile: 'capital-gains-tax-formula.js',
    uiFile: 'capital-gains-tax-calculator.js',
    faqs: [
      { question: 'What is the difference between short and long-term gains?', answer: 'Short-term gains (held under 1 year) are taxed as ordinary income. Long-term gains (held over 1 year) have preferential rates of 0%, 15%, or 20%.' },
      { question: 'How can I minimize capital gains tax?', answer: 'Hold investments over a year, use tax-loss harvesting, contribute to tax-advantaged accounts, and time sales strategically.' },
      { question: 'Do I pay tax on unrealized gains?', answer: 'No, you only pay capital gains tax when you sell an asset and realize the gain.' }
    ],
    icon: '📈',
    path: '/us/tax-calculators/capital-gains-tax-calculator.html'
  },
  'tax-deferred-calculator': {
    slug: 'tax-deferred-calculator',
    category: 'tax-calculators',
    title: 'Tax-Deferred Growth Calculator',
    metaDescription: 'Compare taxable vs tax-deferred investment growth. See how 401k and IRA tax advantages compound over time.',
    h1: 'Tax-Deferred Growth Calculator - 401k & IRA Benefits',
    introduction: `Discover the power of tax-deferred growth with our calculator. Compare how your investments grow in taxable accounts versus tax-deferred accounts like 401(k)s and IRAs. See the dramatic difference that tax advantages can make over decades of compounding growth, helping you make informed retirement planning decisions.`,
    relatedCalculators: ['retirement-savings-calculator', '401k-calculator', 'ira-calculator', 'compound-interest-calculator'],
    formulaFile: 'tax-deferred-formula.js',
    uiFile: 'tax-deferred-calculator.js',
    faqs: [
      { question: 'What does tax-deferred mean?', answer: 'Tax-deferred means you don\'t pay taxes on contributions or growth until withdrawal, typically in retirement.' },
      { question: 'How much can tax deferral save me?', answer: 'Tax deferral can significantly increase your ending balance due to compounding on the full pre-tax amount.' },
      { question: 'Should I choose Roth or Traditional?', answer: 'Traditional may be better if you expect lower taxes in retirement. Roth may be better if you expect higher taxes.' }
    ],
    icon: '📉',
    path: '/us/tax-calculators/tax-deferred-calculator.html'
  },

  // ============================================
  // INVESTMENT CALCULATORS (5)
  // ============================================
  'compound-interest-calculator': {
    slug: 'compound-interest-calculator',
    category: 'investment-calculators',
    title: 'Compound Interest Calculator',
    metaDescription: 'See how compound interest grows your money over time. Calculate investment growth with regular contributions.',
    h1: 'Compound Interest Calculator - The Power of Compounding',
    introduction: `Experience the magic of compound interest with our powerful calculator. See how your money grows exponentially when you earn interest on your interest. Input your initial investment, monthly contributions, interest rate, and time horizon to visualize the incredible power of compounding over years and decades.`,
    relatedCalculators: ['investment-return-calculator', 'retirement-savings-calculator', 'rule-of-72-calculator', 'tax-deferred-calculator'],
    formulaFile: 'compound-interest-formula.js',
    uiFile: 'compound-interest-calculator.js',
    faqs: [
      { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods.' },
      { question: 'How often should interest compound?', answer: 'More frequent compounding (daily vs annually) yields slightly higher returns. Most investments compound monthly or daily.' },
      { question: 'What is the rule of 72?', answer: 'Divide 72 by your interest rate to estimate how many years it takes to double your money.' }
    ],
    icon: '💹',
    path: '/us/investment-calculators/compound-interest-calculator.html'
  },
  'investment-return-calculator': {
    slug: 'investment-return-calculator',
    category: 'investment-calculators',
    title: 'Investment Return Calculator',
    metaDescription: 'Calculate total return, annualized return, and CAGR for your investments. Compare investment performance easily.',
    h1: 'Investment Return Calculator - Calculate Your ROI',
    introduction: `Measure your investment performance accurately with our comprehensive return calculator. Calculate total returns, annualized returns, and compound annual growth rate (CAGR) for any investment. Compare different investments on an apples-to-apples basis and understand your true rate of return including dividends and capital gains.`,
    relatedCalculators: ['compound-interest-calculator', 'stock-return-calculator', 'dividend-calculator', 'dollar-cost-averaging-calculator'],
    formulaFile: 'investment-return-formula.js',
    uiFile: 'investment-return-calculator.js',
    faqs: [
      { question: 'What is CAGR?', answer: 'Compound Annual Growth Rate (CAGR) measures the mean annual growth rate of an investment over a specified time period.' },
      { question: 'How do I calculate total return?', answer: 'Total return includes capital gains plus dividends, divided by initial investment, expressed as a percentage.' },
      { question: 'What is a good annual return?', answer: 'Historically, the stock market averages 7-10% annually after inflation. Individual results vary based on risk and strategy.' }
    ],
    icon: '📊',
    path: '/us/investment-calculators/investment-return-calculator.html'
  },
  'stock-return-calculator': {
    slug: 'stock-return-calculator',
    category: 'investment-calculators',
    title: 'Stock Return Calculator',
    metaDescription: 'Calculate stock investment returns including dividends. Analyze buy-and-hold performance with dividend reinvestment.',
    h1: 'Stock Return Calculator - Analyze Stock Performance',
    introduction: `Analyze your stock investments with precision using our stock return calculator. Input your purchase price, number of shares, dividends received, and current price to calculate total returns. The tool accounts for dividend reinvestment and helps you evaluate whether to hold, sell, or buy more shares of a particular stock.`,
    relatedCalculators: ['investment-return-calculator', 'dividend-calculator', 'dollar-cost-averaging-calculator', 'capital-gains-tax-calculator'],
    formulaFile: 'stock-return-formula.js',
    uiFile: 'stock-return-calculator.js',
    faqs: [
      { question: 'How are stock returns calculated?', answer: 'Stock returns include price appreciation plus dividends, divided by your initial investment cost.' },
      { question: 'Should I reinvest dividends?', answer: 'Dividend reinvestment typically increases long-term returns through compounding, especially in growing companies.' },
      { question: 'What affects stock prices?', answer: 'Stock prices are affected by company performance, economic conditions, market sentiment, and industry trends.' }
    ],
    icon: '📉',
    path: '/us/investment-calculators/stock-return-calculator.html'
  },
  'dividend-calculator': {
    slug: 'dividend-calculator',
    category: 'investment-calculators',
    title: 'Dividend Calculator',
    metaDescription: 'Calculate dividend income and yield for your portfolio. Project future dividend growth and reinvestment returns.',
    h1: 'Dividend Calculator - Project Your Dividend Income',
    introduction: `Build your passive income stream with our dividend calculator. Calculate current dividend yield, project future income with dividend growth, and see how reinvesting dividends compounds your returns. Perfect for dividend growth investors building a portfolio for retirement income or financial independence.`,
    relatedCalculators: ['stock-return-calculator', 'compound-interest-calculator', 'investment-return-calculator', 'retirement-savings-calculator'],
    formulaFile: 'dividend-formula.js',
    uiFile: 'dividend-calculator.js',
    faqs: [
      { question: 'What is dividend yield?', answer: 'Dividend yield is annual dividends per share divided by stock price, expressed as a percentage.' },
      { question: 'How often are dividends paid?', answer: 'Most US companies pay quarterly dividends, though some pay monthly or annually.' },
      { question: 'What is a good dividend yield?', answer: 'Yields between 2-6% are typical. Extremely high yields may indicate risk or an unsustainable payout.' }
    ],
    icon: '💸',
    path: '/us/investment-calculators/dividend-calculator.html'
  },
  'dollar-cost-averaging-calculator': {
    slug: 'dollar-cost-averaging-calculator',
    category: 'investment-calculators',
    title: 'Dollar Cost Averaging Calculator',
    metaDescription: 'See how dollar cost averaging reduces investment risk. Compare lump sum vs periodic investing strategies.',
    h1: 'Dollar Cost Averaging Calculator - DCA Strategy Tool',
    introduction: `Discover the benefits of dollar cost averaging with our specialized calculator. Compare investing a lump sum versus spreading investments over time. See how DCA reduces the impact of market volatility and potentially lowers your average cost per share, making it an ideal strategy for long-term investors.`,
    relatedCalculators: ['investment-return-calculator', 'compound-interest-calculator', 'stock-return-calculator', 'retirement-savings-calculator'],
    formulaFile: 'dollar-cost-averaging-formula.js',
    uiFile: 'dollar-cost-averaging-calculator.js',
    faqs: [
      { question: 'What is dollar cost averaging?', answer: 'DCA is investing a fixed amount regularly regardless of market conditions, buying more shares when prices are low.' },
      { question: 'Is DCA better than lump sum investing?', answer: 'DCA reduces timing risk but historically lump sum investing performs better about 65% of the time.' },
      { question: 'How often should I invest with DCA?', answer: 'Monthly investing aligns with paychecks and is most common, but any regular interval works.' }
    ],
    icon: '📅',
    path: '/us/investment-calculators/dollar-cost-averaging-calculator.html'
  },

  // ============================================
  // RETIREMENT CALCULATORS (5)
  // ============================================
  'retirement-savings-calculator': {
    slug: 'retirement-savings-calculator',
    category: 'retirement-calculators',
    title: 'Retirement Savings Calculator',
    metaDescription: 'Calculate how much you need to save for retirement. Project your nest egg and determine if you\'re on track.',
    h1: 'Retirement Savings Calculator - Plan Your Future',
    introduction: `Plan for a secure retirement with our comprehensive savings calculator. Determine how much you need to save monthly to reach your retirement goals. Factor in your current savings, expected returns, Social Security, and desired retirement income to see if you're on track or need to adjust your savings strategy.`,
    relatedCalculators: ['401k-calculator', 'ira-calculator', 'retirement-income-calculator', 'compound-interest-calculator'],
    formulaFile: 'retirement-savings-formula.js',
    uiFile: 'retirement-savings-calculator.js',
    faqs: [
      { question: 'How much do I need to retire?', answer: 'Most experts suggest 25x your annual expenses or 80% of pre-retirement income. This calculator helps personalize the number.' },
      { question: 'When should I start saving for retirement?', answer: 'The earlier the better. Starting in your 20s allows compound interest to work dramatically in your favor.' },
      { question: 'What is the 4% rule?', answer: 'The 4% rule suggests you can safely withdraw 4% of your nest egg annually in retirement without running out of money.' }
    ],
    icon: '🏖️',
    path: '/us/retirement-calculators/retirement-savings-calculator.html'
  },
  '401k-calculator': {
    slug: '401k-calculator',
    category: 'retirement-calculators',
    title: '401k Calculator',
    metaDescription: 'Project your 401k balance at retirement. Calculate employer match benefits and contribution impacts.',
    h1: '401k Calculator - Maximize Your Employer Match',
    introduction: `Maximize your 401k savings with our detailed calculator. See how contributions, employer matches, and investment returns grow your retirement nest egg over time. Understand the impact of increasing your contribution percentage and ensure you're capturing your full employer match - it's essentially free money for your retirement.`,
    relatedCalculators: ['retirement-savings-calculator', 'ira-calculator', 'tax-deferred-calculator', 'retirement-income-calculator'],
    formulaFile: '401k-formula.js',
    uiFile: '401k-calculator.js',
    faqs: [
      { question: 'How much should I contribute to my 401k?', answer: 'At minimum, contribute enough to get your full employer match. Ideally, work toward 15% of your income.' },
      { question: 'What is employer matching?', answer: 'Employers may match your contributions up to a percentage of your salary, typically 3-6%.' },
      { question: 'What are 401k contribution limits?', answer: 'For 2024, the employee contribution limit is $23,000, or $30,500 if age 50 or older.' }
    ],
    icon: '💼',
    path: '/us/retirement-calculators/401k-calculator.html'
  },
  'ira-calculator': {
    slug: 'ira-calculator',
    category: 'retirement-calculators',
    title: 'IRA Calculator',
    metaDescription: 'Compare Traditional vs Roth IRA growth and tax benefits. Calculate IRA contributions and retirement projections.',
    h1: 'IRA Calculator - Traditional vs Roth Comparison',
    introduction: `Choose the right IRA for your situation with our comparison calculator. See how Traditional and Roth IRAs differ in tax treatment and ending balances. Input your current tax bracket, expected retirement tax bracket, and contribution amounts to determine which option maximizes your retirement savings.`,
    relatedCalculators: ['retirement-savings-calculator', '401k-calculator', 'tax-deferred-calculator', 'retirement-income-calculator'],
    formulaFile: 'ira-formula.js',
    uiFile: 'ira-calculator.js',
    faqs: [
      { question: 'What is the difference between Traditional and Roth IRA?', answer: 'Traditional offers tax-deductible contributions and taxable withdrawals. Roth uses after-tax money but withdrawals are tax-free.' },
      { question: 'What are IRA contribution limits?', answer: 'For 2024, the limit is $7,000, or $8,000 if age 50 or older, across all IRA accounts.' },
      { question: 'Can I have both types of IRA?', answer: 'Yes, but your total contributions across all IRAs cannot exceed the annual limit.' }
    ],
    icon: '🏛️',
    path: '/us/retirement-calculators/ira-calculator.html'
  },
  'retirement-income-calculator': {
    slug: 'retirement-income-calculator',
    category: 'retirement-calculators',
    title: 'Retirement Income Calculator',
    metaDescription: 'Estimate your monthly retirement income from savings, Social Security, and pensions. Plan your retirement budget.',
    h1: 'Retirement Income Calculator - Monthly Income Estimator',
    introduction: `Plan your retirement budget with confidence using our income calculator. Estimate your total monthly retirement income from all sources including savings withdrawals, Social Security benefits, and pensions. See if your projected income meets your desired lifestyle and make adjustments to your savings plan if needed.`,
    relatedCalculators: ['retirement-savings-calculator', 'social-security-calculator', '401k-calculator', 'ira-calculator'],
    formulaFile: 'retirement-income-formula.js',
    uiFile: 'retirement-income-calculator.js',
    faqs: [
      { question: 'How much retirement income will I need?', answer: 'Most retirees need 70-80% of pre-retirement income, though this varies based on lifestyle and debt.' },
      { question: 'When should I take Social Security?', answer: 'You can start at 62, but waiting until full retirement age (66-67) or 70 maximizes your benefit.' },
      { question: 'What is a safe withdrawal rate?', answer: 'The 4% rule is commonly used, meaning you withdraw 4% of your portfolio in year one, adjusting for inflation.' }
    ],
    icon: '💵',
    path: '/us/retirement-calculators/retirement-income-calculator.html'
  },
  'social-security-calculator': {
    slug: 'social-security-calculator',
    category: 'retirement-calculators',
    title: 'Social Security Calculator',
    metaDescription: 'Estimate your Social Security benefits based on earnings history and retirement age. Compare filing strategies.',
    h1: 'Social Security Calculator - Benefit Estimator',
    introduction: `Estimate your future Social Security benefits with our accurate calculator. Input your earnings history and desired retirement age to see your projected monthly benefit. Compare different filing strategies to maximize your lifetime benefits and make informed decisions about when to start collecting Social Security.`,
    relatedCalculators: ['retirement-income-calculator', 'retirement-savings-calculator', '401k-calculator', 'ira-calculator'],
    formulaFile: 'social-security-formula.js',
    uiFile: 'social-security-calculator.js',
    faqs: [
      { question: 'How are Social Security benefits calculated?', answer: 'Benefits are based on your 35 highest-earning years, adjusted for inflation, and your age when you claim.' },
      { question: 'What is full retirement age?', answer: 'Full retirement age is 66-67 depending on your birth year. Benefits are reduced if claimed earlier.' },
      { question: 'Can I work and collect Social Security?', answer: 'Yes, but if under full retirement age, earnings above a limit may reduce your benefits temporarily.' }
    ],
    icon: '🛡️',
    path: '/us/retirement-calculators/social-security-calculator.html'
  },

  // ============================================
  // PERSONAL FINANCE CALCULATORS (5)
  // ============================================
  'budget-calculator': {
    slug: 'budget-calculator',
    category: 'personal-finance',
    title: 'Budget Calculator',
    metaDescription: 'Create a personalized budget based on your income and expenses. Use the 50/30/20 rule or customize your own.',
    h1: 'Budget Calculator - Create Your Personal Budget',
    introduction: `Take control of your finances with our comprehensive budget calculator. Input your income and expenses to create a personalized spending plan. Use the popular 50/30/20 rule or customize allocations to match your financial goals. Identify areas where you can save and ensure your spending aligns with your priorities.`,
    relatedCalculators: ['debt-to-income-calculator', 'emergency-fund-calculator', 'net-worth-calculator', 'savings-goal-calculator'],
    formulaFile: 'budget-formula.js',
    uiFile: 'budget-calculator.js',
    faqs: [
      { question: 'What is the 50/30/20 rule?', answer: 'Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment.' },
      { question: 'How do I track my expenses?', answer: 'Use budgeting apps, spreadsheets, or review bank statements to categorize and track spending.' },
      { question: 'What if my expenses exceed income?', answer: 'Look for areas to cut discretionary spending, increase income, or consider debt consolidation options.' }
    ],
    icon: '📋',
    path: '/us/personal-finance/budget-calculator.html'
  },
  'debt-payoff-calculator': {
    slug: 'debt-payoff-calculator',
    category: 'personal-finance',
    title: 'Debt Payoff Calculator',
    metaDescription: 'Create a debt elimination plan using avalanche or snowball method. Calculate payoff dates and interest savings.',
    h1: 'Debt Payoff Calculator - Eliminate Debt Faster',
    introduction: `Get out of debt faster with our strategic payoff calculator. Compare the debt avalanche (highest interest first) and debt snowball (smallest balance first) methods to see which works best for you. Input all your debts to create a customized payoff plan that minimizes interest and keeps you motivated on your journey to financial freedom.`,
    relatedCalculators: ['debt-to-income-calculator', 'loan-payoff-calculator', 'credit-card-payoff-calculator', 'budget-calculator'],
    formulaFile: 'debt-payoff-formula.js',
    uiFile: 'debt-payoff-calculator.js',
    faqs: [
      { question: 'What is the debt snowball method?', answer: 'Pay minimums on all debts, then put extra money toward the smallest balance for quick wins.' },
      { question: 'What is the debt avalanche method?', answer: 'Pay minimums on all debts, then put extra money toward the highest interest rate to save the most.' },
      { question: 'Which method is better?', answer: 'Avalanche saves more money mathematically, but snowball provides psychological wins that help some people stay motivated.' }
    ],
    icon: '💳',
    path: '/us/personal-finance/debt-payoff-calculator.html'
  },
  'credit-card-payoff-calculator': {
    slug: 'credit-card-payoff-calculator',
    category: 'personal-finance',
    title: 'Credit Card Payoff Calculator',
    metaDescription: 'Calculate how long it will take to pay off credit card debt. See the impact of increasing monthly payments.',
    h1: 'Credit Card Payoff Calculator - Eliminate Credit Card Debt',
    introduction: `Break free from credit card debt with our payoff calculator. See exactly how long it will take to pay off your balances and how much interest you'll pay. Experiment with different monthly payment amounts to find the sweet spot that eliminates your debt quickly while fitting your budget. Stop paying high interest and start building wealth.`,
    relatedCalculators: ['debt-payoff-calculator', 'debt-to-income-calculator', 'loan-payoff-calculator', 'budget-calculator'],
    formulaFile: 'credit-card-payoff-formula.js',
    uiFile: 'credit-card-payoff-calculator.js',
    faqs: [
      { question: 'How is credit card interest calculated?', answer: 'Most cards use daily periodic rate multiplied by average daily balance, compounded daily.' },
      { question: 'Should I pay more than the minimum?', answer: 'Absolutely. Paying only minimums can take decades and cost thousands in interest.' },
      { question: 'Should I transfer to a 0% APR card?', answer: 'Balance transfers can save money if you pay off before the promotional rate expires and fees are reasonable.' }
    ],
    icon: '💳',
    path: '/us/personal-finance/credit-card-payoff-calculator.html'
  },
  'net-worth-calculator': {
    slug: 'net-worth-calculator',
    category: 'personal-finance',
    title: 'Net Worth Calculator',
    metaDescription: 'Calculate your net worth by comparing assets and liabilities. Track your financial progress over time.',
    h1: 'Net Worth Calculator - Know Your Financial Position',
    introduction: `Understand your complete financial picture with our net worth calculator. Input all your assets (cash, investments, property) and liabilities (debts, loans, mortgages) to calculate your net worth. Track this important metric over time to measure your financial progress and stay motivated on your wealth-building journey.`,
    relatedCalculators: ['budget-calculator', 'emergency-fund-calculator', 'savings-goal-calculator', 'debt-to-income-calculator'],
    formulaFile: 'net-worth-formula.js',
    uiFile: 'net-worth-calculator.js',
    faqs: [
      { question: 'What is net worth?', answer: 'Net worth is the difference between what you own (assets) and what you owe (liabilities).' },
      { question: 'What is a good net worth?', answer: 'Net worth varies by age. A common benchmark is having your annual salary saved by age 30.' },
      { question: 'How often should I calculate net worth?', answer: 'Monthly or quarterly tracking helps you see trends and stay accountable to your goals.' }
    ],
    icon: '💎',
    path: '/us/personal-finance/net-worth-calculator.html'
  },
  'emergency-fund-calculator': {
    slug: 'emergency-fund-calculator',
    category: 'personal-finance',
    title: 'Emergency Fund Calculator',
    metaDescription: 'Calculate how much emergency savings you need. Factor in monthly expenses and job security for personalized results.',
    h1: 'Emergency Fund Calculator - Build Your Safety Net',
    introduction: `Protect yourself from financial emergencies with our savings calculator. Determine how much you should save based on your monthly expenses, job stability, and family situation. Most experts recommend 3-6 months of expenses, but this tool helps you personalize that recommendation based on your specific circumstances and risk factors.`,
    relatedCalculators: ['budget-calculator', 'savings-goal-calculator', 'net-worth-calculator', 'debt-to-income-calculator'],
    formulaFile: 'emergency-fund-formula.js',
    uiFile: 'emergency-fund-calculator.js',
    faqs: [
      { question: 'How much should I have in an emergency fund?', answer: 'Most experts recommend 3-6 months of essential expenses, adjusted for your job stability and family situation.' },
      { question: 'Where should I keep my emergency fund?', answer: 'High-yield savings accounts offer liquidity and some interest while keeping your money accessible.' },
      { question: 'What counts as an emergency?', answer: 'True emergencies include job loss, medical emergencies, and essential home or car repairs.' }
    ],
    icon: '🛡️',
    path: '/us/personal-finance/emergency-fund-calculator.html'
  },

  // ============================================
  // UTILITY METHODS
  // ============================================
  
  getBySlug(slug) {
    return this[slug] || null;
  },

  getByCategory(category) {
    return Object.values(this)
      .filter(item => item && typeof item === 'object' && item.category === category);
  },

  getAll() {
    return Object.values(this)
      .filter(item => item && typeof item === 'object' && item.slug);
  },

  getCategories() {
    return [
      { id: 'loan-calculators', name: 'Loan Calculators', description: 'Mortgage, auto, and loan payoff tools' },
      { id: 'tax-calculators', name: 'Tax Calculators', description: 'Federal, self-employment, and capital gains tax' },
      { id: 'investment-calculators', name: 'Investment Calculators', description: 'Compound interest, ROI, and stock analysis' },
      { id: 'retirement-calculators', name: 'Retirement Calculators', description: '401k, IRA, and retirement income planning' },
      { id: 'personal-finance', name: 'Personal Finance', description: 'Budgeting, debt payoff, and net worth tracking' }
    ];
  }
};

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalculatorRegistry;
}
