/**
 * Represents a frequently asked question entry.
 */
export interface Faq {
  readonly id: number;
  /** The question text */
  readonly question: string;
  /** The answer text (may contain simple HTML) */
  readonly answer: string;
}
