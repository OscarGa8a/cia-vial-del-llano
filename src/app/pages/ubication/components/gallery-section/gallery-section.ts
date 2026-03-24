import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface GalleryItem {
  /** Display label shown under each gallery image. */
  label: string;

  /** Cloudinary image identifier used to build the image URL. */
  image: string;
}

/**
 * Displays a facility photo gallery for the location page.
 *
 * @example
 * ```html
 * <app-gallery-section />
 * ```
 */
@Component({
  selector: 'app-gallery-section',
  imports: [NgOptimizedImage],
  templateUrl: './gallery-section.html',
  styleUrl: './gallery-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySection {
  /** Gallery items rendered as location highlights in the photo grid. */
  protected readonly galleryItems: GalleryItem[] = [
    {
      label: 'Fachada Principal',
      image: 'IMG_2815_lmf9bl',
    },
    {
      label: 'Recepción',
      image: 'IMG_2834_skchgw',
    },
    {
      label: 'Salón de Clases',
      image: 'IMG_2805_fniavi',
    },
    {
      label: 'Parqueadero',
      image: 'IMG_2844_g39rse',
    },
  ];
}
