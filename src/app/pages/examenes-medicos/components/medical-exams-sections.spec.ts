import { TestBed } from '@angular/core/testing';
import { Whatsapp } from '@core/services';
import { vi } from 'vitest';
import { MedicalExamsEvaluationsSection } from './evaluations-section/evaluations-section';
import { MedicalExamsFinalCtaSection } from './final-cta-section/final-cta-section';
import { MedicalExamsProcessSection } from './process-section/process-section';
import { MedicalExamsPurposeSection } from './purpose-section/purpose-section';

describe('medical exams page sections', () => {
  it('renders the purpose image placeholder and the three medical exam areas', async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalExamsPurposeSection, MedicalExamsEvaluationsSection],
    }).compileComponents();

    const purpose = TestBed.createComponent(MedicalExamsPurposeSection);
    purpose.detectChanges();
    const purposeElement = purpose.nativeElement as HTMLElement;
    expect(purposeElement.querySelector('img')?.getAttribute('data-image-public-id')).toBe(
      'TODO_CLOUDINARY_PUBLIC_ID_MEDICAL_EXAMS_PURPOSE',
    );
    expect(purposeElement.querySelector('img')?.alt).toBe(
      'Imagen de referencia para exámenes médicos de licencia',
    );
    expect(purposeElement.textContent).toContain('Solicita exámenes médicos para licencia de conducción');

    const evaluations = TestBed.createComponent(MedicalExamsEvaluationsSection);
    evaluations.detectChanges();
    const evaluationsElement = evaluations.nativeElement as HTMLElement;
    expect(evaluationsElement.querySelectorAll('.card-hover')).toHaveLength(3);
    expect(evaluationsElement.textContent).toContain('Aptitud física');
    expect(evaluationsElement.textContent).toContain('Aptitud mental');
    expect(evaluationsElement.textContent).toContain('Coordinación motriz');
  });

  it('renders four service steps and tracks the process and final CTA requests', async () => {
    const openServiceChat = vi.fn();
    await TestBed.configureTestingModule({
      imports: [MedicalExamsProcessSection, MedicalExamsFinalCtaSection],
      providers: [{ provide: Whatsapp, useValue: { openServiceChat } }],
    }).compileComponents();

    const process = TestBed.createComponent(MedicalExamsProcessSection);
    process.detectChanges();
    const processElement = process.nativeElement as HTMLElement;
    expect(processElement.querySelectorAll('ol > li')).toHaveLength(4);
    expect(processElement.textContent).toContain('Continúa con la información confirmada');
    expect(processElement.querySelector('button')?.textContent).toContain('Solicitar exámenes médicos');
    processElement.querySelector('button')?.click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'medical-exams' }),
      'medical-exams-process',
    );

    const finalCta = TestBed.createComponent(MedicalExamsFinalCtaSection);
    finalCta.detectChanges();
    const finalCtaElement = finalCta.nativeElement as HTMLElement;
    expect(finalCtaElement.textContent).toContain('Solicita tus');
    expect(finalCtaElement.textContent).toContain('exámenes médicos');
    finalCtaElement.querySelector('button')?.click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'medical-exams' }),
      'medical-exams-final-cta',
    );
  });
});
