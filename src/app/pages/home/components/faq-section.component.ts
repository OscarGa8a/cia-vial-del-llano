import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS } from '../../../core/data/faqs.data';
import type { Faq } from '../../../core/models/faq.model';

/**
 * FAQ accordion section with CSS-grid-based smooth open/close animation.
 * Only one item can be open at a time.
 */
@Component({
  selector: 'app-faq-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section
      class="py-20 bg-surface-alt"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-accent-light text-accent text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            Resolvemos tus dudas
          </h2>
          <p class="text-text-secondary text-lg max-w-xl mx-auto">
            Las preguntas más comunes de nuestros clientes.
          </p>
        </div>

        <!-- Accordion -->
        <div class="flex flex-col gap-3" role="list">
          @for (faq of faqs; track faq.id) {
            <div
              class="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
              role="listitem"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
                (click)="toggleItem(faq.id)"
                [attr.aria-expanded]="openItemId() === faq.id"
                [attr.aria-controls]="'faq-answer-' + faq.id"
              >
                <span class="font-semibold text-text-primary text-sm sm:text-base leading-snug">
                  {{ faq.question }}
                </span>
                <!-- Chevron -->
                <span
                  class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-transform duration-300"
                  [class.rotate-180]="openItemId() === faq.id"
                  [class.bg-primary-lighter]="openItemId() === faq.id"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" [class.text-primary]="openItemId() === faq.id">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>

              <!-- Answer panel -->
              <div
                [id]="'faq-answer-' + faq.id"
                class="faq-content"
                [class.open]="openItemId() === faq.id"
                role="region"
                [attr.aria-labelledby]="'faq-btn-' + faq.id"
              >
                <div>
                  <p class="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border pt-4">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Link to full FAQ page -->
        <div class="mt-10 text-center">
          <a
            routerLink="/preguntas-frecuentes"
            class="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold text-sm transition-colors hover:underline"
            aria-label="Ver todas las preguntas frecuentes"
          >
            Ver todas las preguntas frecuentes
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class FaqSectionComponent {
  protected readonly faqs: readonly Faq[] = FAQS;
  protected readonly openItemId = signal<number | null>(null);

  protected toggleItem(id: number): void {
    this.openItemId.update(current => (current === id ? null : id));
  }
}
