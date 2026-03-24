import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal, computed } from '@angular/core';

/**
 * Business hours schedule entry
 */
interface ScheduleEntry {
  days: string;
  hours: string;
  open: boolean;
}

/**
 * Service for managing business hours and open/closed status.
 * SSR-safe: uses isPlatformBrowser() to guard Date operations.
 */
@Injectable({
  providedIn: 'root',
})
export class BusinessHours {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Current time signal (updates on initialization, computed on demand)
   */
  protected readonly currentTime = signal<Date>(new Date());

  /**
   * Schedule data
   */
  protected readonly scheduleData = [
    { days: 'Lunes a Viernes', hours: '8:00 AM – 6:00 PM', open: true },
    { days: 'Sábados', hours: '8:00 AM – 2:00 PM', open: true },
    { days: 'Domingos', hours: 'Cerrado', open: false },
  ] as const;

  /**
   * Computed: current open/closed status
   * Returns 'open', 'closed', or 'unknown' (when browser unavailable for SSR)
   */
  readonly status = computed(() => {
    if (!isPlatformBrowser(this.platformId)) {
      return 'unknown' as const;
    }

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTimeInHours = hour + minute / 60;

    // Monday-Friday: 8:00 - 18:00
    if (day >= 1 && day <= 5) {
      return currentTimeInHours >= 8 && currentTimeInHours < 18 ? 'open' : 'closed';
    }

    // Saturday: 8:00 - 14:00
    if (day === 6) {
      return currentTimeInHours >= 8 && currentTimeInHours < 14 ? 'open' : 'closed';
    }

    // Sunday: always closed
    return 'closed' as const;
  });

  /**
   * Get human-readable status label
   */
  readonly statusLabel = computed(() => {
    const s = this.status();
    if (s === 'open') return 'Abierto ahora';
    if (s === 'closed') return 'Cerrado';
    return 'Horarios disponibles';
  });

  /**
   * Get schedule array
   */
  getSchedule(): readonly ScheduleEntry[] {
    return this.scheduleData;
  }

  /**
   * Check if currently open (returns false on server for SSR safety)
   */
  isOpenNow(): boolean {
    return this.status() === 'open';
  }
}
