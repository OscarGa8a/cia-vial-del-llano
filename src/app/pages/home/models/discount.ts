import { LucideIconData } from "lucide-angular";

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
  tiers: {
    /** Discount percentage value. */
    percent: number;
    /** Display label for the discount tier. */
    label: string;
    /** Time window for applying the discount. */
    days: string;
    /** Tailwind color classes for visual distinction. */
    colorClass: string;
  }[];
  /** Pre-filled WhatsApp message for booking inquiries. */
  whatsappMessage: string;
}
