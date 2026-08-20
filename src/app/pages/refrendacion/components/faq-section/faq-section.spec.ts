import { TestBed } from '@angular/core/testing';
import { LicenseRenewalFaqSection } from './faq-section';

describe('LicenseRenewalFaqSection', () => {
  it('retains FAQ answers for animation while hiding closed answers from assistive technology and interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseRenewalFaqSection],
    }).compileComponents();

    const fixture = TestBed.createComponent(LicenseRenewalFaqSection);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll<HTMLButtonElement>('button');
    const firstAnswer = element.querySelector<HTMLElement>('#license-renewal-faq-answer-1');
    const secondAnswer = element.querySelector<HTMLElement>('#license-renewal-faq-answer-2');

    expect(buttons).toHaveLength(5);
    expect(buttons[0].textContent).toContain(
      '¿Qué es la refrendación o renovación de la licencia de conducción?',
    );
    expect(buttons[4].textContent).toContain(
      '¿Cómo solicito el servicio de refrendación con CIA Vial del Llano?',
    );
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[0].getAttribute('aria-controls')).toBe('license-renewal-faq-answer-1');
    expect(firstAnswer).not.toBeNull();
    expect(firstAnswer?.getAttribute('aria-labelledby')).toBe('license-renewal-faq-btn-1');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBe('true');
    expect(firstAnswer?.hasAttribute('inert')).toBe(true);
    expect(firstAnswer?.classList.contains('open')).toBe(false);

    buttons[0].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBeNull();
    expect(firstAnswer?.hasAttribute('inert')).toBe(false);
    expect(firstAnswer?.classList.contains('open')).toBe(true);
    expect(firstAnswer?.textContent).toContain('actualiza la vigencia de tu licencia');

    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(firstAnswer?.getAttribute('aria-hidden')).toBe('true');
    expect(firstAnswer?.hasAttribute('inert')).toBe(true);
    expect(firstAnswer?.classList.contains('open')).toBe(false);
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(secondAnswer?.getAttribute('aria-hidden')).toBeNull();
    expect(secondAnswer?.hasAttribute('inert')).toBe(false);
    expect(secondAnswer?.classList.contains('open')).toBe(true);

    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
    expect(secondAnswer?.getAttribute('aria-hidden')).toBe('true');
    expect(secondAnswer?.hasAttribute('inert')).toBe(true);
    expect(secondAnswer?.classList.contains('open')).toBe(false);
  });
});
