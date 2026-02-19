import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import type { FaqCategory } from '@core/models/faq.model';
import type { FaqCategoryMeta } from '@core/data/faq-page.data';

/**
 * Search and filter controls for the FAQ page.
 * Displays a search input, category filter tabs, and expand/collapse controls.
 * All state is managed by the parent FaqPageComponent via inputs/outputs.
 */
@Component({
  selector: 'app-faq-search-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-10 bg-white" aria-label="Buscar y filtrar preguntas frecuentes">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search input -->
        <div class="relative mb-8">
          <label for="faq-search" class="sr-only">Buscar preguntas</label>
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-text-secondary"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            id="faq-search"
            type="search"
            placeholder="Buscar preguntas... ej: descuento, curso, certificado"
            class="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-surface-alt text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors text-base"
            [value]="searchQuery()"
            (input)="searchChanged.emit($any($event.target).value)"
            autocomplete="off"
          />
          @if (searchQuery()) {
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary transition-colors"
              (click)="searchChanged.emit('')"
              aria-label="Limpiar búsqueda"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          }
        </div>

        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtrar por categoría">
          <button
            type="button"
            role="tab"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all"
            [class]="activeCategory() === null
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'"
            [attr.aria-selected]="activeCategory() === null"
            (click)="categoryChanged.emit(null)"
          >
            Todas
          </button>
          @for (cat of categories(); track cat.id) {
            <button
              type="button"
              role="tab"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-1.5"
              [class]="activeCategory() === cat.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'"
              [attr.aria-selected]="activeCategory() === cat.id"
              (click)="categoryChanged.emit(cat.id)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path [attr.d]="cat.iconPath" />
              </svg>
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Expand/Collapse controls -->
        <div class="flex items-center justify-between">
          <p class="text-sm text-text-secondary">
            {{ resultCount() }}
            {{ resultCount() === 1 ? 'pregunta encontrada' : 'preguntas encontradas' }}
          </p>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="text-sm text-primary hover:text-primary-light font-medium transition-colors inline-flex items-center gap-1"
              (click)="expandAll.emit()"
              aria-label="Expandir todas las preguntas"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <polyline points="7 13 12 18 17 13" />
                <polyline points="7 6 12 11 17 6" />
              </svg>
              Expandir todo
            </button>
            <span class="text-border">|</span>
            <button
              type="button"
              class="text-sm text-primary hover:text-primary-light font-medium transition-colors inline-flex items-center gap-1"
              (click)="collapseAll.emit()"
              aria-label="Colapsar todas las preguntas"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <polyline points="17 11 12 6 7 11" />
                <polyline points="17 18 12 13 7 18" />
              </svg>
              Colapsar todo
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FaqSearchSectionComponent {
  /** Current search query string. */
  readonly searchQuery = input.required<string>();

  /** Currently active category filter, null means all. */
  readonly activeCategory = input.required<FaqCategory | null>();

  /** Available category metadata for rendering tabs. */
  readonly categories = input.required<readonly FaqCategoryMeta[]>();

  /** Number of FAQ results after filtering. */
  readonly resultCount = input.required<number>();

  /** Emits when the search query changes. */
  readonly searchChanged = output<string>();

  /** Emits when the active category filter changes. */
  readonly categoryChanged = output<FaqCategory | null>();

  /** Emits when the user clicks "Expand all". */
  readonly expandAll = output<void>();

  /** Emits when the user clicks "Collapse all". */
  readonly collapseAll = output<void>();
}
