import { Routes } from '@angular/router';
import { PeopleComponent } from './features/people/people.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  { path: 'people', title: 'people', component: PeopleComponent },
  { path: 'about', title: 'about', component: AboutComponent },
  { path: '', redirectTo: 'people', pathMatch: 'full' },
];
