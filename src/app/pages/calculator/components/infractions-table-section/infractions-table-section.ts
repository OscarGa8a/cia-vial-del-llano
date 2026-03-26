import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { CONFIG } from '@core/data/config.data';
import { INFRACTIONS } from '@core/data/infractions.data';
import { Infraction, InfractionCategory } from '@core/models/infraction.model';
import { Icon } from '@shared/components';
import { SearchIcon } from 'lucide-angular';

/** Category filter option: 'all' or a letter A–E. */
type CategoryFilter = 'all' | InfractionCategory;

/**
 * Displays a searchable and category-filtered table of traffic infractions.
 *
 * @example
 * ```html
 * <app-infractions-table-section
 *   (infractionSelected)="onInfractionSelected($event)" />
 * ```
 */
@Component({
  selector: 'app-infractions-table-section',
  imports: [Icon],
  templateUrl: './infractions-table-section.html',
  styleUrl: './infractions-table-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfractionsTableSection {
  /** Emitted when the user clicks a row to pre-fill the calculator. */
  readonly infractionSelected = output<Infraction>();

  /** Daily SMDLV value used to calculate the displayed fine amount. */
  protected readonly smdlvDaily = CONFIG.smdlvDaily2026;

  /** Lower-cased search term used to filter by code or description. */
  protected readonly searchTerm = signal<string>('');

  /** Active category tab selected by the user. */
  protected readonly activeFilter = signal<CategoryFilter>('all');

  /** Available category filters rendered as tab buttons. */
  protected readonly filterOptions: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'A', label: 'Categoría A' },
    { value: 'B', label: 'Categoría B' },
    { value: 'C', label: 'Categoría C' },
    { value: 'D', label: 'Categoría D' },
    { value: 'E', label: 'Categoría E' },
  ];

  /**
   * Reactive infraction list filtered by the current search term and category.
   * Recomputes automatically whenever `searchTerm` or `activeFilter` changes.
   */
  protected readonly filtered = computed<Infraction[]>(() => {
    const term = this.searchTerm();
    const cat = this.activeFilter();
    return INFRACTIONS.filter((inf) => {
      const matchesTerm =
        !term ||
        inf.code.toLowerCase().includes(term) ||
        inf.description.toLowerCase().includes(term);
      const matchesCat = cat === 'all' || inf.category === cat;
      return matchesTerm && matchesCat;
    });
  });

  /** Icon reference for the search input. */
  protected readonly SearchIcon = SearchIcon;

  /**
   * Updates the search term used by the table filter.
   *
   * @param event - Input event from the search field.
   */
  protected onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(term);
  }

  /**
   * Updates the active category filter.
   *
   * @param cat - Category value selected from filter tabs.
   */
  protected setFilter(cat: CategoryFilter): void {
    this.activeFilter.set(cat);
  }

  /**
   * Emits the selected infraction and scrolls the page to the calculator area.
   *
   * @param inf - Infraction selected from the table.
   */
  protected select(inf: Infraction): void {
    this.infractionSelected.emit(inf);
    // Scroll to top so the user sees the form being filled
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Formats a numeric value as Colombian peso currency.
   *
   * @param value - Amount to format.
   * @returns Currency string in COP format.
   */
  protected formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
