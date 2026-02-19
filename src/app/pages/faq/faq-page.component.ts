import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { FaqCategory, CategorizedFaq } from '@core/models/faq.model';
import { FAQ_CATEGORIES, FAQ_PAGE_DATA } from '@core/data/faq-page.data';
import { FaqHeroSectionComponent } from './components/hero-section.component';
import { FaqSearchSectionComponent } from './components/search-section.component';
import { FaqContentSectionComponent } from './components/faq-content-section.component';
import type { FaqGroup } from './components/faq-content-section.component';
import { FaqContactCtaSectionComponent } from './components/contact-cta-section.component';
import { FaqQuickLinksSectionComponent } from './components/quick-links-section.component';
import { FaqFinalCtaSectionComponent } from './components/final-cta-section.component';

/**
 * FAQ page — dedicated Preguntas Frecuentes page.
 * Orchestrates all section components and manages search/filter state.
 *
 * State signals:
 * - searchQuery: user's text search input
 * - activeCategory: selected category tab (null = all)
 * - openItemIds: set of currently open FAQ accordion items
 *
 * Computed:
 * - filteredFaqs: FAQs filtered by search + category
 * - groupedFaqs: filtered FAQs grouped by category with metadata
 */
@Component({
  selector: 'app-faq-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FaqHeroSectionComponent,
    FaqSearchSectionComponent,
    FaqContentSectionComponent,
    FaqContactCtaSectionComponent,
    FaqQuickLinksSectionComponent,
    FaqFinalCtaSectionComponent,
  ],
  template: `
    <app-faq-hero-section />

    <app-faq-search-section
      [searchQuery]="searchQuery()"
      [activeCategory]="activeCategory()"
      [categories]="categories"
      [resultCount]="filteredFaqs().length"
      (searchChanged)="onSearchChanged($event)"
      (categoryChanged)="onCategoryChanged($event)"
      (expandAll)="onExpandAll()"
      (collapseAll)="onCollapseAll()"
    />

    <app-faq-content-section
      [filteredFaqs]="filteredFaqs()"
      [groupedFaqs]="groupedFaqs()"
      [openItemIds]="openItemIds()"
      (toggleItem)="onToggleItem($event)"
    />

    <app-faq-contact-cta-section />
    <app-faq-quick-links-section />
    <app-faq-final-cta-section />
  `,
})
export class FaqPageComponent {
  /** All available FAQ categories with display metadata. */
  protected readonly categories = FAQ_CATEGORIES;

  /** All FAQ data. */
  private readonly allFaqs: readonly CategorizedFaq[] = FAQ_PAGE_DATA;

  // ── State signals ───────────────────────────────────────────

  /** Current search query text. */
  protected readonly searchQuery = signal('');

  /** Currently selected category filter (null = show all). */
  protected readonly activeCategory = signal<FaqCategory | null>(null);

  /** Set of FAQ IDs whose accordion panels are currently open. */
  protected readonly openItemIds = signal<ReadonlySet<number>>(new Set());

  // ── Computed ────────────────────────────────────────────────

  /** FAQs filtered by active category and search query. */
  protected readonly filteredFaqs = computed<readonly CategorizedFaq[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.activeCategory();

    let result = this.allFaqs;

    if (category) {
      result = result.filter((faq) => faq.category === category);
    }

    if (query) {
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query),
      );
    }

    return result;
  });

  /** Filtered FAQs grouped by category with their metadata. */
  protected readonly groupedFaqs = computed<readonly FaqGroup[]>(() => {
    const faqs = this.filteredFaqs();
    const groups: FaqGroup[] = [];

    for (const catMeta of FAQ_CATEGORIES) {
      const categoryFaqs = faqs.filter((faq) => faq.category === catMeta.id);
      if (categoryFaqs.length > 0) {
        groups.push({ category: catMeta, faqs: categoryFaqs });
      }
    }

    return groups;
  });

  // ── Event handlers ──────────────────────────────────────────

  /** Updates the search query signal. */
  protected onSearchChanged(query: string): void {
    this.searchQuery.set(query);
  }

  /** Updates the active category filter. */
  protected onCategoryChanged(category: FaqCategory | null): void {
    this.activeCategory.set(category);
  }

  /** Toggles a single FAQ item's open/closed state. */
  protected onToggleItem(id: number): void {
    this.openItemIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  /** Opens all currently visible FAQ items. */
  protected onExpandAll(): void {
    const ids = new Set(this.filteredFaqs().map((faq) => faq.id));
    this.openItemIds.set(ids);
  }

  /** Closes all FAQ items. */
  protected onCollapseAll(): void {
    this.openItemIds.set(new Set());
  }
}
