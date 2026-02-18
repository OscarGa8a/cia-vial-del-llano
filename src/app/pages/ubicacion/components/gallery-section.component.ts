import { ChangeDetectionStrategy, Component } from '@angular/core';

interface GalleryItem {
  label: string;
  icon: string;
  gradient: string;
}

/**
 * Photo gallery section with gradient placeholders for facility photos.
 */
@Component({
  selector: 'app-gallery-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-12 lg:py-16 bg-surface-alt" id="galeria" aria-labelledby="gallery-heading">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-block bg-highlight/10 text-highlight font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Galería
          </span>
          <h2 id="gallery-heading" class="font-sans font-bold text-3xl md:text-4xl text-text-primary mb-4">
            Conoce nuestras <span class="text-primary">instalaciones</span>
          </h2>
        </div>

        <!-- Photo grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          @for (item of galleryItems; track item.label) {
            <div
              class="photo-card relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all"
              [style]="'background: linear-gradient(135deg, ' + item.gradient + ')'"
              [attr.aria-label]="'Foto de ' + item.label"
            >
              <!-- Gradient background and icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-16 h-16 text-white/30" [innerHTML]="item.icon" aria-hidden="true"></svg>
              </div>

              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <!-- Label -->
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <p class="photo-label text-white font-semibold">{{ item.label }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class GallerySectionComponent {
  protected readonly galleryItems: GalleryItem[] = [
    {
      label: 'Fachada Principal',
      gradient: '#1E3A5F, #2D5A87',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m0 0h-5.5m0 0H2m11-5a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>`,
    },
    {
      label: 'Recepción',
      gradient: '#C8102E, #F5A623',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>`,
    },
    {
      label: 'Salón de Clases',
      gradient: '#F5A623, #10B981',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>`,
    },
    {
      label: 'Parqueadero',
      gradient: '#10B981, #1E3A5F',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zm0-5V9m0 8v3m-5-9h12a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h12a2 2 0 012 2v5z" />
      </svg>`,
    },
  ];
}
