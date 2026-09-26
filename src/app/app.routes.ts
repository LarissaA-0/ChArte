import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Category } from './pages/category/category';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { ArtistProfile } from './pages/artist-profile/artist-profile';
import { Styles } from './pages/styles/styles';
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'categoria/:categoria',
    component: Category,
  },
  {
    path: 'carrinho',
    component: FavoritesPage,
  },
  {
    path: 'perfil',
    component: ArtistProfile,
  },
  {
    path: 'estilo/:estilo',
    component: Styles,
  },
  {
    path: 'perfil/:nomeUsuario',
    component: ArtistProfile,
  },
];
