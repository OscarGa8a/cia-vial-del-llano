import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import type { CategorizedFaq, FaqCategory } from '@core/models/faq.model';
import type { FaqCategoryMeta } from '@core/data/faq-page.data';

/**
 * Grouped FAQ content display. Each FAQ category gets a header
 * and its questions are shown as an accordion.
 * Multiple items can be open simultaneously.
 * Uses [innerHTML] for rich HTML answers.
 */
@Component({
  selector: 'app-faq-content-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 bg-white" aria-label="Preguntas frecuentes">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        @if (filteredFaqs().length === 0) {
          <!-- Empty state -->
          <div class="text-center py-16">
            <div
              class="w-20 h-20 mx-auto rounded-full bg-surface-alt flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="text-text-secondary"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h3 class="font-sans font-semibold text-xl text-text-primary mb-2">
              No encontramos resultados
            </h3>
            <p class="text-text-secondary max-w-md mx-auto">
              Intenta con otros términos de búsqueda o selecciona otra categoría.
              También puedes contactarnos por WhatsApp.
            </p>
          </div>
        } @else {
          <!-- Grouped FAQ accordion -->
          @for (group of groupedFaqs(); track group.category.id) {
            <div class="mb-10 last:mb-0">
              <!-- Category header -->
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center"
                  [class]="group.category.colorClass"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    [class]="group.category.textColorClass"
                    aria-hidden="true"
                  >
                    <path [attr.d]="group.category.iconPath" />
                  </svg>
                </div>
                <div>
                  <h2 class="font-sans font-bold text-lg text-text-primary">
                    {{ group.category.label }}
                  </h2>
                  <p class="text-xs text-text-secondary">
                    {{ group.faqs.length }} {{ group.faqs.length === 1 ? 'pregunta' : 'preguntas' }}
                  </p>
                </div>
              </div>

              <!-- FAQ items -->
              <div class="flex flex-col gap-3" role="list">
                @for (faq of group.faqs; track faq.id) {
                  <div
                    class="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                    role="listitem"
                  >
                    <button
                      type="button"
                      class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
                      (click)="toggleItem.emit(faq.id)"
                      [attr.aria-expanded]="openItemIds().has(faq.id)"
                      [attr.aria-controls]="'faq-panel-' + faq.id"
                    >
                      <span class="font-semibold text-text-primary text-sm sm:text-base leading-snug">
                        {{ faq.question }}
                      </span>
                      <!-- Chevron -->
                      <span
                        class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform duration-300"
                        [class.rotate-180]="openItemIds().has(faq.id)"
                        [class.bg-primary-lighter]="openItemIds().has(faq.id)"
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          [class.text-primary]="openItemIds().has(faq.id)"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    <!-- Answer panel (CSS grid animation) -->
                    <div
                      [id]="'faq-panel-' + faq.id"
                      class="faq-content"
                      [class.open]="openItemIds().has(faq.id)"
                      role="region"
                      [attr.aria-labelledby]="'faq-btn-' + faq.id"
                    >
                      <div>
                        <div
                          class="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border pt-4"
                          [innerHTML]="faq.answer"
                        ></div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        }
      </div>
    </section>
  `,
})
export class FaqContentSectionComponent {
  /** All filtered FAQs (already filtered by parent). */
  readonly filteredFaqs = input.required<readonly CategorizedFaq[]>();

  /** Grouped FAQs with their category metadata. */
  readonly groupedFaqs = input.required<readonly FaqGroup[]>();

  /** Set of currently open FAQ item IDs. */
  readonly openItemIds = input.required<ReadonlySet<number>>();

  /** Emits an FAQ id to toggle its open state. */
  readonly toggleItem = output<number>();
}

/**
 * Represents a group of FAQs under a single category,
 * paired with their category display metadata.
 */
export interface FaqGroup {
  readonly category: FaqCategoryMeta;
  readonly faqs: readonly CategorizedFaq[];
}
