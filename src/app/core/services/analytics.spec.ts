import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Analytics } from './analytics';

describe('Analytics', () => {
  it('pushes the WhatsApp event payload to dataLayer in the browser', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    const analytics = TestBed.inject(Analytics);
    const dataLayerWindow = window as Window & { dataLayer?: unknown[] };
    dataLayerWindow.dataLayer = [];

    analytics.trackWhatsappClick('medical-exams', 'medical-exams-page');

    expect(dataLayerWindow.dataLayer).toContainEqual({
      event: 'whatsapp_click',
      service: 'medical-exams',
      placement: 'medical-exams-page',
    });
  });

  it('does not create a dataLayer during SSR', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const analytics = TestBed.inject(Analytics);
    const dataLayerWindow = window as Window & { dataLayer?: unknown[] };
    delete dataLayerWindow.dataLayer;

    analytics.trackWhatsappClick('license-renewal', 'license-renewal-page');

    expect(dataLayerWindow.dataLayer).toBeUndefined();
  });
});
