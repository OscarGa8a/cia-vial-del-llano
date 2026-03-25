import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_QUICK_LINKS } from '@core/data/contact-page.data';
import { Icon } from '@shared/components';

/**
 * FAQ quick links section for the Contact page.
 * Displays a 4-card grid linking to key pages: FAQ, Calculator, Courses, Location.
 * Helps visitors navigate to self-service resources before contacting support.
 */
@Component({
  selector: 'app-faq-quick-links-section',
  imports: [RouterLink, Icon],
  templateUrl: './faq-quick-links-section.html',
  styleUrl: './faq-quick-links-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqQuickLinksSection {
  /** Quick link items defined in the contact page data. */
  protected readonly quickLinks = CONTACT_QUICK_LINKS;
}
