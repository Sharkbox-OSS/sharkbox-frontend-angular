import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoxComponent } from './box/box.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'box/:slug',
    component: BoxComponent
  }
];
