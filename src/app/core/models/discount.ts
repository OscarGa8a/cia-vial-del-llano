import { LucideIconData } from 'lucide-angular';

/**
 * Configuration for a discount tier card displaying fine reduction percentages.
 */
export interface DiscountCard {
  /** Unique identifier for the discount card. */
  id: string;
  /** Emoji icon representing the ticket type. */
  icon: LucideIconData;
  /** Display title of the fine type. */
  title: string;
  /** Brief description of the fine classification. */
  subtitle: string;
  /** Tailwind gradient class for visual styling. */
  gradientClass: string;
  /** Discount tiers available for this fine type. */
  tiers: DiscountTier[];
  /** Pre-filled WhatsApp message for booking inquiries. */
  whatsappMessage: string;
}

/**
 * Represents a single discount tier within a discount card.
 */
interface DiscountTier {
  /** Discount percentage applied for the tier. */
  readonly percent: number;
  /** User-facing label describing the discount condition. */
  readonly label: string;
  /** Time window text associated with the discount tier. */
  readonly days: string;
  /** Tailwind color utility classes used to style the tier badge. */
  readonly colorClass: string;
}
