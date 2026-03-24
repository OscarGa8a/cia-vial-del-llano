import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { COURSE_FAQS } from '@core/data/faqs.data';
import { Faq } from '@core/models/faq.model';
import { Icon } from '@shared/components';
import { ChevronDownIcon } from 'lucide-angular';

/**
 * FAQ accordion section for the courses page.
 * Uses course-specific FAQs with signal-based toggle.
 * Only one item can be open at a time.
 */
@Component({
  selector: 'app-faq-section',
  imports: [Icon],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSection {
  protected readonly faqs: readonly Faq[] = COURSE_FAQS;
  protected readonly openItemId = signal<number | null>(null);

  /* Icon for indicating expandable FAQ items. */
  protected readonly ChevronDownIcon = ChevronDownIcon;

  /** Toggle an FAQ item. If already open, close it. */
  protected toggleItem(id: number): void {
    this.openItemId.update((current) => (current === id ? null : id));
  }
}
