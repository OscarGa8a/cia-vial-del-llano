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

/** Valid FAQ categories for the dedicated FAQ page. */
export type FaqCategory =
  | 'Comparendos'
  | 'Cursos'
  | 'Descuentos'
  | 'Pagos'
  | 'Certificados';

/**
 * FAQ entry with a category, used on the dedicated FAQ page.
 * Extends the base Faq interface with category classification.
 */
export interface CategorizedFaq extends Faq {
  /** The category this FAQ belongs to */
  readonly category: FaqCategory;
}
