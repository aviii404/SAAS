import { StartupBlueprint } from '../types/blueprint';

export const SAMPLE_BLUEPRINT: StartupBlueprint = {
  id: 'blueprint-sample-ecobite',
  timestamp: new Date().toISOString(),
  input: {
    idea: 'An AI-powered food inventory and kitchen prep forecasting app for college dining halls and mid-sized cafeterias to reduce food waste, cut kitchen costs by 18%, and automatically suggest daily menu adjustments based on historical student meal counts and weather patterns.',
    industry: 'FoodTech & Hospitality SaaS',
    targetMarket: 'North America (Higher Education & Corporate Dining)',
    targetCustomer: 'Campus Dining Directors, Executive Chefs, and Food Operations Managers',
    budget: '$5,000 - $15,000 (Early Bootstrapped)',
    stage: 'Idea with Early Problem Interviews',
    additionalNotes: 'Dining halls lose up to 22% of prepared buffet food daily due to erratic student attendance, weather fluctuations, and manual clipboard inventory tracking.',
  },
  executiveSummary: {
    projectName: 'EcoBite Ops',
    tagline: 'Predictive Kitchen Intelligence That Eliminates Campus Food Waste',
    elevatorPitch: 'EcoBite Ops transforms university campus kitchens from guesswork to precision. By correlating student meal swipes, campus event calendars, and weather forecasts with real-time station waste logs, our software provides executive chefs with exact daily batch prep schedules—reducing food waste by 18-24% and saving average university dining programs $85,000 annually.',
    valueProposition: 'Reduce commercial kitchen food waste by over 20% while cutting procurement spend within 45 days, requiring zero barcode scanning hardware.',
    coreStrategicEdge: 'Software-first workflow that plugs directly into existing POS/meal-swipe logs without forcing kitchens into expensive camera-equipped scale hardware.',
    strategicDisclaimer: 'Projections and market size figures are exploratory operational models requiring pilot validation across initial campus test sites.',
  },
  problemStatement: {
    summary: 'Higher-education dining halls operate on tight operational margins yet routinely overproduce 15% to 25% of prepared buffet entrees because prep cooks rely on static historical sheets rather than dynamic predictive attendance.',
    rootCauses: [
      'Unpredictable student dining attendance caused by midterm schedules, campus events, and weather shifts.',
      'Fragmented kitchen communications between morning prep cooks and evening replenishment staff.',
      'Existing commercial food waste solutions require expensive $10k+ sensorized trash scales that disrupt fast-paced kitchen rhythms.',
      'Procurement orders are placed on weekly fixed cycles instead of dynamic ingredient consumption rates.',
    ],
    affectedGroups: [
      'Campus Dining Directors bearing budget deficits and institutional sustainability penalties.',
      'Executive Chefs spending 3+ hours daily on manual spreadsheet inventory reconciliation.',
      'University Sustainability Officers struggling to meet mandatory 2030 zero-waste diversion targets.',
      'Students frustrated by stale leftovers or frequent cafeteria stock-outs during peak hours.',
    ],
    costOfInaction: 'A standard 4,000-student campus cafeteria wastes approximately $90,000 to $140,000 in discarded prepared ingredients every academic year.',
    urgencyFactor: 'Rising state-level commercial organic waste bans (e.g., California SB 1383, Massachusetts DEP food waste regulations) now penalize unmonitored commercial disposal.',
  },
  proposedSolution: {
    summary: 'A responsive, tablet-friendly predictive kitchen assistant that forecasts meal demand 48 hours in advance and generates optimized prep quantities per cooking station.',
    coreMechanism: 'Machine learning demand-forecasting model that digests campus calendar feeds, weather predictions, and past POS meal-swipe velocity to output station-by-station prep amounts.',
    whyNow: 'Ubiquitous low-cost tablets in commercial kitchens combined with modern lightweight serverless AI inference allow real-time forecasting without specialized hardware installations.',
    keyDifferentiator: 'No intrusive hardware scales: 60-second end-of-shift visual check-in replaces cumbersome per-pan weigh-ins, achieving 94% staff compliance.',
    userOutcome: 'Kitchen managers gain instant 48-hour prep guidance, a 21% reduction in overproduction waste, and automated compliance reports for campus sustainability boards.',
  },
  targetAudience: {
    marketSegmentation: 'Primary beachhead: 4-year residential colleges with 2,500–12,000 enrolled dining plan holders. Secondary: Corporate campus cafeterias and hospital culinary services.',
    personas: [
      {
        name: 'Chef Marcus Vance',
        role: 'Executive Campus Chef (Dining Services)',
        demographics: 'Age 46 · Culinary Arts degree · Manages 2 central dining halls and 32 kitchen staff',
        painPoints: [
          'Hates throwing away 8 hotel pans of roasted chicken every rainy Tuesday evening.',
          'Overwhelmed by clunky legacy ERP software that takes 40 clicks to adjust an ingredient batch.',
          'Staff turnover means new prep cooks over-prep comfort dishes out of habit.',
        ],
        motivations: [
          'Run a clean, prestigious, zero-waste kitchen that wins culinary accolades.',
          'Protect tight quarterly ingredient budgets against food inflation.',
          'Spend less time behind an office computer and more time mentoring prep staff.',
        ],
        willingnessToPay: '$400 – $750 / kitchen / month if it proves an immediate 3x ROI in reduced food spoilage.',
        preferredChannels: [
          'NACUFS (National Association of College & University Food Services) regional conferences.',
          'Culinary peer referrals and LinkedIn Foodservice Director groups.',
          'Direct on-site breakfast demonstrations with campus dining directors.',
        ],
      },
      {
        name: 'Elena Rostova',
        role: 'Director of Campus Sustainability & Auxiliary Operations',
        demographics: 'Age 38 · M.S. Environmental Management · Oversees campus ESG and vendor compliance',
        painPoints: [
          'Lacks verifiable digital audit trails to substantiate annual university zero-waste claims.',
          'State compost mandates require quarterly diversion percentage reports under threat of fines.',
          'Students actively protest dining hall food waste on social media.',
        ],
        motivations: [
          'Achieve AASHE STARS Platinum rating for university environmental stewardship.',
          'Publish transparent student-facing impact dashboards showing meals rescued and carbon averted.',
          'Strengthen institutional grant applications with rigorous environmental telemetry.',
        ],
        willingnessToPay: 'Willing to co-sponsor software licenses from university sustainability innovation funds ($5k-$15k/year).',
        preferredChannels: [
          'AASHE annual conference and campus sustainability forums.',
          'Joint webinars on college auxiliary services optimization.',
        ],
      },
    ],
  },
  marketOpportunity: {
    tamSamSomAnalysis: {
      tam: '$4.8B Global Food Waste Management Software Market (projected by independent market analysts by 2030)',
      sam: '$780M North American Higher Education & Contract Foodservice Kitchen Analytics',
      som: '$42M Initial Beachhead: 1,400 Mid-sized US Private & Public Universities with in-house or hybrid dining',
      assumptionsNote: 'Market estimates based on ~3,800 accredited US higher ed institutions spending an estimated $5,000–$12,000 annually on culinary tech solutions. All figures are working hypotheses subject to primary industry validation.',
    },
    industryTrends: [
      'Accelerating regulatory bans on landfilling commercial organic food waste across 10+ US states.',
      'Food ingredient inflation (+19% over the past 3 years) forcing university dining directors to eliminate waste margins.',
      'Student demand for transparent ethical sourcing and visible campus carbon reduction initiatives.',
    ],
    competitorLandscape: [
      {
        competitorType: 'Hardware-Heavy Scale Systems (e.g., Leanpath, Winnow)',
        typicalPlayers: 'Enterprise kitchen scales equipped with cameras and touchscreen podiums.',
        theirShortcomings: 'Prohibitive upfront capex ($8,000–$15,000/station), high staff friction weighing individual food scrap buckets.',
        ourAdvantage: 'Zero hardware costs, mobile tablet workflow, 5-minute staff onboarding, accessible to modest college budgets.',
      },
      {
        competitorType: 'Legacy Culinary ERPs (e.g., CBORD, Computrition)',
        typicalPlayers: 'Decades-old institutional inventory and recipe management monoliths.',
        theirShortcomings: 'Static recipe books with zero predictive machine learning; difficult user interfaces designed in the 2000s.',
        ourAdvantage: 'Modern cloud-native UI, automated external weather/event API ingestion, and fast setup.',
      },
      {
        competitorType: 'Manual Clipboards & Custom Spreadsheets',
        typicalPlayers: 'Laminated prep sheets taped to stainless steel counters and end-of-month Excel sheets.',
        theirShortcomings: 'Error-prone, no historical predictive memory, cannot react to sudden schedule changes or storm forecasts.',
        ourAdvantage: 'Real-time sync across shifts with automated alert notifications when weather triggers an attendance dip.',
      },
    ],
    validationInterviewQuestions: [
      'How does your culinary team currently forecast meal portions when a home football game or heavy snowstorm is scheduled?',
      'What happens to prepared, heated entrees that remain in the buffet line at closing time?',
      'Who in your organization holds direct budget accountability for monthly food waste shrinkage?',
      'If a software system demonstrated a $4,000 monthly ingredient savings with 3 minutes of daily staff logging, what would be the procurement approval hurdles?',
    ],
  },
  businessModel: {
    primaryModelType: 'B2B SaaS Tiered Subscription (Per Dining Hall / Month)',
    revenueStreams: [
      {
        streamName: 'Campus Dining Core Subscription',
        pricingStructure: '$399 / dining hall / month (billed annually at $4,200/yr)',
        targetContribution: '75% of Year 1 Annual Recurring Revenue',
        rationale: 'Matches auxiliary budget discretionary spending limits ($5,000 threshold) without requiring lengthy multi-tier RFP tenders.',
      },
      {
        streamName: 'Enterprise District & Multi-Unit License',
        pricingStructure: '$299 / dining hall / month for campuses with 4+ facilities, including unified executive reporting',
        targetContribution: '20% of Year 1 ARR',
        rationale: 'Attracts contract foodservice management firms (Aramark, Sodexo, Compass Group subcontractors).',
      },
      {
        streamName: 'Sustainability & ESG Audit Reporting Add-on',
        pricingStructure: '$1,200 / campus / academic year',
        targetContribution: '5% of Year 1 ARR',
        rationale: 'Provides turnkey carbon diversion certificates for institutional green accreditation boards.',
      },
    ],
    unitEconomicsHypothesis: {
      estimatedCAC: '$1,800 (Direct founder sales, culinary association booths, targeted LinkedIn outreach)',
      estimatedLTV: '$12,600 (Based on anticipated 3-year average contract retention for institutional software)',
      targetPaybackPeriod: '4.5 months to recoup initial sales and onboarding costs',
      assumptionsDisclaimer: 'Unit economics represent target operational hypotheses derived from comparable B2B vertical SaaS benchmarks; requires verification through initial 5 pilot contracts.',
    },
  },
  mvpFeaturePrioritization: {
    mustHave: [
      {
        feature: 'Shift Demand Forecaster',
        purpose: 'Generates daily morning batch prep recommendations based on weather, day-of-week, and academic term calendar.',
        complexity: 'Medium',
      },
      {
        feature: 'Rapid 60-Second Waste Logger',
        purpose: 'Allows closing line cooks to log leftover pan counts with 3 taps on any kitchen tablet.',
        complexity: 'Low',
      },
      {
        feature: 'Dollar Waste Financial Dashboard',
        purpose: 'Shows Executive Chefs weekly shrinkage converted to direct dollar losses by culinary station (Grill, Deli, Hot Entree).',
        complexity: 'Low',
      },
    ],
    shouldHave: [
      {
        feature: 'POS Meal-Swipe CSV Importer',
        purpose: 'Enables quick drag-and-drop of historical turnstile swipe logs to auto-train the local demand model.',
        complexity: 'Medium',
      },
      {
        feature: 'Weather Impact Alerts',
        purpose: 'Sends SMS/Push alert to Head Chef when sudden rainstorms or blizzards are forecasted to drop lunch traffic by >15%.',
        complexity: 'Low',
      },
    ],
    couldHave: [
      {
        feature: 'Recipe Cost Breakdown Tool',
        purpose: 'Calculates exact ingredient-level cost per wasted batch based on supplier invoices.',
        complexity: 'High',
      },
      {
        feature: 'Local Food Bank Rescue Integration',
        purpose: '1-click dispatch to campus food pantries for safe surplus food pickup before health code expiry.',
        complexity: 'Medium',
      },
    ],
    wontHaveMVP: [
      {
        feature: 'Computer Vision Optical Camera Recognition',
        reasonToOmit: 'Avoids hardware complexity ($10k+ sensors); keeps initial deployment frictionless and purely software-based.',
      },
      {
        feature: 'Bi-directional Automated Vendor Re-ordering (Sysco/US Foods EDI)',
        reasonToOmit: 'Focus solely on kitchen prep optimization before attempting complex enterprise supply chain EDI integrations.',
      },
    ],
    launchTimelineEstimate: '4 weeks to build functional MVP tablet interface and predictive rule engine.',
  },
  techStack: {
    frontend: {
      choices: ['React 19', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
      justification: 'Instant loading speeds, responsive touch-first UI optimized for kitchen counter iPads, offline resilient.',
    },
    backend: {
      choices: ['Node.js Express', 'TypeScript Serverless Functions'],
      justification: 'High throughput, low operational overhead, straightforward JSON schema validation, rapid deployment.',
    },
    database: {
      choices: ['PostgreSQL (via Cloud SQL / Supabase) with Prisma / Drizzle'],
      justification: 'Relational integrity for station recipes, daily shift logs, multi-tenant campus isolation, and time-series metrics.',
    },
    aiTools: {
      choices: ['Google Gemini 3.8 Flash (via @google/genai SDK)'],
      justification: 'Fast inference for batch forecasting, menu substitution recommendations, and automated weekly culinary executive summaries.',
    },
    infrastructure: {
      choices: ['Google Cloud Run', 'Vercel / Cloudflare CDN', 'Daily Automated Backups'],
      justification: 'Enterprise-grade uptime (99.9%), scale-to-zero cost structure during summer campus breaks.',
    },
    monthlyCostEstimateInitial: '$35 - $65 / month during early pilot phase.',
  },
  marketingStrategy: {
    initial100CustomersTactic: 'Conduct on-site "Kitchen Food Waste Audits" for 10 regional colleges within driving distance. Offer the Chef a free 30-day trial with personal founder onboarding and a guaranteed $2,000 waste reduction pledge.',
    primaryChannels: [
      {
        channel: 'Regional NACUFS Conferences & Foodservice Trade Shows',
        tactics: 'Live tablet demo booth showing a real-time before/after dining hall prep schedule and cost savings.',
        costLevel: 'Low Cost',
        expectedTimeline: 'Months 2–4',
      },
      {
        channel: 'LinkedIn InMail to College Auxiliary Directors',
        tactics: 'Send 2-minute video tear-downs addressing recent state food waste regulatory mandates.',
        costLevel: 'Free / Organic',
        expectedTimeline: 'Weeks 1–6',
      },
      {
        channel: 'Student Sustainability Activism Flywheel',
        tactics: 'Partner with campus Net Impact and student environmental clubs to present dining waste audit findings to student government boards.',
        costLevel: 'Free / Organic',
        expectedTimeline: 'Ongoing',
      },
    ],
    contentAndViralityFlywheel: 'Publish an open-access "National Campus Food Waste Index" ranking colleges by meal prep efficiency, driving viral press coverage in higher ed trade publications (Chronicle of Higher Ed, Food Management Magazine).',
  },
  riskAnalysis: {
    risks: [
      {
        category: 'Execution Risk',
        description: 'Busy kitchen staff skip the 60-second end-of-shift logging when cleanup rushes occur.',
        severity: 'High',
        mitigationPlan: 'Incorporate gamified station incentives and reduce logging to a maximum of 3 taps on dedicated station tablets.',
      },
      {
        category: 'Market Risk',
        description: 'University procurement cycles are slow (6–9 months approval timelines for auxiliary contracts).',
        severity: 'High',
        mitigationPlan: 'Keep pilot price below the $5,000 threshold where Dining Directors can approve purchases on departmental procurement cards without formal RFP.',
      },
      {
        category: 'Technical Risk',
        description: 'Student attendance models suffer poor accuracy during the first 14 days before campus-specific patterns emerge.',
        severity: 'Medium',
        mitigationPlan: 'Bootstrap initial forecasts with baseline historical turnstile swipe CSVs or comparable university archetypes.',
      },
      {
        category: 'Financial/Legal Risk',
        description: 'Commercial contract foodservice concessionaires (e.g., Compass Group) may have blanket vendor agreements.',
        severity: 'Medium',
        mitigationPlan: 'Focus on self-operated ("self-op") university dining programs first, who maintain 100% autonomous software purchasing freedom.',
      },
    ],
    validationExperiments: [
      {
        experimentName: 'Laminated Clipboard Baseline Test',
        hypothesis: 'Providing kitchen staff with a structured 3-item end-of-shift sheet will uncover >$300/day in preventable over-prep.',
        method: 'Run manual 5-day paper audit in 1 campus dining hall with founder counting leftover pans at 8 PM closing.',
        successMetric: 'Identify at least 15% batch prep surplus in 4 out of 5 consecutive dinner shifts.',
        budgetRequired: '$50 (Clipboards + printing)',
      },
      {
        experimentName: 'Direct Dining Director Cold Outreach Test',
        hypothesis: 'Offering an automated waste audit will generate at least a 12% meeting booking rate from higher ed directors.',
        method: 'Send 50 personalized LinkedIn messages and emails to dining directors in target states.',
        successMetric: 'Book 6+ exploratory discovery calls within 14 days.',
        budgetRequired: '$0 (Sweat equity)',
      },
      {
        experimentName: 'Figma Interactive Tablet Workflow Walkthrough',
        hypothesis: 'Line cooks can complete evening logging in under 60 seconds without instruction.',
        method: 'Observe 5 culinary prep workers using a simulated iPad prototype during active dinner cleanup.',
        successMetric: '100% of participants complete test log in <60 seconds without asking questions.',
        budgetRequired: '$0',
      },
      {
        experimentName: 'Pre-Order / Letter of Intent Pilot',
        hypothesis: 'At least 2 campus directors will sign a non-binding Letter of Intent for a $350/mo paid pilot upon prototype completion.',
        method: 'Present demo prototype and pitch deck during discovery follow-up meetings.',
        successMetric: '2 signed LOIs within 30 days of prototype presentation.',
        budgetRequired: '$0',
      },
    ],
  },
  launchRoadmap: {
    week1: {
      focus: 'Customer Discovery & Manual Baseline Audits',
      deliverables: [
        'Conduct 8 discovery interviews with campus executive chefs and dining directors.',
        'Perform 3 days of on-site evening food waste observation at a local campus cafeteria.',
        'Synthesize core recurring over-prep ingredients (poultry, starch sides, salad bar items).',
      ],
    },
    week2: {
      focus: 'Design & Core Architecture Prototype',
      deliverables: [
        'Design responsive, high-contrast kitchen tablet UI in React with large touch targets.',
        'Implement weather forecasting API ingestion and calendar event schedule mapper.',
        'Create database schema for ingredients, station shifts, and historical swipe records.',
      ],
    },
    week3: {
      focus: 'Predictive Prep Engine & Reporting Module',
      deliverables: [
        'Build demand-forecasting algorithm correlating attendance to prep batch quantities.',
        'Develop 60-second end-of-shift waste logging workflow with instant dollar loss metrics.',
        'Implement automated weekly email summary for Dining Directors.',
      ],
    },
    week4: {
      focus: 'Campus Pilot Soft Launch & First Feedback Loop',
      deliverables: [
        'Deploy MVP tablet at 1 partner university dining hall for live lunch/dinner shifts.',
        'Track daily staff completion rate and measure over-prep reduction after 7 days.',
        'Present first weekly savings report ($) to Executive Chef and negotiate paid semester pilot.',
      ],
    },
  },
  kpis: {
    framework: 'Pirate Metrics (AARRR) for Enterprise Culinary SaaS',
    metrics: [
      {
        category: 'Acquisition',
        metricName: 'Qualified Discovery Meetings Booked',
        target30Days: '12 meetings with Dining Directors',
        target90Days: '35 meetings across 3 states',
        trackingToolSuggestion: 'HubSpot / Notion CRM',
      },
      {
        category: 'Activation',
        metricName: 'Daily Kitchen Staff Shift Logging Compliance',
        target30Days: '>85% of scheduled shifts logged',
        target90Days: '>92% across all pilot kitchens',
        trackingToolSuggestion: 'Internal PostgreSQL Event Log',
      },
      {
        category: 'Retention',
        metricName: 'Weekly Active Chef Dashboard Logins',
        target30Days: '5 logins per kitchen per week',
        target90Days: '6 logins per kitchen per week',
        trackingToolSuggestion: 'PostHog / Umami Analytics',
      },
      {
        category: 'Revenue',
        metricName: 'Signed Paid Pilots ($399/mo)',
        target30Days: '2 Signed Pilot Agreements',
        target90Days: '6 Paid Campuses ($2,394 MRR)',
        trackingToolSuggestion: 'Stripe Billing / Quickbooks',
      },
      {
        category: 'Referral',
        metricName: 'Peer Director Introductions & NACUFS Mentions',
        target30Days: '1 warm peer referral',
        target90Days: '4 warm peer referrals',
        trackingToolSuggestion: 'Customer Survey / Email Tracker',
      },
    ],
  },
};
