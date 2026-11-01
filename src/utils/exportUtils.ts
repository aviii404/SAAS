import { StartupBlueprint } from '../types/blueprint';

export function blueprintToMarkdown(b: StartupBlueprint): string {
  return `# ${b.executiveSummary.projectName} — Startup Blueprint
*${b.executiveSummary.tagline}*
*Generated on ${new Date(b.timestamp).toLocaleDateString()} via AI IdeaForge*

---

## 1. Executive Summary
- **Elevator Pitch:** ${b.executiveSummary.elevatorPitch}
- **Value Proposition:** ${b.executiveSummary.valueProposition}
- **Core Strategic Edge:** ${b.executiveSummary.coreStrategicEdge}
> *Disclaimer: ${b.executiveSummary.strategicDisclaimer}*

---

## 2. Problem Statement
**Summary:** ${b.problemStatement.summary}

### Root Causes
${b.problemStatement.rootCauses.map((rc) => `- ${rc}`).join('\n')}

### Affected Stakeholders
${b.problemStatement.affectedGroups.map((ag) => `- ${ag}`).join('\n')}

- **Cost of Inaction:** ${b.problemStatement.costOfInaction}
- **Urgency Factor:** ${b.problemStatement.urgencyFactor}

---

## 3. Proposed Solution
**Summary:** ${b.proposedSolution.summary}
- **Core Mechanism:** ${b.proposedSolution.coreMechanism}
- **Why Now:** ${b.proposedSolution.whyNow}
- **Key Differentiator:** ${b.proposedSolution.keyDifferentiator}
- **Target User Outcome:** ${b.proposedSolution.userOutcome}

---

## 4. Target Audience & Customer Personas
**Market Segmentation:** ${b.targetAudience.marketSegmentation}

${b.targetAudience.personas
  .map(
    (p, i) => `### Persona ${i + 1}: ${p.name} (${p.role})
- **Demographics:** ${p.demographics}
- **Pain Points:**
${p.painPoints.map((pp) => `  - ${pp}`).join('\n')}
- **Motivations:**
${p.motivations.map((m) => `  - ${m}`).join('\n')}
- **Willingness to Pay:** ${p.willingnessToPay}
- **Preferred Channels:** ${p.preferredChannels.join(', ')}`
  )
  .join('\n\n')}

---

## 5. Market Opportunity & Competitor Research
### TAM / SAM / SOM Analysis (Working Hypotheses)
- **Total Addressable Market (TAM):** ${b.marketOpportunity.tamSamSomAnalysis.tam}
- **Serviceable Addressable Market (SAM):** ${b.marketOpportunity.tamSamSomAnalysis.sam}
- **Serviceable Obtainable Market (SOM):** ${b.marketOpportunity.tamSamSomAnalysis.som}
> *Note: ${b.marketOpportunity.tamSamSomAnalysis.assumptionsNote}*

### Industry Trends
${b.marketOpportunity.industryTrends.map((t) => `- ${t}`).join('\n')}

### Competitor Landscape
| Competitor Type | Existing Players | Key Shortcomings | Our Advantage |
| :--- | :--- | :--- | :--- |
${b.marketOpportunity.competitorLandscape
  .map(
    (c) =>
      `| ${c.competitorType} | ${c.typicalPlayers} | ${c.theirShortcomings} | ${c.ourAdvantage} |`
  )
  .join('\n')}

### Customer Discovery Validation Questions
${b.marketOpportunity.validationInterviewQuestions.map((q, idx) => `${idx + 1}. ${q}`).join('\n')}

---

## 6. Business Model & Revenue Streams
- **Primary Model Type:** ${b.businessModel.primaryModelType}

### Revenue Streams
${b.businessModel.revenueStreams
  .map(
    (s) =>
      `- **${s.streamName}** (${s.targetContribution} of revenue)\n  - Pricing: ${s.pricingStructure}\n  - Rationale: ${s.rationale}`
  )
  .join('\n\n')}

### Unit Economics Hypothesis
- **Estimated CAC:** ${b.businessModel.unitEconomicsHypothesis.estimatedCAC}
- **Estimated LTV:** ${b.businessModel.unitEconomicsHypothesis.estimatedLTV}
- **Target Payback Period:** ${b.businessModel.unitEconomicsHypothesis.targetPaybackPeriod}
> *${b.businessModel.unitEconomicsHypothesis.assumptionsDisclaimer}*

---

## 7. MVP Feature Prioritization (MoSCoW)
- **Estimated Launch Timeline:** ${b.mvpFeaturePrioritization.launchTimelineEstimate}

### Must-Have (Core Essentials)
${b.mvpFeaturePrioritization.mustHave.map((f) => `- [x] **${f.feature}** (${f.complexity} Complexity): ${f.purpose}`).join('\n')}

### Should-Have (High Impact)
${b.mvpFeaturePrioritization.shouldHave.map((f) => `- [ ] **${f.feature}** (${f.complexity} Complexity): ${f.purpose}`).join('\n')}

### Could-Have (Nice to Have)
${b.mvpFeaturePrioritization.couldHave.map((f) => `- [ ] **${f.feature}** (${f.complexity} Complexity): ${f.purpose}`).join('\n')}

### Won't-Have for MVP (Deferred)
${b.mvpFeaturePrioritization.wontHaveMVP.map((f) => `- **${f.feature}**: ${f.reasonToOmit}`).join('\n')}

---

## 8. Technology Stack Suggestions
- **Frontend:** ${b.techStack.frontend.choices.join(', ')} — *${b.techStack.frontend.justification}*
- **Backend:** ${b.techStack.backend.choices.join(', ')} — *${b.techStack.backend.justification}*
- **Database:** ${b.techStack.database.choices.join(', ')} — *${b.techStack.database.justification}*
- **AI/ML Services:** ${b.techStack.aiTools.choices.join(', ')} — *${b.techStack.aiTools.justification}*
- **Infrastructure:** ${b.techStack.infrastructure.choices.join(', ')} — *${b.techStack.infrastructure.justification}*
- **Initial Monthly Infrastructure Cost:** ${b.techStack.monthlyCostEstimateInitial}

---

## 9. Marketing & Customer Acquisition Strategy
- **Initial 100 Customers Tactic:** ${b.marketingStrategy.initial100CustomersTactic}

### Primary Acquisition Channels
${b.marketingStrategy.primaryChannels
  .map(
    (c) =>
      `- **${c.channel}** [${c.costLevel} | ${c.expectedTimeline}]: ${c.tactics}`
  )
  .join('\n')}

- **Content & Virality Flywheel:** ${b.marketingStrategy.contentAndViralityFlywheel}

---

## 10. Risk Analysis & Validation Experiments
### Critical Risks & Mitigation
${b.riskAnalysis.risks
  .map(
    (r) =>
      `- **[${r.category} | ${r.severity} Severity]** ${r.description}\n  - *Mitigation Plan:* ${r.mitigationPlan}`
  )
  .join('\n\n')}

### Rapid Validation Experiments (< $100)
${b.riskAnalysis.validationExperiments
  .map(
    (e, idx) =>
      `#### Experiment ${idx + 1}: ${e.experimentName} (Budget: ${e.budgetRequired})
- **Hypothesis:** ${e.hypothesis}
- **Method:** ${e.method}
- **Success Metric:** ${e.successMetric}`
  )
  .join('\n\n')}

---

## 11. 30-Day Launch Roadmap
- **Week 1:** ${b.launchRoadmap.week1.focus}
${b.launchRoadmap.week1.deliverables.map((d) => `  - ${d}`).join('\n')}

- **Week 2:** ${b.launchRoadmap.week2.focus}
${b.launchRoadmap.week2.deliverables.map((d) => `  - ${d}`).join('\n')}

- **Week 3:** ${b.launchRoadmap.week3.focus}
${b.launchRoadmap.week3.deliverables.map((d) => `  - ${d}`).join('\n')}

- **Week 4:** ${b.launchRoadmap.week4.focus}
${b.launchRoadmap.week4.deliverables.map((d) => `  - ${d}`).join('\n')}

---

## 12. Key Performance Indicators (${b.kpis.framework})
| Category | Metric | 30-Day Target | 90-Day Target | Suggested Tool |
| :--- | :--- | :--- | :--- | :--- |
${b.kpis.metrics
  .map(
    (m) =>
      `| ${m.category} | ${m.metricName} | ${m.target30Days} | ${m.target90Days} | ${m.trackingToolSuggestion} |`
  )
  .join('\n')}

---
*Created with AI IdeaForge — From Idea to Impact.*
`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
