/** Category letter for a traffic infraction under Colombian law. */
export type InfractionCategory = 'A' | 'B' | 'C' | 'D' | 'E';

/** Type of ticket — issued by an agent or captured electronically. */
export type TicketType = 'manual' | 'fotomulta';

/** Urgency colour for UI feedback. */
export type UrgencyStatus = 'green' | 'yellow' | 'red';

/**
 * A single traffic infraction code defined in the Colombian traffic code.
 * Monetary value is derived at runtime: smdlv × CONFIG.smdlvDaily2026.
 */
export interface Infraction {
  readonly code: string;
  readonly description: string;
  readonly category: InfractionCategory;
  /** Multiplier: how many SMDLV this infraction is worth. */
  readonly smdlv: number;
}

/** One discount tier in the sliding-window schedule. */
export interface DiscountTier {
  /** Business-day range start (inclusive). */
  readonly fromDay: number;
  /** Business-day range end (inclusive). */
  readonly toDay: number;
  /** Discount percentage (0 | 25 | 50). */
  readonly percent: 0 | 25 | 50;
}

/** Full result returned by CalculatorService.calculate(). */
export interface CalculationResult {
  readonly infraction: Infraction;
  /** Base fine in COP. */
  readonly originalValue: number;
  /** Amount saved in COP. */
  readonly discountAmount: number;
  /** Amount to pay in COP. */
  readonly totalToPay: number;
  /** Applied discount percentage (0 | 25 | 50). */
  readonly discountPercent: 0 | 25 | 50;
  /** Business days elapsed since the infraction date. */
  readonly businessDaysElapsed: number;
  /** UI urgency indicator. */
  readonly urgency: UrgencyStatus;
  /** Human-readable deadline message in Spanish. */
  readonly deadlineMessage: string;
}
