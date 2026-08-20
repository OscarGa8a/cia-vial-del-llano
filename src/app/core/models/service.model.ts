import type { LucideIconData } from 'lucide-angular';

export const SERVICE_IDS = {
  COURSES: 'courses',
  LICENSE_RENEWAL: 'license-renewal',
  MEDICAL_EXAMS: 'medical-exams',
} as const;

export type ServiceId = (typeof SERVICE_IDS)[keyof typeof SERVICE_IDS];

export interface ServiceOrientationCard {
  readonly title: string;
  readonly description: string;
}

export interface ServiceTimelineStep {
  readonly title: string;
  readonly description: string;
}

export interface ServiceFaq {
  readonly question: string;
  readonly answer: string;
}

export interface Service {
  readonly id: ServiceId;
  readonly title: string;
  readonly description: string;
  readonly route: string;
  readonly whatsappMessage: string;
  readonly icon: LucideIconData;
  readonly orientationTitle: string;
  readonly orientationCards: readonly ServiceOrientationCard[];
  readonly preparationChecklist: readonly string[];
  readonly timeline: readonly ServiceTimelineStep[];
  readonly faqs: readonly ServiceFaq[];
}
