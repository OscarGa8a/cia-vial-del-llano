import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SEO_CONFIG } from '@core/constants/seo';

/** Defines the configurable metadata for page-level SEO updates. */
export interface MetaTagConfig {
  /** Document title used for browser title and social tags. */
  title: string;
  /** Main page description used in search and social previews. */
  description: string;
  /** Keywords used in the standard `keywords` meta tag. */
  keywords?: string[];
  /** Image URL or Cloudinary public ID used in social cards. */
  image?: string;
  /** Alternative text associated with the social preview image. */
  imageAlt?: string;
  /** Canonical URL and Open Graph URL for the page. */
  url?: string;
  /** Open Graph entity type for rich previews. */
  type?: 'website' | 'product' | 'article';
  /** Facebook App ID for Open Graph integrations. */
  fbAppId?: string;
  /** Product price amount used when `type` is `product`. */
  price?: number;
  /** Product currency code used with `price`. */
  currency?: string;
}

/**
 * Centralized SEO service for meta tags, canonical URLs, and structured data.
 *
 * @example
 * ```typescript
 * export class HomePage {
 *   private readonly seo = inject(Seo);
 *
 *   ngOnInit(): void {
 *     this.seo.updateMetaTags({
 *       title: 'CIA Vial del Llano | Cursos para comparendos',
 *       description: 'Reduce tu multa con nuestros cursos certificados.',
 *       type: 'website',
 *     });
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  /** Angular Meta service used to update document meta tags. */
  private readonly meta = inject(Meta);
  /** Angular Title service used to update the document title. */
  private readonly title = inject(Title);
  /** DOM document reference used for canonical and JSON-LD script management. */
  private readonly document = inject(DOCUMENT);

  /**
   * Updates standard, Open Graph, and Twitter metadata for the current page.
   *
   * @param config - SEO values to apply, with sensible defaults from SEO_CONFIG
   */
  updateMetaTags(config: MetaTagConfig): void {
    const {
      title,
      description,
      keywords = SEO_CONFIG.defaultKeywords,
      image = SEO_CONFIG.defaultImage,
      imageAlt = SEO_CONFIG.defaultImageAlt,
      url = SEO_CONFIG.siteUrl,
      type = 'website',
      fbAppId = SEO_CONFIG.facebookAppId,
      price,
      currency,
    } = config;

    const resolvedImage = this.resolveImageUrl(image);

    this.updateTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: resolvedImage });
    this.meta.updateTag({ property: 'og:image:secure_url', content: resolvedImage });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SEO_CONFIG.siteName });
    this.meta.updateTag({ property: 'og:locale', content: SEO_CONFIG.locale });
    if (fbAppId) {
      this.meta.updateTag({ property: 'fb:app_id', content: fbAppId });
    }

    this.meta.updateTag({ name: 'twitter:card', content: SEO_CONFIG.twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: resolvedImage });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    if (type === 'product' && price && currency) {
      this.meta.updateTag({ property: 'product:price:amount', content: price.toString() });
      this.meta.updateTag({ property: 'product:price:currency', content: currency });
    }

    this.updateCanonical(url);
  }

  /**
   * Sets the browser tab title.
   *
   * @param title - Final title text for the current page
   */
  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  /**
   * Replaces the canonical link tag with the provided URL.
   *
   * @param url - Canonical URL to expose for search engines
   */
  updateCanonical(url: string): void {
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();

    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  /**
   * Appends JSON-LD structured data to the document head.
   *
   * @param data - Schema.org-compatible JSON object
   * @param id - Script element id used to manage replacement
   */
  addStructuredData(data: object, id = 'structured-data'): void {
    this.removeStructuredData(id);

    const script = this.document.createElement('script');
    script.setAttribute('id', id);
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Removes an existing JSON-LD script by id.
   *
   * @param id - Script element id to remove
   */
  removeStructuredData(id = 'structured-data'): void {
    const existingScript = this.document.getElementById(id);
    if (existingScript) existingScript.remove();
  }

  /**
   * Builds Organization schema data based on global SEO configuration.
   *
   * @returns Schema.org Organization payload
   */
  generateOrganizationSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_CONFIG.business.name,
      alternateName: SEO_CONFIG.business.alternateName,
      url: SEO_CONFIG.siteUrl,
      logo: SEO_CONFIG.product.brandLogo,
      description: SEO_CONFIG.business.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SEO_CONFIG.business.addressLocality,
        addressRegion: SEO_CONFIG.business.addressRegion,
        addressCountry: SEO_CONFIG.business.addressCountry,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SEO_CONFIG.business.phone,
        contactType: 'customer service',
        availableLanguage: 'es',
        areaServed: SEO_CONFIG.business.addressCountry,
      },
      email: SEO_CONFIG.business.email,
      sameAs: SEO_CONFIG.business.socialLinks,
      slogan: SEO_CONFIG.business.slogan,
    };
  }

  /**
   * Builds LocalBusiness schema data for location-aware SEO.
   *
   * @returns Schema.org LocalBusiness payload
   */
  generateLocalBusinessSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SEO_CONFIG.business.name,
      image: SEO_CONFIG.product.brandLogo,
      description: SEO_CONFIG.business.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle 37B # 19A-49',
        addressLocality: SEO_CONFIG.business.addressLocality,
        addressRegion: SEO_CONFIG.business.addressRegion,
        addressCountry: SEO_CONFIG.business.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SEO_CONFIG.business.latitude,
        longitude: SEO_CONFIG.business.longitude,
      },
      url: SEO_CONFIG.siteUrl,
      telephone: SEO_CONFIG.business.phone,
      email: SEO_CONFIG.business.email,
      priceRange: SEO_CONFIG.business.priceRange,
      paymentAccepted: SEO_CONFIG.business.paymentAccepted,
      currenciesAccepted: SEO_CONFIG.business.currenciesAccepted,
      sameAs: SEO_CONFIG.business.socialLinks,
    };
  }

  /**
   * Builds BreadcrumbList schema from the provided breadcrumb items.
   *
   * @param breadcrumbs - Ordered breadcrumb items with optional URL per item
   * @returns Schema.org BreadcrumbList payload
   */
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url?: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(item.url && { item: item.url }),
      })),
    };
  }

  /**
   * Resolves social image input to an absolute URL.
   *
   * @param imageUrl - Absolute URL, protocol-relative URL, root-relative URL, or Cloudinary public ID
   * @returns Absolute image URL ready for social metadata tags
   */
  private resolveImageUrl(imageUrl: string): string {
    const url = imageUrl.trim();

    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return `${SEO_CONFIG.siteUrl}${url}`;

    // Cloudinary public ID
    const encodedId = url
      .split('/')
      .map((s) => encodeURIComponent(s))
      .join('/');
    return `${SEO_CONFIG.cloudinaryBaseUrl}/image/upload/f_auto,q_auto/${encodedId}`;
  }
}
