import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import type { FaqCategory } from '@core/models/faq.model';
import type { FaqCategoryMeta } from '@core/data/faq-page.data';
import { ChevronsDownIcon, ChevronsUpIcon, SearchIcon, XIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/**
 * Search and filter controls for the FAQ page.
 *
 * Provides a search input, category filter tabs, and expand/collapse buttons for FAQ items.
 * Acts as a presentational component with all state managed by the parent via inputs/outputs.
 *
 * @example
 * ```typescript
 * <app-search-section
 *   [searchQuery]="searchQuery()"
 *   [activeCategory]="activeCategory()"
 *   [categories]="categories()"
 *   [resultCount]="filteredFaqs().length"
 *   (searchChanged)="searchQuery.set($event)"
 *   (categoryChanged)="activeCategory.set($event)"
 *   (expandAll)="expandAllFaqs()"
 *   (collapseAll)="collapseAllFaqs()" />
 * ```
 */
@Component({
  selector: 'app-search-section',
  imports: [Icon],
  templateUrl: './search-section.html',
  styleUrl: './search-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSection {
  /** Current search query string. */
  readonly searchQuery = model.required<string>();

  /** Currently active category filter, null means all. */
  readonly activeCategory = model.required<FaqCategory | null>();

  /** Available category metadata for rendering tabs. */
  readonly categories = input.required<FaqCategoryMeta[]>();

  /** Number of FAQ results after filtering. */
  readonly resultCount = input.required<number>();

  /** Emits when the user clicks "Expand all". */
  readonly expandAll = output<void>();

  /** Emits when the user clicks "Collapse all". */
  readonly collapseAll = output<void>();

  /** Icon references for template use. */
  protected readonly SearchIcon = SearchIcon;
  protected readonly XIcon = XIcon;
  protected readonly ChevronsDownIcon = ChevronsDownIcon;
  protected readonly ChevronsUpIcon = ChevronsUpIcon;

  /**
   * Handler for search input changes. Emits the new search query string.
   * @param search The updated search query entered by the user.
   */
  protected onSearch(search: string): void {
    this.searchQuery.set(search);
  }

  /**
   * Handler for category tab changes. Emits the selected category or null for "All".
   * @param category The category selected by the user, or null if "All" is selected.
   */
  protected onCategoryChange(category: FaqCategory | null): void {
    this.activeCategory.set(category);
  }

  /**
   * Handler for "Expand all" button click. Emits an event to signal that all FAQ items should be expanded.
   */
  protected onExpandAll(): void {
    this.expandAll.emit();
  }

  /**
   * Handler for "Collapse all" button click. Emits an event to signal that all FAQ items should be collapsed.
   */
  protected onCollapseAll(): void {
    this.collapseAll.emit();
  }
}
