import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { RobotTypesComponent } from '../app/robot-types/robot-types.component';
import { RobotsComponent } from '../app/robots/robots.component';
import { NotFoundComponent } from '../app/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
  },
  {
    path: 'robot-types',
    title: 'Robot Types',
    component: RobotTypesComponent,
  },
  {
    path: 'robots',
    title: 'Robots',
    component: RobotsComponent,
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundComponent,
  },
];
