import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'CIA Vial del Llano | Cursos para Descuento en Comparendos',
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/courses/courses').then((m) => m.CoursesComponent),
    title: 'Curso Pedagógico | CIA Vial del Llano',
  },
  {
    path: 'calculadora',
    loadComponent: () => import('./pages/calculator/calculator').then((m) => m.Calculator),
    title: 'Calculadora de Multas | CIA Vial del Llano',
  },
  {
    path: 'ubicacion',
    loadComponent: () => import('./pages/ubication/ubication').then((m) => m.Ubication),
    title: 'Ubicación | CIA Vial del Llano',
  },
  {
    path: 'preguntas-frecuentes',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
    title: 'Preguntas Frecuentes | CIA Vial del Llano',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'Nosotros | CIA Vial del Llano',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contacto | CIA Vial del Llano',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
