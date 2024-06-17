import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'analyze.result',
    loadComponent: () => import('./pages/analyze.result/analyze.result.page').then((m) => m.AnalyzeResultPage),
  },
  {
    path: 'text.result',
    loadComponent: () => import('./pages/text.result/text.result.page').then( m => m.TextResultPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  }
];