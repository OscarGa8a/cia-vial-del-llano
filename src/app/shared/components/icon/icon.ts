import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

/** Supported icon library types. */
type IconType = 'material' | 'lucide' | 'custom';

/**
 * Reusable icon component that supports multiple icon libraries.
 *
 * Provides a unified interface for displaying icons from different sources
 * with customizable size, color, and stroke width.
 *
 * @example
 * ```typescript
 * <app-icon [lucideIcon]="SearchIcon" [size]="32" />
 * <app-icon [lucideIcon]="MenuIcon" [strokeWidth]="3" [color]="'#883B04'" />
 * ```
 */
@Component({
  selector: 'app-icon',
  imports: [LucideAngularModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  /** Icon library source to use. */
  readonly source = input<IconType>('lucide');

  /** Lucide icon data reference. */
  readonly lucideIcon = input<LucideIconData | undefined>(undefined);

  readonly name = input<string | undefined>(undefined);

  /** Icon size in pixels. */
  readonly size = input<number>(24);

  /** Icon color. Uses currentColor by default to inherit from parent. */
  readonly color = input<string>('currentColor');

  /** Stroke width for the icon lines. */
  readonly strokeWidth = input<number>(2);

  /** Additional CSS classes to append to the SVG element. */
  readonly className = input<string>('');
}
