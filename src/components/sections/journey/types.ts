export interface JourneyMilestone {
  readonly year: string;
  readonly title: string;
  readonly role: string;
  readonly description: string;
  readonly location?: string;
  readonly tags?: readonly string[];
  readonly highlights?: readonly string[];
  readonly metrics?: readonly { label: string; value: string }[];
}

export interface JourneyProps {
  readonly className?: string;
  readonly milestones?: ReadonlyArray<JourneyMilestone>;
}

export interface EducationItem {
  readonly degree: string;
  readonly school: string;
  readonly period: string;
  readonly gpa: string;
  readonly courses: readonly string[];
  readonly highlights: readonly string[];
}

export interface CertificationItem {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly credId: string;
  readonly verifyKey: string;
  readonly skills: readonly string[];
}

export interface ActivityItem {
  readonly title: string;
  readonly role: string;
  readonly period: string;
  readonly metrics: readonly { label: string; value: string }[];
  readonly highlights: readonly string[];
  readonly tags: readonly string[];
}

export type SubSectionTab = 'experience' | 'education' | 'certifications' | 'activities';
