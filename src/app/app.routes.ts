import { Routes } from '@angular/router';
import { HeartPageComponent } from './components/heart-page/heart-page';
import { HomePageComponent } from './components/home-page/home-page';
import { SimpleHeartComponent } from './components/simple-heart/simple-heart';

export const routes: Routes = [
  { path: 'heart', component: HeartPageComponent },
  { path: 'simple-heart', component: SimpleHeartComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: '/home' }
];
