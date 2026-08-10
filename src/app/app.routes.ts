import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Category } from './pages/category/category';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'categoria/:categoria',
    component: Category,
  },
];
