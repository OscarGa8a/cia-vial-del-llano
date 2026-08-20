import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Whatsapp } from '@core/services';
import { ServicesSection } from './services-section';

describe('ServicesSection', () => {
  it('renders all service cards with a route CTA and contextual WhatsApp action', async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesSection],
      providers: [
        provideRouter([]),
        { provide: Whatsapp, useValue: { openServiceChat: () => undefined } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ServicesSection);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article');
    expect(cards).toHaveLength(3);
    expect(fixture.nativeElement.textContent).toContain('Refrendación de licencia');
    expect(fixture.nativeElement.querySelectorAll('a')).toHaveLength(3);
        expect(fixture.nativeElement.querySelector('a[href="/examenes-medicos"]')?.textContent).toContain(
          'Ver exámenes médicos',
        );
        expect(fixture.nativeElement.querySelector('a[href="/refrendacion"]')?.textContent).toContain(
          'Ver servicio de refrendación',
        );
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(Array.from(buttons).every((button) => button.textContent?.includes('WhatsApp'))).toBe(true);
  });
});
