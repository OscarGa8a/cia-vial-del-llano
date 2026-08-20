import { TestBed } from '@angular/core/testing';
import { Whatsapp } from '@core/services';
import { vi } from 'vitest';
import { LicenseRenewalBenefitsSection } from './benefits-section/benefits-section';
import { LicenseRenewalFinalCtaSection } from './final-cta-section/final-cta-section';
import { LicenseRenewalOverviewSection } from './overview-section/overview-section';
import { LicenseRenewalProcessSection } from './process-section/process-section';

describe('license renewal page sections', () => {
  it('renders the service overview and exactly three refrendación situations', async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseRenewalOverviewSection, LicenseRenewalBenefitsSection],
    }).compileComponents();

    const overview = TestBed.createComponent(LicenseRenewalOverviewSection);
    overview.detectChanges();
    const overviewElement = overview.nativeElement as HTMLElement;
    expect(overviewElement.querySelector('img')?.getAttribute('data-image-public-id')).toBe(
      'TODO_CLOUDINARY_PUBLIC_ID_REFRENDED_LICENSE',
    );
    expect(overviewElement.textContent).toContain('Solicita el servicio de refrendación');
    expect(overviewElement.textContent).toContain('confirmar los detalles disponibles');

    const benefits = TestBed.createComponent(LicenseRenewalBenefitsSection);
    benefits.detectChanges();
    expect(benefits.nativeElement.querySelectorAll('.card-hover')).toHaveLength(3);
    expect(benefits.nativeElement.textContent).toContain('Licencia vencida');
  });

  it('renders the service process and tracks both contextual WhatsApp CTAs', async () => {
    const openServiceChat = vi.fn();
    await TestBed.configureTestingModule({
      imports: [LicenseRenewalProcessSection, LicenseRenewalFinalCtaSection],
      providers: [{ provide: Whatsapp, useValue: { openServiceChat } }],
    }).compileComponents();

    const process = TestBed.createComponent(LicenseRenewalProcessSection);
    process.detectChanges();
    const processElement = process.nativeElement as HTMLElement;
    expect(processElement.querySelectorAll('ol > li')).toHaveLength(4);
    expect(processElement.textContent).toContain('Continúa con la información confirmada');
    expect(processElement.textContent).toContain('Solicitar mi refrendación');
    expect(processElement.querySelector('ol')?.className).toContain('ml-6');
    expect(processElement.querySelector('ol > li > span')?.className).toContain('-left-11');
    processElement.querySelector('button')?.click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'license-renewal' }),
      'license-renewal-process',
    );

    const finalCta = TestBed.createComponent(LicenseRenewalFinalCtaSection);
    finalCta.detectChanges();
    const finalButton = (finalCta.nativeElement as HTMLElement).querySelector('button');
    expect(finalButton?.textContent?.trim()).toBe('Solicitar refrendación');
    expect(finalButton?.getAttribute('aria-label')).toContain('servicio de refrendación de licencia');
    finalButton?.click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'license-renewal' }),
      'license-renewal-final-cta',
    );
  });
});
