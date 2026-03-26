import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  HeroSection,
  CourseInfoSection,
  BenefitsSection,
  DiscountTableSection,
  RequirementsSection,
  ProcessSection,
  FaqSection,
  FinalCtaSection,
} from './components';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/**
 * Courses page — dedicated page for pedagogical course information.
 * Orchestrates all section components in the correct visual order.
 *
 * Sections:
 * 1. Hero with breadcrumb, certification badge, and WhatsApp CTA
 * 2. Course info explaining what the course is (Ley 1383 de 2010)
 * 3. Benefits grid (6 cards)
 * 4. Discount tables (manual vs electronic/fotomulta)
 * 5. Requirements checklist and course content topics
 * 6. Step-by-step process timeline (5 steps)
 * 7. FAQ accordion (course-specific)
 * 8. Final CTA with trust stats
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  styleUrl: './courses.css',
  imports: [
    HeroSection,
    CourseInfoSection,
    BenefitsSection,
    DiscountTableSection,
    RequirementsSection,
    ProcessSection,
    FaqSection,
    FinalCtaSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.courses.title,
      description: PAGE_SEO_CONFIG.courses.description,
      keywords: PAGE_SEO_CONFIG.courses.keywords,
      url: `${SEO_CONFIG.siteUrl}/cursos`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Cursos', url: `${SEO_CONFIG.siteUrl}/cursos` },
      ]),
      'breadcrumb-schema',
    );
  }
}
