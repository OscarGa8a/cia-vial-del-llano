import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'CIA Vial del Llano | Cursos para Descuento en Comparendos',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
