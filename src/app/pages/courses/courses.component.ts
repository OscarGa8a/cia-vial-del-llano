import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesHeroSectionComponent } from './components/hero-section.component';
import { CourseInfoSectionComponent } from './components/course-info-section.component';
import { CoursesBenefitsSectionComponent } from './components/benefits-section.component';
import { DiscountTableSectionComponent } from './components/discount-table-section.component';
import { RequirementsSectionComponent } from './components/requirements-section.component';
import { ProcessSectionComponent } from './components/process-section.component';
import { CoursesFaqSectionComponent } from './components/faq-section.component';
import { CoursesFinalCtaSectionComponent } from './components/final-cta-section.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CoursesHeroSectionComponent,
    CourseInfoSectionComponent,
    CoursesBenefitsSectionComponent,
    DiscountTableSectionComponent,
    RequirementsSectionComponent,
    ProcessSectionComponent,
    CoursesFaqSectionComponent,
    CoursesFinalCtaSectionComponent,
  ],
  template: `
    <app-courses-hero-section />
    <app-course-info-section />
    <app-courses-benefits-section />
    <app-discount-table-section />
    <app-requirements-section />
    <app-process-section />
    <app-courses-faq-section />
    <app-courses-final-cta-section />
  `,
})
export class CoursesComponent {}
