import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'CIA Vial del Llano | Cursos para Descuento en Comparendos',
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/courses/courses.component').then((m) => m.CoursesComponent),
    title: 'Curso Pedagógico | CIA Vial del Llano',
  },
  {
    path: 'calculadora',
    loadComponent: () =>
      import('./pages/calculator/calculator.component').then(
        (m) => m.CalculatorComponent
      ),
    title: 'Calculadora de Multas | CIA Vial del Llano',
  },
  {
    path: 'ubicacion',
    loadComponent: () =>
      import('./pages/ubicacion/ubicacion.component').then(
        (m) => m.UbicacionComponent
      ),
    title: 'Ubicación | CIA Vial del Llano',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
