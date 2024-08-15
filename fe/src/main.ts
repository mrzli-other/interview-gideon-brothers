import { bootstrapApplication } from '@angular/platform-browser';
import { createAppConfig } from './config/app.config';
import { AppComponent } from './components/app.component';

bootstrapApplication(AppComponent, createAppConfig()).catch((err) =>
  console.error(err),
);
