import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FaqCategoryMeta } from '@core/data/faq-page.data';
import { CategorizedFaq } from '@core/models/faq.model';
import { Icon } from '@shared/components';
import { ChevronDownIcon, NotepadTextIcon, SearchXIcon } from 'lucide-angular';

/**
 * Represents a group of FAQs under a single category,
 * paired with their category display metadata.
 */
export interface FaqGroup {
  readonly category: FaqCategoryMeta;
  readonly faqs: CategorizedFaq[];
}

/**
 * Grouped FAQ content display. Each FAQ category gets a header
 * and its questions are shown as an accordion.
 * Multiple items can be open simultaneously.
 * Uses [innerHTML] for rich HTML answers.
 */
@Component({
  selector: 'app-faq-content-section',
  imports: [Icon],
  templateUrl: './faq-content-section.html',
  styleUrl: './faq-content-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqContentSection {
  /** All filtered FAQs (already filtered by parent). */
  readonly filteredFaqs = input.required<CategorizedFaq[]>();

  /** Grouped FAQs with their category metadata. */
  readonly groupedFaqs = input.required<FaqGroup[]>();

  /** Set of currently open FAQ item IDs. */
  readonly openItemIds = input.required<ReadonlySet<number>>();

  /** Emits an FAQ id to toggle its open state. */
  readonly toggleItem = output<number>();

  /** Icon references for template use. */
  protected readonly NotepadTextIcon = NotepadTextIcon;
  protected readonly SearchXIcon = SearchXIcon;
  protected readonly ChevronDownIcon = ChevronDownIcon;
}
