import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { COURSE_FAQS } from '../../../core/data/faqs.data';
import type { Faq } from '../../../core/models/faq.model';

/**
 * FAQ accordion section for the courses page.
 * Uses course-specific FAQs with signal-based toggle.
 * Only one item can be open at a time.
 */
@Component({
  selector: 'app-courses-faq-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="py-20 bg-surface-alt"
      id="preguntas"
      aria-labelledby="courses-faq-heading"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-14">
          <span class="inline-block bg-accent-light text-accent text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Preguntas frecuentes
          </span>
          <h2
            id="courses-faq-heading"
            class="font-sans font-bold text-3xl sm:text-4xl text-text-primary mb-4"
          >
            Preguntas sobre el curso
          </h2>
          <p class="text-text-secondary text-lg max-w-xl mx-auto">
            Resolvemos las dudas más comunes sobre el curso pedagógico
            y el proceso de descuento.
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
                [attr.aria-controls]="'course-faq-answer-' + faq.id"
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
                [id]="'course-faq-answer-' + faq.id"
                class="faq-content"
                [class.open]="openItemId() === faq.id"
                role="region"
                [attr.aria-labelledby]="'course-faq-btn-' + faq.id"
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
      </div>
    </section>
  `,
})
export class CoursesFaqSectionComponent {
  protected readonly faqs: readonly Faq[] = COURSE_FAQS;
  protected readonly openItemId = signal<number | null>(null);

  /** Toggle an FAQ item. If already open, close it. */
  protected toggleItem(id: number): void {
    this.openItemId.update(current => (current === id ? null : id));
  }
}
