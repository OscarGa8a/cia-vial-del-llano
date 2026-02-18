/**
 * Represents a customer testimonial.
 */
export interface Testimonial {
  readonly id: number;
  /** Customer full name */
  readonly name: string;
  /** Customer role or vehicle type */
  readonly role: string;
  /** City or municipality */
  readonly location: string;
  /** Testimonial quote text */
  readonly quote: string;
  /** Star rating from 1 to 5 */
  readonly rating: number;
  /** Two-letter initials for the avatar circle */
  readonly initials: string;
  /** Background color class for avatar (Tailwind) */
  readonly avatarColor: string;
}
