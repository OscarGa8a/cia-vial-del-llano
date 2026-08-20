import { TestBed } from '@angular/core/testing';
import { MedicalExamsFaqSection } from './faq-section';

describe('MedicalExamsFaqSection', () => {
  it('retains FAQ panels while making only the open answer available to assistive technology and interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalExamsFaqSection],
    }).compileComponents();

    const fixture = TestBed.createComponent(MedicalExamsFaqSection);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll<HTMLButtonElement>('button');
    const firstAnswer = element.querySelector<HTMLElement>('#medical-exams-faq-answer-1');
    const secondAnswer = element.querySelector<HTMLElement>('#medical-exams-faq-answer-2');

    expect(buttons).toHaveLength(6);
    expect(buttons[0].textContent).toContain('¿Para qué sirven los exámenes médicos para licencia de conducción?');
    expect(buttons[5].textContent).toContain('¿Cómo solicito los exámenes médicos con CIA Vial del Llano?');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[0].getAttribute('aria-controls')).toBe('medical-exams-faq-answer-1');
    expect(firstAnswer?.getAttribute('aria-labelledby')).toBe('medical-exams-faq-btn-1');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBe('true');
    expect(firstAnswer?.hasAttribute('inert')).toBe(true);
    expect(firstAnswer?.classList.contains('open')).toBe(false);

    buttons[0].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBeNull();
    expect(firstAnswer?.hasAttribute('inert')).toBe(false);
    expect(firstAnswer?.classList.contains('open')).toBe(true);

    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBe('true');
    expect(firstAnswer?.hasAttribute('inert')).toBe(true);
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(secondAnswer?.getAttribute('aria-hidden')).toBeNull();
    expect(secondAnswer?.hasAttribute('inert')).toBe(false);
    expect(secondAnswer?.classList.contains('open')).toBe(true);
  });
});
