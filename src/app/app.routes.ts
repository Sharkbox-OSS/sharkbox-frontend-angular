import { Routes } from '@angular/router';
import { BoxListComponent } from './box/box-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoxComponent } from './box/box.component';

export const routes: Routes = [
  {
    path: '',
    component: BoxListComponent
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
