import { Routes } from '@angular/router';
import { ComponentWrapComponent } from './component-wrap/component-wrap.component';

export const routes: Routes = [
  {
   path: '',
   component: ComponentWrapComponent 
  },
  {
    path: 'component-a',
    loadComponent: () => import('./component-a/component-a.component').then((c) => c.ComponentAComponent)
  },
  {
    path: 'component-b',
    loadComponent: () => import('./component-b/component-b.component').then((c) => c.ComponentBComponent)
  },
  {
    path: 'component-c',
    loadComponent: () => import('./component-c/component-c.component').then((c) => c.ComponentCComponent)
  }
];
