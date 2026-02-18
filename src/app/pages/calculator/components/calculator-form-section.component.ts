import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INFRACTIONS } from '../../../core/data/infractions.data';
import { CONFIG } from '../../../core/data/config.data';
import type {
  CalculationResult,
  Infraction,
  InfractionCategory,
} from '../../../core/models/infraction.model';
import { CalculatorService } from '../../../core/services/calculator.service';
import { Whatsapp } from '@core/services/whatsapp';

/** Groups infractions by their category letter for the <select> optgroup. */
interface CategoryGroup {
  readonly label: string;
  readonly infractions: readonly Infraction[];
}

/**
 * Main calculator form + results panel.
 * Accepts an optional `preSelected` infraction (from table click) and emits
 * `calculated` whenever a new result is ready.
 */
@Component({
  selector: 'app-calculator-form-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section class="py-4 -mt-4 bg-white" aria-labelledby="calc-form-heading">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 grid lg:grid-cols-12"
        >
          <!-- ===== LEFT: Form ===== -->
          <div class="lg:col-span-7 p-6 md:p-10 border-r border-gray-100">
            <div class="flex items-center gap-3 mb-8">
              <div class="bg-primary p-2 rounded-lg text-white" aria-hidden="true">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 id="calc-form-heading" class="font-sans font-bold text-2xl text-primary">
                Calcula tu descuento
              </h2>
            </div>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6" novalidate>
              <!-- Ticket type -->
              <fieldset>
                <legend class="block text-sm font-bold text-gray-700 mb-3">
                  Tipo de Comparendo
                </legend>
                <div class="grid grid-cols-2 gap-4" role="radiogroup">
                  <!-- Manual -->
                  <label
                    class="cursor-pointer"
                    [class.ring-2]="form.get('ticketType')?.value === 'manual'"
                    [class.ring-primary]="form.get('ticketType')?.value === 'manual'"
                  >
                    <input
                      type="radio"
                      formControlName="ticketType"
                      value="manual"
                      class="sr-only"
                    />
                    <div
                      class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 hover:bg-gray-50"
                      [class.border-primary]="form.get('ticketType')?.value === 'manual'"
                      [class.bg-primary-lighter]="form.get('ticketType')?.value === 'manual'"
                      [class.border-gray-200]="form.get('ticketType')?.value !== 'manual'"
                    >
                      <svg
                        class="w-6 h-6"
                        [class.text-primary]="form.get('ticketType')?.value === 'manual'"
                        [class.text-gray-400]="form.get('ticketType')?.value !== 'manual'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span
                        class="font-bold text-sm"
                        [class.text-primary]="form.get('ticketType')?.value === 'manual'"
                        [class.text-gray-700]="form.get('ticketType')?.value !== 'manual'"
                        >Manual (Agente)</span
                      >
                    </div>
                  </label>

                  <!-- Fotomulta -->
                  <label
                    class="cursor-pointer"
                    [class.ring-2]="form.get('ticketType')?.value === 'fotomulta'"
                    [class.ring-accent]="form.get('ticketType')?.value === 'fotomulta'"
                  >
                    <input
                      type="radio"
                      formControlName="ticketType"
                      value="fotomulta"
                      class="sr-only"
                    />
                    <div
                      class="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 hover:bg-gray-50"
                      [class.border-accent]="form.get('ticketType')?.value === 'fotomulta'"
                      [class.bg-accent-light]="form.get('ticketType')?.value === 'fotomulta'"
                      [class.border-gray-200]="form.get('ticketType')?.value !== 'fotomulta'"
                    >
                      <svg
                        class="w-6 h-6"
                        [class.text-accent]="form.get('ticketType')?.value === 'fotomulta'"
                        [class.text-gray-400]="form.get('ticketType')?.value !== 'fotomulta'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                      </svg>
                      <span
                        class="font-bold text-sm"
                        [class.text-accent]="form.get('ticketType')?.value === 'fotomulta'"
                        [class.text-gray-700]="form.get('ticketType')?.value !== 'fotomulta'"
                        >Fotomulta</span
                      >
                    </div>
                  </label>
                </div>
              </fieldset>

              <!-- Infraction code -->
              <div>
                <label for="infractionCode" class="block text-sm font-bold text-gray-700 mb-2">
                  Código de la Infracción
                </label>
                <select
                  id="infractionCode"
                  formControlName="infractionCode"
                  class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium text-gray-700"
                  [class.border-error]="codeInvalid()"
                  aria-required="true"
                  [attr.aria-invalid]="codeInvalid()"
                >
                  <option value="">Selecciona una infracción...</option>
                  @for (group of categoryGroups; track group.label) {
                    <optgroup [label]="group.label">
                      @for (inf of group.infractions; track inf.code) {
                        <option [value]="inf.code">{{ inf.code }} — {{ inf.description }}</option>
                      }
                    </optgroup>
                  }
                </select>
                @if (codeInvalid()) {
                  <p class="text-error text-xs mt-1" role="alert">
                    Selecciona una infracción para continuar.
                  </p>
                }
                <p class="text-xs text-gray-400 mt-2">
                  ¿No conoces el código? Búscalo en la tabla de infracciones más abajo.
                </p>
              </div>

              <!-- Date -->
              <div>
                <label for="infractionDate" class="block text-sm font-bold text-gray-700 mb-2">
                  Fecha del Comparendo
                </label>
                <div class="relative">
                  <input
                    type="date"
                    id="infractionDate"
                    formControlName="infractionDate"
                    class="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium"
                    [class.border-error]="dateInvalid()"
                    aria-required="true"
                    [attr.aria-invalid]="dateInvalid()"
                    [max]="todayIso"
                  />
                  <svg
                    class="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                @if (dateInvalid()) {
                  <p class="text-error text-xs mt-1" role="alert">
                    Ingresa una fecha válida (no puede ser futura).
                  </p>
                }
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 group"
                [class.opacity-60]="form.invalid && form.touched"
              >
                <span>Calcular mi descuento</span>
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>

          <!-- ===== RIGHT: Results panel ===== -->
          <div
            class="lg:col-span-5 bg-gray-50 p-6 md:p-10 flex flex-col justify-center min-h-96"
            aria-live="polite"
            aria-atomic="true"
          >
            @if (!result()) {
              <!-- Empty state -->
              <div class="text-center opacity-60">
                <div
                  class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
                  aria-hidden="true"
                >
                  <svg
                    class="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-700 mb-1">Esperando datos…</h3>
                <p class="text-gray-500 text-sm">
                  Completa el formulario para ver cuánto te ahorras.
                </p>
              </div>
            } @else {
              <!-- Results -->
              <div class="space-y-5">
                <!-- Header row -->
                <div class="flex justify-between items-start border-b border-gray-200 pb-4">
                  <div>
                    <span
                      class="inline-block px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded mb-1"
                    >
                      {{ result()!.infraction.code }}
                    </span>
                    <h3 class="font-bold text-primary leading-tight text-sm">
                      {{ result()!.infraction.description }}
                    </h3>
                  </div>
                  <div class="text-right shrink-0 ml-3">
                    <p class="text-xs text-gray-500">Valor Original</p>
                    <p class="text-gray-400 line-through font-medium text-sm">
                      {{ formatCOP(result()!.originalValue) }}
                    </p>
                  </div>
                </div>

                @if (result()!.discountPercent > 0) {
                  <!-- Discount banner -->
                  <div
                    class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div
                      class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                      [class.bg-success]="result()!.discountPercent === 50"
                      [class.bg-warning]="result()!.discountPercent === 25"
                      aria-hidden="true"
                    >
                      -{{ result()!.discountPercent }}%
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 font-medium">¡Descuento aplicado!</p>
                      <p class="text-success font-bold text-lg">
                        Ahorras {{ formatCOP(result()!.discountAmount) }}
                      </p>
                    </div>
                  </div>
                } @else {
                  <!-- No-discount banner -->
                  <div class="bg-error-light p-4 rounded-xl border border-error/20 flex gap-3">
                    <svg
                      class="w-6 h-6 text-error shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p class="text-error text-sm font-medium">
                      El plazo de descuento ha vencido. Debes pagar el 100% más intereses.
                    </p>
                  </div>
                }

                <!-- Total to pay -->
                <div class="text-center py-2">
                  <p class="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                    Total a Pagar
                  </p>
                  <p
                    class="text-4xl font-sans font-bold"
                    [class.text-primary]="result()!.discountPercent > 0"
                    [class.text-error]="result()!.discountPercent === 0"
                  >
                    {{ formatCOP(result()!.totalToPay) }}
                  </p>
                </div>

                @if (result()!.discountPercent > 0) {
                  <!-- Urgency indicator -->
                  <div class="bg-gray-100 p-3 rounded-lg flex items-center gap-3">
                    <div
                      class="w-3 h-3 rounded-full animate-pulse shrink-0"
                      [class.bg-success]="result()!.urgency === 'green'"
                      [class.bg-warning]="result()!.urgency === 'yellow'"
                      [class.bg-error]="result()!.urgency === 'red'"
                      aria-hidden="true"
                    ></div>
                    <p class="text-xs text-gray-600 flex-1">
                      {{ result()!.deadlineMessage }}
                    </p>
                  </div>
                }

                <!-- WhatsApp CTA -->
                <a
                  [href]="whatsappLink()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors"
                  aria-label="Contactar por WhatsApp para agendar el curso"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                  Quiero este descuento
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CalculatorFormSectionComponent implements OnChanges {
  /** Pre-selected infraction coming from the table click. */
  readonly preSelected = input<Infraction | null>(null);

  private readonly fb = inject(FormBuilder);
  private readonly calculatorService = inject(CalculatorService);
  private readonly whatsapp = inject(Whatsapp);

  /** Today's date as ISO string for the date input max attribute. */
  protected readonly todayIso = new Date().toISOString().split('T')[0];

  protected readonly form: FormGroup = this.fb.group({
    ticketType: ['manual', Validators.required],
    infractionCode: ['', Validators.required],
    infractionDate: ['', Validators.required],
  });

  /** Computed calculation result; null until the form is submitted. */
  protected readonly result = signal<CalculationResult | null>(null);

  /** Groups of infractions for the select optgroups. */
  protected readonly categoryGroups: CategoryGroup[] = ['A', 'B', 'C', 'D', 'E'].map((cat) => ({
    label: `Categoría ${cat} (${this.smdlvLabel(cat as InfractionCategory)} SMDLV)`,
    infractions: INFRACTIONS.filter((i) => i.category === cat),
  }));

  /** WhatsApp link derived from the current result. */
  protected readonly whatsappLink = computed(() => {
    const r = this.result();
    if (!r) return '#';
    return this.whatsapp.generateCalculatorLink(
      `${r.infraction.code} — ${r.infraction.description}`,
      r.originalValue,
      r.totalToPay,
      r.discountPercent,
    );
  });

  /** Returns true when the code field has been touched and is empty. */
  protected readonly codeInvalid = computed(
    () =>
      (this.form.get('infractionCode')?.invalid && this.form.get('infractionCode')?.touched) ??
      false,
  );

  /** Returns true when the date field has been touched and is empty/future. */
  protected readonly dateInvalid = computed(
    () =>
      (this.form.get('infractionDate')?.invalid && this.form.get('infractionDate')?.touched) ??
      false,
  );

  /** React to a table-driven pre-selection. */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preSelected']) {
      const inf = this.preSelected();
      if (inf) {
        this.form.patchValue({ infractionCode: inf.code });
        // Clear any previous result so the panel resets
        this.result.set(null);
      }
    }
  }

  /** Handles form submission and runs the calculation. */
  protected onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { ticketType, infractionCode, infractionDate } = this.form.value as {
      ticketType: 'manual' | 'fotomulta';
      infractionCode: string;
      infractionDate: string;
    };

    const infraction = INFRACTIONS.find((i) => i.code === infractionCode);
    if (!infraction) return;

    // Parse date with noon time to avoid timezone day-shift
    const [y, m, d] = infractionDate.split('-').map(Number);
    const date = new Date(y, m - 1, d, 12, 0, 0);

    this.result.set(this.calculatorService.calculate(infraction, ticketType, date));
  }

  /** Formats a COP amount. */
  protected formatCOP(value: number): string {
    return this.calculatorService.formatCurrency(value);
  }

  /** Returns the SMDLV multiplier label for display. */
  private smdlvLabel(cat: InfractionCategory): number {
    const map: Record<InfractionCategory, number> = {
      A: 4,
      B: 8,
      C: 15,
      D: 30,
      E: 45,
    };
    return map[cat];
  }
}
