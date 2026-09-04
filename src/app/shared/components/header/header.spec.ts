import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Header } from './header';

const HEADER_TEST_ROUTES = [
  { path: 'cursos', component: Header },
  { path: 'refrendacion', component: Header },
  { path: 'examenes-medicos', component: Header },
  { path: 'calculadora', component: Header },
];

const ACTIVE_SERVICE_ROUTES = [
  ['/cursos', 'Cursos pedagógicos'],
  ['/refrendacion', 'Refrendación de licencia'],
  ['/examenes-medicos', 'Exámenes médicos'],
] as const;

describe('Header', () => {
  it('renders Inicio before the clearly labeled mobile services group and includes WhatsApp CTA', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector('#mobile-menu') as HTMLElement;
    expect(mobileMenu.querySelectorAll('a')).toHaveLength(0);

    const toggleBtn = compiled.querySelector('[aria-controls="mobile-menu"]') as HTMLButtonElement;
    expect(toggleBtn.getAttribute('aria-label')).toBe('Abrir menú de navegación');

    toggleBtn.click();
    fixture.detectChanges();

    expect(toggleBtn.getAttribute('aria-label')).toBe('Cerrar menú de navegación');
    expect(mobileMenu.classList).toContain('overflow-y-auto');

    const nav = mobileMenu.querySelector('nav') as HTMLElement;
    const links = Array.from(nav.querySelectorAll('a')).map((link) => link.textContent?.trim());
    expect(links[0]).toBe('Inicio');
    expect(nav.textContent).toContain('Servicios');
    expect(links).toEqual(expect.arrayContaining([
      'Cursos pedagógicos',
      'Refrendación de licencia',
      'Exámenes médicos',
      'Calculadora',
      'Ubicación',
      'Preguntas',
      'Nosotros',
      'Contacto',
      'Contactar por WhatsApp',
    ]));

    const whatsappBtn = nav.querySelector('a[aria-label="Contactar por WhatsApp"]');
    expect(whatsappBtn).toBeTruthy();
  });

  it('keeps Cursos out of the desktop top-level navigation', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const desktopNav = fixture.nativeElement.querySelector('nav[aria-label="Navegación principal"]') as HTMLElement;
    const labels = Array.from(desktopNav.querySelectorAll(':scope > a')).map((link) => link.textContent?.trim());
    expect(labels[0]).toBe('Inicio');
    expect(labels).not.toContain('Cursos');
    expect(desktopNav.textContent).toContain('Servicios');
  });

  it('opens on pointer entry and closes when the pointer leaves the services group', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="services-menu"]') as HTMLButtonElement;
    const group = trigger.parentElement as HTMLElement;
    group.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#services-menu')).not.toBeNull();

    group.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#services-menu')).toBeNull();
  });

  it('opens the services menu on focus and toggles it on click', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="services-menu"]') as HTMLButtonElement;
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps the services menu open while focus moves within the group and closes after it leaves', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="services-menu"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    const serviceLink = fixture.nativeElement.querySelector('#services-menu a') as HTMLAnchorElement;

    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: serviceLink }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#services-menu')).not.toBeNull();

    serviceLink.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#services-menu')).toBeNull();
  });

  it('gives Servicios the matching nav underline styling and menu attributes', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="services-menu"]') as HTMLButtonElement;
    expect(trigger.classList).toContain('hover:text-highlight');
    expect(trigger.classList).toContain('hover:border-b-2');
    expect(trigger.classList).toContain('hover:border-highlight!');
    expect(trigger.classList).toContain('border-b-2');
    expect(trigger.classList).toContain('border-transparent');
    expect(trigger.getAttribute('aria-controls')).toBe('services-menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it.each(ACTIVE_SERVICE_ROUTES)(
    'keeps Servicios active for %s and highlights only %s after opening the menu',
    async (url, activeLabel) => {
      await TestBed.configureTestingModule({
        imports: [Header],
        providers: [provideRouter(HEADER_TEST_ROUTES)],
      }).compileComponents();

      const fixture = TestBed.createComponent(Header);
      const router = TestBed.inject(Router);
      await router.navigateByUrl(url);
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector(
        '[aria-controls="services-menu"]',
      ) as HTMLButtonElement;
      expect(trigger.classList).toContain('text-highlight!');
      expect(trigger.classList).toContain('border-highlight!');
      expect(fixture.nativeElement.querySelector('#services-menu')).toBeNull();

      trigger.click();
      fixture.detectChanges();

      const serviceLinks = Array.from(
        fixture.nativeElement.querySelectorAll('#services-menu a'),
      ) as HTMLAnchorElement[];
      const activeLinks = serviceLinks.filter((link) =>
        link.classList.contains('bg-primary-lighter'),
      );
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0].textContent?.trim()).toBe(activeLabel);
      expect(activeLinks[0].classList).toContain('font-semibold');
    },
  );

  it('does not mark Servicios active on a non-service route', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter(HEADER_TEST_ROUTES)],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/calculadora');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '[aria-controls="services-menu"]',
    ) as HTMLButtonElement;
    expect(trigger.classList).not.toContain('text-highlight!');
    expect(trigger.classList).not.toContain('border-highlight!');
  });
});
