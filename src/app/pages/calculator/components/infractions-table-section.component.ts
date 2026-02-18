import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { INFRACTIONS } from '../../../core/data/infractions.data';
import { CONFIG } from '../../../core/data/config.data';
import type { Infraction, InfractionCategory } from '../../../core/models/infraction.model';

/** Category filter option: 'all' or a letter A–E. */
type CategoryFilter = 'all' | InfractionCategory;

/**
 * Searchable and filterable table of all traffic infractions.
 * Emits `infractionSelected` when a row is clicked so the orchestrator
 * can pass it to the calculator form.
 */
@Component({
  selector: 'app-infractions-table-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20 bg-white" aria-labelledby="table-heading">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-10">
          <h2
            id="table-heading"
            class="font-sans font-bold text-3xl text-primary mb-2"
          >
            Tabla de Infracciones de Tránsito
          </h2>
          <p class="text-gray-500">
            Busca tu código y haz clic en la fila para calcular automáticamente
          </p>
        </div>

        <!-- Filters bar -->
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <!-- Search -->
          <div class="relative w-full md:w-96">
            <label for="infraction-search" class="sr-only">
              Buscar infracción por código o descripción
            </label>
            <input
              id="infraction-search"
              type="search"
              [value]="searchTerm()"
              (input)="onSearch($event)"
              placeholder="Buscar por código (ej: C02) o descripción…"
              class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
            <svg
              class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Category tabs -->
          <div
            class="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto"
            role="group"
            aria-label="Filtrar por categoría"
          >
            @for (cat of filterOptions; track cat.value) {
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
                [class.bg-primary]="activeFilter() === cat.value"
                [class.text-white]="activeFilter() === cat.value"
                [class.bg-gray-100]="activeFilter() !== cat.value"
                [class.text-gray-600]="activeFilter() !== cat.value"
                [class.hover:bg-gray-200]="activeFilter() !== cat.value"
                (click)="setFilter(cat.value)"
                [attr.aria-pressed]="activeFilter() === cat.value"
              >
                {{ cat.label }}
              </button>
            }
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table class="w-full text-left text-sm" aria-label="Infracciones de tránsito">
            <thead class="bg-gray-50 text-gray-700 font-bold uppercase tracking-wider">
              <tr>
                <th scope="col" class="p-4">Código</th>
                <th scope="col" class="p-4">Descripción</th>
                <th scope="col" class="p-4 text-center">Cat.</th>
                <th scope="col" class="p-4 text-right">Valor 2025</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (inf of filtered(); track inf.code) {
                <tr
                  class="hover:bg-primary-lighter cursor-pointer transition-colors group"
                  (click)="select(inf)"
                  (keydown.enter)="select(inf)"
                  (keydown.space)="select(inf)"
                  tabindex="0"
                  role="button"
                  [attr.aria-label]="'Seleccionar infracción ' + inf.code + ': ' + inf.description"
                >
                  <td class="p-4 font-bold text-primary group-hover:text-accent">
                    {{ inf.code }}
                  </td>
                  <td class="p-4 text-gray-600">{{ inf.description }}</td>
                  <td class="p-4 text-center">
                    <span
                      class="px-2 py-1 rounded text-xs font-bold"
                      [class.bg-success-light]="inf.category === 'A'"
                      [class.text-success]="inf.category === 'A'"
                      [class.bg-info-light]="inf.category === 'B'"
                      [class.text-info]="inf.category === 'B'"
                      [class.bg-warning-light]="inf.category === 'C'"
                      [class.text-warning]="inf.category === 'C'"
                      [class.bg-highlight-light]="inf.category === 'D'"
                      [class.text-highlight-hover]="inf.category === 'D'"
                      [class.bg-error-light]="inf.category === 'E'"
                      [class.text-error]="inf.category === 'E'"
                    >
                      {{ inf.category }}
                    </span>
                  </td>
                  <td class="p-4 text-right font-medium">
                    {{ formatCOP(inf.smdlv * smdlvDaily) }}
                  </td>
                </tr>
              }
              @empty {
                <tr>
                  <td colspan="4" class="p-8 text-center text-gray-500">
                    No se encontraron infracciones con ese criterio.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
})
export class InfractionsTableSectionComponent {
  /** Emitted when the user clicks a row to pre-fill the calculator. */
  readonly infractionSelected = output<Infraction>();

  protected readonly smdlvDaily = CONFIG.smdlvDaily2025;

  protected readonly searchTerm = signal('');
  protected readonly activeFilter = signal<CategoryFilter>('all');

  protected readonly filterOptions: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'A', label: 'Categoría A' },
    { value: 'B', label: 'Categoría B' },
    { value: 'C', label: 'Categoría C' },
    { value: 'D', label: 'Categoría D' },
    { value: 'E', label: 'Categoría E' },
  ];

  /** Filtered list based on search + category. */
  protected readonly filtered = signal<readonly Infraction[]>(INFRACTIONS);

  protected onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(term);
    this.applyFilters(term, this.activeFilter());
  }

  protected setFilter(cat: CategoryFilter): void {
    this.activeFilter.set(cat);
    this.applyFilters(this.searchTerm(), cat);
  }

  protected select(inf: Infraction): void {
    this.infractionSelected.emit(inf);
    // Scroll to top so the user sees the form being filled
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  private applyFilters(term: string, cat: CategoryFilter): void {
    this.filtered.set(
      INFRACTIONS.filter((inf) => {
        const matchesTerm =
          !term ||
          inf.code.toLowerCase().includes(term) ||
          inf.description.toLowerCase().includes(term);
        const matchesCat = cat === 'all' || inf.category === cat;
        return matchesTerm && matchesCat;
      })
    );
  }
}
