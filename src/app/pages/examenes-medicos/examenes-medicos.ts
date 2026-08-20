import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  MedicalExamsEvaluationsSection,
  MedicalExamsFaqSection,
  MedicalExamsFinalCtaSection,
  MedicalExamsHeroSection,
  MedicalExamsPreparationSection,
  MedicalExamsProcessSection,
  MedicalExamsPurposeSection,
} from './components';
import { getServiceById } from '@core/data/services.data';
import { SERVICE_IDS } from '@core/models/service.model';
import { Seo } from '@core/services';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/** Provides the medical exam service page. */
@Component({
  selector: 'app-examenes-medicos',
  imports: [
    MedicalExamsHeroSection,
    MedicalExamsPurposeSection,
    MedicalExamsEvaluationsSection,
    MedicalExamsPreparationSection,
    MedicalExamsProcessSection,
    MedicalExamsFaqSection,
    MedicalExamsFinalCtaSection,
  ],
  templateUrl: './examenes-medicos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamenesMedicos implements OnInit {
  private readonly seo = inject(Seo);
  protected readonly service = getServiceById(SERVICE_IDS.MEDICAL_EXAMS);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      ...PAGE_SEO_CONFIG.medicalExams,
      url: `${SEO_CONFIG.siteUrl}/examenes-medicos`,
      type: 'website',
    });
    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: this.service.title, url: `${SEO_CONFIG.siteUrl}/examenes-medicos` },
      ]),
      'breadcrumb-schema',
    );
  }

}
