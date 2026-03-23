import { LucideIconData } from 'lucide-angular';

/**
 * Configuration for a single step in the course enrollment process.
 */
export interface Step {
  /** Sequential step number displayed in the UI. */
  readonly number: number;
  /** Emoji icon representing the step action. */
  readonly icon: LucideIconData;
  /** Display title of the step. */
  readonly title: string;
  /** Brief description of what happens in this step. */
  readonly description: string;
  /** Tailwind gradient class for visual distinction. */
  readonly gradientClass: string;
}
