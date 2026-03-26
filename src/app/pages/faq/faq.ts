import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  ContactCtaSection,
  FaqContentSection,
  FaqFinalCtaSection,
  FaqHeroSection,
  QuickLinksSection,
  SearchSection,
} from './components';
import { FAQ_CATEGORIES, FAQ_PAGE_DATA } from '@core/data/faq-page.data';
import { CategorizedFaq, FaqCategory } from '@core/models/faq.model';
import { FaqGroup } from './components/faq-content-section/faq-content-section';
import { Seo } from '@core/services/seo';
import { PAGE_SEO_CONFIG, SEO_CONFIG } from '@core/constants/seo';

/**
 * FAQ page component that displays frequently asked questions with search and category filtering.
 *
 * Composes multiple sections:
 * - Hero section with page title and description
 * - Search and category filter controls
 * - FAQ content grouped by category with accordion display
 * - Contact call-to-action for further support
 * - Quick links to related resources
 * - Final call-to-action for course enrollment
 */
@Component({
  selector: 'app-faq',
  imports: [
    FaqHeroSection,
    SearchSection,
    FaqContentSection,
    ContactCtaSection,
    QuickLinksSection,
    FaqFinalCtaSection,
  ],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq implements OnInit {
  private readonly seo = inject(Seo);

  /** All available FAQ categories with display metadata. */
  protected readonly categories = FAQ_CATEGORIES;

  /** All FAQ data. */
  private readonly allFaqs: CategorizedFaq[] = FAQ_PAGE_DATA;

  // ── State signals ───────────────────────────────────────────

  /** Current search query text. */
  protected readonly searchQuery = signal<string>('');

  /** Currently selected category filter (null = show all). */
  protected readonly activeCategory = signal<FaqCategory | null>(null);

  /** Set of FAQ IDs whose accordion panels are currently open. */
  protected readonly openItemIds = signal<ReadonlySet<number>>(new Set());

  // ── Computed ────────────────────────────────────────────────

  /** FAQs filtered by active category and search query. */
  protected readonly filteredFaqs = computed<CategorizedFaq[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.activeCategory();

    let result = this.allFaqs;

    if (category) {
      result = result.filter((faq) => faq.category === category);
    }

    if (query) {
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
      );
    }

    return result;
  });

  /** Filtered FAQs grouped by category with their metadata. */
  protected readonly groupedFaqs = computed<FaqGroup[]>(() => {
    const faqs = this.filteredFaqs();
    const groups: FaqGroup[] = [];

    for (const catMeta of FAQ_CATEGORIES) {
      const categoryFaqs = faqs.filter((faq) => faq.category === catMeta.id);
      if (categoryFaqs.length > 0) {
        groups.push({ category: catMeta, faqs: categoryFaqs });
      }
    }

    return groups;
  });

  // ── Lifecycle ───────────────────────────────────────────────

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: PAGE_SEO_CONFIG.faq.title,
      description: PAGE_SEO_CONFIG.faq.description,
      keywords: PAGE_SEO_CONFIG.faq.keywords,
      url: `${SEO_CONFIG.siteUrl}/preguntas-frecuentes`,
      type: 'website',
    });

    this.seo.addStructuredData(
      this.seo.generateBreadcrumbSchema([
        { name: 'Inicio', url: SEO_CONFIG.siteUrl },
        { name: 'Preguntas Frecuentes', url: `${SEO_CONFIG.siteUrl}/preguntas-frecuentes` },
      ]),
      'breadcrumb-schema',
    );
  }

  // ── Event handlers ──────────────────────────────────────────

  /** Toggles a single FAQ item's open/closed state. */
  protected onToggleItem(id: number): void {
    this.openItemIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  /** Opens all currently visible FAQ items. */
  protected onExpandAll(): void {
    const ids = new Set(this.filteredFaqs().map((faq) => faq.id));
    this.openItemIds.set(ids);
  }

  /** Closes all FAQ items. */
  protected onCollapseAll(): void {
    this.openItemIds.set(new Set());
  }
}
