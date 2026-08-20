import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Whatsapp } from '@core/services';
import { vi } from 'vitest';
import { LicenseRenewalHeroSection } from './hero-section';

describe('LicenseRenewalHeroSection', () => {
  it('renders its distinct hero content and routes the primary CTA through the service flow', async () => {
    const openServiceChat = vi.fn();
    await TestBed.configureTestingModule({
      imports: [LicenseRenewalHeroSection],
      providers: [provideRouter([]), { provide: Whatsapp, useValue: { openServiceChat } }],
    }).compileComponents();

    const fixture = TestBed.createComponent(LicenseRenewalHeroSection);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Refrendación de licencia de conducción en Villavicencio');
    expect(element.querySelector('img')?.getAttribute('data-image-public-id')).toContain(
      'TODO_CLOUDINARY_PUBLIC_ID_LICENSE_RENEWAL',
    );
    expect(element.textContent).toContain('Confirmación según tu caso');
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Solicitar refrendación');
    expect(element.querySelector('button')?.getAttribute('aria-label')).toContain('servicio de refrendación');
    expect(element.querySelector('a[href="#orientation"]')).toBeNull();

    (element.querySelector('button') as HTMLButtonElement).click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'license-renewal' }),
      'license-renewal-hero',
    );
  });
});
