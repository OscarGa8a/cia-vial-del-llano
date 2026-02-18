import { Injectable } from '@angular/core';
import type {
  CalculationResult,
  DiscountTier,
  Infraction,
  TicketType,
  UrgencyStatus,
} from '../models/infraction.model';
import { CONFIG } from '../data/config.data';

/** Discount schedule for a comparendo manual (agent-issued ticket). */
const MANUAL_TIERS: readonly DiscountTier[] = [
  { fromDay: 0, toDay: 5, percent: 50 },
  { fromDay: 6, toDay: 20, percent: 25 },
  { fromDay: 21, toDay: Infinity, percent: 0 },
] as const;

/** Discount schedule for a fotomulta (electronically captured). */
const PHOTO_TIERS: readonly DiscountTier[] = [
  { fromDay: 0, toDay: 11, percent: 50 },
  { fromDay: 12, toDay: 26, percent: 25 },
  { fromDay: 27, toDay: Infinity, percent: 0 },
] as const;

/**
 * Pure logic service for traffic-fine calculations.
 * No browser APIs — fully SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class CalculatorService {
  /**
   * Counts the number of business days (Mon–Fri) between two dates.
   * The start date itself is NOT counted; only days strictly after it are.
   * @param from - The infraction date (day 0).
   * @param to   - The reference date (typically today).
   * @returns Number of business days elapsed.
   */
  countBusinessDays(from: Date, to: Date): number {
    let count = 0;
    const cursor = new Date(from);
    // Move to next day to exclude start date
    cursor.setDate(cursor.getDate() + 1);

    while (cursor <= to) {
      const dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        count++;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return count;
  }

  /**
   * Adds a given number of business days to a start date.
   * Useful for showing deadline dates.
   * @param from  - Start date.
   * @param days  - Business days to add.
   * @returns New date that is `days` business days after `from`.
   */
  addBusinessDays(from: Date, days: number): Date {
    const result = new Date(from);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dow = result.getDay();
      if (dow !== 0 && dow !== 6) {
        added++;
      }
    }
    return result;
  }

  /**
   * Looks up the applicable discount tier for a given elapsed day count.
   * @param elapsed    - Business days elapsed since the infraction.
   * @param ticketType - Whether the ticket was manual or a fotomulta.
   */
  getDiscountTier(elapsed: number, ticketType: TicketType): DiscountTier {
    const tiers = ticketType === 'manual' ? MANUAL_TIERS : PHOTO_TIERS;
    return (
      tiers.find((t) => elapsed >= t.fromDay && elapsed <= t.toDay) ??
      tiers[tiers.length - 1]
    );
  }

  /**
   * Derives the urgency status based on elapsed days and ticket type.
   * - green  → plenty of time for the current tier
   * - yellow → close to a tier boundary
   * - red    → expired or very close to expiry
   */
  getUrgency(elapsed: number, ticketType: TicketType): UrgencyStatus {
    if (ticketType === 'manual') {
      if (elapsed <= 2) return 'green';
      if (elapsed <= 5) return 'yellow';
      if (elapsed <= 15) return 'yellow';
      if (elapsed <= 20) return 'red';
      return 'red';
    }
    // fotomulta
    if (elapsed <= 5) return 'green';
    if (elapsed <= 11) return 'yellow';
    if (elapsed <= 20) return 'yellow';
    if (elapsed <= 26) return 'red';
    return 'red';
  }

  /**
   * Builds a human-readable deadline message in Spanish.
   * @param elapsed    - Business days elapsed.
   * @param ticketType - Ticket type.
   * @param infractionDate - Original infraction date.
   */
  buildDeadlineMessage(
    elapsed: number,
    ticketType: TicketType,
    infractionDate: Date
  ): string {
    const tier = this.getDiscountTier(elapsed, ticketType);

    if (tier.percent === 0) {
      return 'El plazo de descuento ha vencido. Debes pagar el 100% más intereses.';
    }

    const remainingDays = tier.toDay - elapsed;
    const deadline = this.addBusinessDays(infractionDate, tier.toDay);
    const deadlineStr = deadline.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (remainingDays <= 3) {
      return `¡Urgente! Solo te quedan ${remainingDays} día(s) hábil(es) para el ${tier.percent}% de descuento (hasta el ${deadlineStr}).`;
    }

    return `Tienes ${remainingDays} día(s) hábil(es) para aprovechar el ${tier.percent}% de descuento (hasta el ${deadlineStr}).`;
  }

  /**
   * Formats a number as Colombian Peso currency string.
   * @param value - Amount in COP.
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  /**
   * Main calculation entry point. Returns a complete CalculationResult.
   * @param infraction     - The selected infraction.
   * @param ticketType     - Manual or fotomulta.
   * @param infractionDate - The date shown on the ticket.
   * @param today          - Reference date (defaults to now; injectable for testing).
   */
  calculate(
    infraction: Infraction,
    ticketType: TicketType,
    infractionDate: Date,
    today: Date = new Date()
  ): CalculationResult {
    const originalValue = infraction.smdlv * CONFIG.smdlvDaily2025;
    const businessDaysElapsed = this.countBusinessDays(infractionDate, today);
    const tier = this.getDiscountTier(businessDaysElapsed, ticketType);
    const discountAmount = Math.round(originalValue * (tier.percent / 100));
    const totalToPay = originalValue - discountAmount;
    const urgency = this.getUrgency(businessDaysElapsed, ticketType);
    const deadlineMessage = this.buildDeadlineMessage(
      businessDaysElapsed,
      ticketType,
      infractionDate
    );

    return {
      infraction,
      originalValue,
      discountAmount,
      totalToPay,
      discountPercent: tier.percent,
      businessDaysElapsed,
      urgency,
      deadlineMessage,
    };
  }
}
