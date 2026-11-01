export interface IdeaInput {
  idea: string;
  industry: string;
  targetMarket: string;
  targetCustomer: string;
  budget: string;
  stage: string;
  additionalNotes?: string;
}

export interface ExecutiveSummary {
  projectName: string;
  tagline: string;
  elevatorPitch: string;
  valueProposition: string;
  coreStrategicEdge: string;
  strategicDisclaimer: string;
}

export interface ProblemStatement {
  summary: string;
  rootCauses: string[];
  affectedGroups: string[];
  costOfInaction: string;
  urgencyFactor: string;
}

export interface ProposedSolution {
  summary: string;
  coreMechanism: string;
  whyNow: string;
  keyDifferentiator: string;
  userOutcome: string;
}

export interface CustomerPersona {
  name: string;
  role: string;
  demographics: string;
  painPoints: string[];
  motivations: string[];
  willingnessToPay: string;
  preferredChannels: string[];
}

export interface TargetAudience {
  marketSegmentation: string;
  personas: CustomerPersona[];
}

export interface CompetitorComparison {
  competitorType: string;
  typicalPlayers: string;
  theirShortcomings: string;
  ourAdvantage: string;
}

export interface MarketOpportunity {
  tamSamSomAnalysis: {
    tam: string;
    sam: string;
    som: string;
    assumptionsNote: string;
  };
  industryTrends: string[];
  competitorLandscape: CompetitorComparison[];
  validationInterviewQuestions: string[];
}

export interface RevenueStream {
  streamName: string;
  pricingStructure: string;
  targetContribution: string;
  rationale: string;
}

export interface BusinessModel {
  primaryModelType: string;
  revenueStreams: RevenueStream[];
  unitEconomicsHypothesis: {
    estimatedCAC: string;
    estimatedLTV: string;
    targetPaybackPeriod: string;
    assumptionsDisclaimer: string;
  };
}

export interface MvpFeatureItem {
  feature: string;
  purpose: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface MvpFeaturePrioritization {
  mustHave: MvpFeatureItem[];
  shouldHave: MvpFeatureItem[];
  couldHave: MvpFeatureItem[];
  wontHaveMVP: Array<{ feature: string; reasonToOmit: string }>;
  launchTimelineEstimate: string;
}

export interface TechStackCategory {
  choices: string[];
  justification: string;
}

export interface TechStack {
  frontend: TechStackCategory;
  backend: TechStackCategory;
  database: TechStackCategory;
  aiTools: TechStackCategory;
  infrastructure: TechStackCategory;
  monthlyCostEstimateInitial: string;
}

export interface MarketingChannel {
  channel: string;
  tactics: string;
  costLevel: 'Free / Organic' | 'Low Cost' | 'Paid';
  expectedTimeline: string;
}

export interface MarketingStrategy {
  initial100CustomersTactic: string;
  primaryChannels: MarketingChannel[];
  contentAndViralityFlywheel: string;
}

export interface RiskItem {
  category: 'Market Risk' | 'Technical Risk' | 'Execution Risk' | 'Financial/Legal Risk';
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  mitigationPlan: string;
}

export interface ValidationExperiment {
  experimentName: string;
  hypothesis: string;
  method: string;
  successMetric: string;
  budgetRequired: string;
}

export interface RiskAnalysis {
  risks: RiskItem[];
  validationExperiments: ValidationExperiment[];
}

export interface WeekPlan {
  focus: string;
  deliverables: string[];
}

export interface LaunchRoadmap {
  week1: WeekPlan;
  week2: WeekPlan;
  week3: WeekPlan;
  week4: WeekPlan;
}

export interface KpiItem {
  category: 'Acquisition' | 'Activation' | 'Retention' | 'Revenue' | 'Referral';
  metricName: string;
  target30Days: string;
  target90Days: string;
  trackingToolSuggestion: string;
}

export interface KpiFramework {
  framework: string;
  metrics: KpiItem[];
}

export interface StartupBlueprint {
  id: string;
  timestamp: string;
  input: IdeaInput;
  executiveSummary: ExecutiveSummary;
  problemStatement: ProblemStatement;
  proposedSolution: ProposedSolution;
  targetAudience: TargetAudience;
  marketOpportunity: MarketOpportunity;
  businessModel: BusinessModel;
  mvpFeaturePrioritization: MvpFeaturePrioritization;
  techStack: TechStack;
  marketingStrategy: MarketingStrategy;
  riskAnalysis: RiskAnalysis;
  launchRoadmap: LaunchRoadmap;
  kpis: KpiFramework;
}

export interface StrategicRecommendation {
  title: string;
  problemIdentified: string;
  recommendedRefinement: string;
  expectedImpact: string;
}

export interface IdeaImprovement {
  strengths: string[];
  blindSpots: string[];
  strategicRecommendations: StrategicRecommendation[];
  enhancedPitch: string;
}

export interface AlternativeIdea {
  conceptName: string;
  pivotType: string;
  overview: string;
  targetAudience: string;
  whyItMightBeEasierOrBetter: string;
  keyTradeoff: string;
}

export type BlueprintSectionKey =
  | 'executiveSummary'
  | 'problemStatement'
  | 'proposedSolution'
  | 'targetAudience'
  | 'marketOpportunity'
  | 'businessModel'
  | 'mvpFeaturePrioritization'
  | 'techStack'
  | 'marketingStrategy'
  | 'riskAnalysis'
  | 'launchRoadmap'
  | 'kpis';
