import { IdeaInput } from '../types/blueprint';

export interface IdeaPreset {
  id: string;
  title: string;
  badge: string;
  preview: string;
  data: IdeaInput;
}

export const STARTER_PRESETS: IdeaPreset[] = [
  {
    id: 'food-waste',
    title: 'EcoBite: Campus Dining Food Waste AI',
    badge: 'FoodTech & Hospitality',
    preview: 'AI kitchen prep forecasting and leftover logging for college dining halls to eliminate overproduction.',
    data: {
      idea: 'An AI-powered food inventory and kitchen prep forecasting app for college dining halls and mid-sized cafeterias to reduce food waste, cut kitchen costs by 18%, and automatically suggest daily menu adjustments based on historical student meal counts and weather patterns.',
      industry: 'FoodTech & Sustainability',
      targetMarket: 'North America (Higher Education & Commercial Dining)',
      targetCustomer: 'Campus Dining Directors, Executive Chefs, and Food Operations Managers',
      budget: '$5,000 - $15,000',
      stage: 'Idea with Early Problem Interviews',
      additionalNotes: 'Dining halls lose up to 22% of prepared buffet food daily due to erratic student attendance and manual clipboard inventory tracking.',
    },
  },
  {
    id: 'freelance-ops',
    title: 'Clawback: Automated Late-Invoice Recovery',
    badge: 'FinTech & Future of Work',
    preview: 'Autonomous AI polite escalation agent that gets creative freelancers paid on time without awkward client friction.',
    data: {
      idea: 'A polite, autonomous AI client-relationship agent for independent freelancers and boutique agencies that connects to payment gateways, monitors overdue client invoices, and executes psychology-driven multi-channel follow-ups (WhatsApp, SMS, formal email) that recover payments 60% faster while maintaining client warmth.',
      industry: 'FinTech & Freelance Economy',
      targetMarket: 'Global (Remote Knowledge Workers & Agencies)',
      targetCustomer: 'Freelance designers, developers, copywriters, and 2-10 person creative studios',
      budget: '$1,000 - $5,000',
      stage: 'Concept Phase',
      additionalNotes: 'Freelancers report spending 4-8 hours each month chasing late payments, fearing they will offend clients.',
    },
  },
  {
    id: 'solar-permit',
    title: 'PermitSwift: Automated Rooftop Solar Permitting',
    badge: 'CleanTech & GovTech',
    preview: 'AI jurisdictional compliance engine that cuts residential solar permit turnaround from 30 days to 2 hours.',
    data: {
      idea: 'A B2B software platform for regional residential solar installers that ingests roof aerial CAD drawings and automatically checks and formats engineering schematics against the strict, disparate building code requirements of 3,000+ local municipal planning departments.',
      industry: 'CleanTech & Construction SaaS',
      targetMarket: 'United States (Sun Belt & West Coast)',
      targetCustomer: 'Operations Managers and CAD Engineers at regional rooftop solar installation firms',
      budget: '$15,000 - $50,000',
      stage: 'Early Validation & Customer Discovery',
      additionalNotes: 'Permitting delays account for over 30% of customer cancellations in residential clean energy installations.',
    },
  },
  {
    id: 'campus-tutor',
    title: 'StudyLoop: Peer Micro-Tutoring Network',
    badge: 'EdTech & Consumer',
    preview: 'Real-time 15-minute exam cram matchmaking connecting struggling undergrads with top upperclassmen.',
    data: {
      idea: 'A hyper-local campus peer micro-tutoring network where college students stuck on a specific homework problem or coding lab can request an instant 15-minute peer audio/whiteboard sprint with a verified student who aced that exact course section last semester.',
      industry: 'EdTech & Peer Marketplaces',
      targetMarket: 'College Campuses (Large State Universities)',
      targetCustomer: 'STEM Undergraduate Students and Teaching Assistants',
      budget: '$1,000 - $5,000',
      stage: 'Idea Phase',
      additionalNotes: 'Traditional tutoring centers are booked 2 weeks out, whereas students experience distress at 11 PM before deadlines.',
    },
  },
];
