import type { Infraction } from '../models/infraction.model';

/**
 * Static list of Colombian traffic infractions (Ley 769 de 2002 and updates).
 * Monetary value = infraction.smdlv × CONFIG.smdlvDaily2025 — computed at runtime.
 */
export const INFRACTIONS: readonly Infraction[] = [
  // --- Categoría A (4 SMDLV) ---
  {
    code: 'A01',
    description: 'No transitar por la derecha en vías de doble sentido',
    category: 'A',
    smdlv: 4,
  },
  {
    code: 'A08',
    description: 'Conducir sobre andenes, separadores o zonas verdes',
    category: 'A',
    smdlv: 4,
  },
  {
    code: 'A12',
    description: 'No usar cinturón de seguridad',
    category: 'A',
    smdlv: 4,
  },

  // --- Categoría B (8 SMDLV) ---
  {
    code: 'B01',
    description: 'Conducir sin licencia de conducción',
    category: 'B',
    smdlv: 8,
  },
  {
    code: 'B02',
    description: 'Conducir con licencia de conducción vencida',
    category: 'B',
    smdlv: 8,
  },
  {
    code: 'B14',
    description: 'Usar el teléfono celular mientras se conduce',
    category: 'B',
    smdlv: 8,
  },

  // --- Categoría C (15 SMDLV) ---
  {
    code: 'C02',
    description: 'Estacionar en sitio prohibido o zona de parqueo exclusivo',
    category: 'C',
    smdlv: 15,
  },
  {
    code: 'C14',
    description: 'Transitar en horarios o zonas prohibidas (Pico y Placa)',
    category: 'C',
    smdlv: 15,
  },
  {
    code: 'C29',
    description: 'Conducir a velocidad superior a la máxima permitida',
    category: 'C',
    smdlv: 15,
  },
  {
    code: 'C35',
    description: 'No realizar revisión técnico-mecánica y de gases',
    category: 'C',
    smdlv: 15,
  },

  // --- Categoría D (30 SMDLV) ---
  {
    code: 'D02',
    description: 'Conducir vehículo sin SOAT vigente',
    category: 'D',
    smdlv: 30,
  },
  {
    code: 'D04',
    description: 'No detenerse ante señal de semáforo en rojo',
    category: 'D',
    smdlv: 30,
  },
  {
    code: 'D05',
    description: 'Conducir en sentido contrario al tráfico (contravía)',
    category: 'D',
    smdlv: 30,
  },

  // --- Categoría E (45 SMDLV) ---
  {
    code: 'E03',
    description: 'Conducir bajo el efecto de bebidas alcohólicas o sustancias psicoactivas',
    category: 'E',
    smdlv: 45,
  },
] as const;
