import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS } from '@core/data/faqs.data';
import { Faq } from '@core/models/faq.model';
import { Icon } from '@shared/components';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-angular';

/**
 * Accordion-style FAQ section with expandable question-answer pairs.
 *
 * Displays a list of frequently asked questions with single-item expansion behavior.
 * Only one FAQ item can be open at a time, and users can toggle items to view answers.
 *
 * @example
 * ```typescript
 * <app-faq-section />
 * ```
 */
@Component({
  selector: 'app-faq-section',
  imports: [Icon, RouterLink],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSection {
  /** Collection of FAQ items loaded from application data. */
  protected readonly faqs: readonly Faq[] = FAQS;

  /**
   * Signal tracking the currently open FAQ item.
   *
   * Stores the ID of the expanded item, or null if no item is open.
   * Updates when users toggle items to enforce single-open behavior.
   */
  protected readonly openItemId = signal<number | null>(null);

  /* Icon for indicating expandable FAQ items. */
  protected readonly ChevronDownIcon = ChevronDownIcon;

  /* Icon for indicating expandable FAQ items. */
  protected readonly ArrowRightIcon = ArrowRightIcon;

  /**
   * Toggles the expansion state of a FAQ item.
   *
   * If the clicked item is already open, closes it. Otherwise, opens the new item
   * and closes any previously open item, ensuring only one item is expanded at a time.
   *
   * @param id - ID of the FAQ item to toggle
   */
  protected toggleItem(id: number): void {
    this.openItemId.update((current) => (current === id ? null : id));
  }
}
