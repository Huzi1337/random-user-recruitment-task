import { Routes } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'people', title: 'people', component: PeopleComponent },
  { path: 'about', title: 'about', component: AboutComponent },
  { path: '', redirectTo: 'people', pathMatch: 'full' },
];
