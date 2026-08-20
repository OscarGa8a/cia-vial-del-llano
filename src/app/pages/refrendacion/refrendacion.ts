import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  LicenseRenewalBenefitsSection,
  LicenseRenewalFaqSection,
  LicenseRenewalFinalCtaSection,
  LicenseRenewalHeroSection,
  LicenseRenewalOverviewSection,
  LicenseRenewalProcessSection,
  LicenseRenewalRequirementsSection,
} from './components';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Seo } from '@core/services';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/** Provides the refrendación service page. */
@Component({
  selector: 'app-refrendacion',
  imports: [
    LicenseRenewalHeroSection,
    LicenseRenewalOverviewSection,
    LicenseRenewalBenefitsSection,
    LicenseRenewalRequirementsSection,
    LicenseRenewalProcessSection,
    LicenseRenewalFaqSection,
    LicenseRenewalFinalCtaSection,
  ],
  templateUrl: './refrendacion.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Refrendacion implements OnInit {
  private readonly seo = inject(Seo);
  protected readonly service = getServiceById(SERVICE_IDS.LICENSE_RENEWAL);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      ...PAGE_SEO_CONFIG.licenseRenewal,
      url: `${SEO_CONFIG.siteUrl}/refrendacion`,
      type: 'website',
    });
    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: this.service.title, url: `${SEO_CONFIG.siteUrl}/refrendacion` },
      ]),
      'breadcrumb-schema',
    );
  }

}
