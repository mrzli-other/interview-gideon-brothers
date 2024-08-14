import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { RobotTypesComponent } from '../app/robot-types/robot-types.component';
import { RobotsComponent } from '../app/robots/robots.component';
import { NotFoundComponent } from '../app/not-found/not-found.component';
import { UpdateRobotTypeComponent } from '../app/robot-types/update-robot-type/update-robot-type.component';
import { RobotTypeListComponent } from '../app/robot-types/robot-type-list/robot-type-list.component';
import { UpdateRobotComponent } from '../app/robots/update-robot/update-robot.component';
import { RobotListComponent } from '../app/robots/robot-list/robot-list.component';
import { CreateRobotTypeComponent } from '../app/robot-types/create-robot-type/create-robot-type.component';
import { CreateRobotComponent } from '../app/robots/create-robot/create-robot.component';

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
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'robot-types',
    title: 'Robot Types',
    component: RobotTypesComponent,
    data: {
      title: 'Robot Types',
    },
    children: [
      {
        path: '',
        title: 'Robot Type List',
        component: RobotTypeListComponent,
      },
      {
        path: 'create',
        title: 'Create Robot Type',
        component: CreateRobotTypeComponent,
      },
      {
        path: 'update/:id',
        title: 'Update Robot Type',
        component: UpdateRobotTypeComponent,
      },
    ],
  },
  {
    path: 'robots',
    title: 'Robots',
    component: RobotsComponent,
    data: {
      title: 'Robots',
    },
    children: [
      {
        path: '',
        title: 'Robot List',
        component: RobotListComponent,
      },
      {
        path: 'create',
        title: 'Create Robot',
        component: CreateRobotComponent,
      },
      {
        path: 'update/:id',
        title: 'Update Robot',
        component: UpdateRobotComponent,
      },
    ],
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundComponent,
  },
];
