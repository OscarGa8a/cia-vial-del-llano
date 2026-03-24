import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INFRACTIONS } from '@core/data/infractions.data';
import { CalculationResult, Infraction, InfractionCategory } from '@core/models/infraction.model';
import { Whatsapp, Calculator } from '@core/services';
import { Icon } from '@shared/components';
import {
  CalculatorIcon,
  CalendarDaysIcon,
  CameraIcon,
  HatGlassesIcon,
  InfoIcon,
  MoveRightIcon,
} from 'lucide-angular';

/** Groups infractions by their category letter for the <select> optgroup. */
interface CategoryGroup {
  readonly label: string;
  readonly infractions: readonly Infraction[];
}

/**
 * Provides the fine calculator form and shows the computed payment summary.
 *
 * @example
 * ```html
 * <app-calculator-form [preSelected]="selectedInfraction" />
 * ```
 */
@Component({
  selector: 'app-calculator-form',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './calculator-form.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorForm {
  /** FormBuilder instance used to create and validate the reactive form. */
  private readonly fb = inject(FormBuilder);

  /** Calculator service used to compute discount and total payment values. */
  private readonly calculator = inject(Calculator);

  /** WhatsApp service used to build a contact link from the current result. */
  private readonly whatsapp = inject(Whatsapp);

  /** Pre-selected infraction coming from the table click. */
  readonly preSelected = input<Infraction | null>(null);

  /** Today's date as ISO string for the date input max attribute. */
  protected readonly todayIso = new Date().toISOString().split('T')[0];

  /** Reactive form with ticket type, infraction code, and infraction date controls. */
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

  /** WhatsApp link generated from the current result; falls back to '#' when empty. */
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

  /** True when the code control is touched and currently invalid. */
  protected readonly codeInvalid = computed(
    () =>
      (this.form.get('infractionCode')?.invalid && this.form.get('infractionCode')?.touched) ??
      false,
  );

  /** True when the date control is touched and currently invalid. */
  protected readonly dateInvalid = computed(
    () =>
      (this.form.get('infractionDate')?.invalid && this.form.get('infractionDate')?.touched) ??
      false,
  );

  /** Icon references for use in the template. */
  protected readonly CalculatorIcon = CalculatorIcon;
  protected readonly HatGlassesIcon = HatGlassesIcon;
  protected readonly CameraIcon = CameraIcon;
  protected readonly CalendarDaysIcon = CalendarDaysIcon;
  protected readonly MoveRightIcon = MoveRightIcon;
  protected readonly InfoIcon = InfoIcon;

  constructor() {
    /** Syncs incoming pre-selected infractions with the form and clears old results. */
    effect(() => {
      const inf = this.preSelected();
      if (inf) {
        this.form.patchValue({ infractionCode: inf.code });
        // Clear any previous result so the panel resets
        this.result.set(null);
      }
    });
  }

  /** Returns true when the selected ticket type is manual. */
  protected isTicketTypeManual(): boolean {
    return this.form.get('ticketType')?.value === 'manual';
  }

  /** Returns true when the selected ticket type is camera-based (`fotomulta`). */
  protected isTicketTypeFotomulta(): boolean {
    return this.form.get('ticketType')?.value === 'fotomulta';
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

    this.result.set(this.calculator.calculate(infraction, ticketType, date));
  }

  /**
   * Formats a numeric amount as COP currency.
   *
   * @param value - Amount to format.
   * @returns Currency string formatted for Colombian pesos.
   */
  protected formatCOP(value: number): string {
    return this.calculator.formatCurrency(value);
  }

  /**
   * Returns the SMDLV multiplier used by a category label.
   *
   * @param cat - Infraction category code.
   * @returns SMDLV multiplier value associated with the category.
   */
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
