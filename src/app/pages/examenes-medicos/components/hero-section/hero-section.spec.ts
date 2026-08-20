import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Whatsapp } from '@core/services';
import { vi } from 'vitest';
import { MedicalExamsHeroSection } from './hero-section';

describe('MedicalExamsHeroSection', () => {
  it('renders its distinct hero content and routes the primary CTA through the service flow', async () => {
    const openServiceChat = vi.fn();
    await TestBed.configureTestingModule({
      imports: [MedicalExamsHeroSection],
      providers: [provideRouter([]), { provide: Whatsapp, useValue: { openServiceChat } }],
    }).compileComponents();

    const fixture = TestBed.createComponent(MedicalExamsHeroSection);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain(
      'Exámenes médicos para licencia de conducción en Villavicencio',
    );
    expect(element.querySelector('img')?.getAttribute('data-image-public-id')).toContain(
      'TODO_CLOUDINARY_PUBLIC_ID_MEDICAL_EXAMS',
    );
    expect(element.textContent).toContain('Detalles por confirmar');
    expect(element.querySelectorAll('button')).toHaveLength(1);
    expect(element.querySelector('a[href="#preparation"]')).toBeNull();

    (element.querySelector('button') as HTMLButtonElement).click();
    expect(openServiceChat).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'medical-exams' }),
      'medical-exams-hero',
    );
  });
});
