import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Category } from './pages/category/category';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { ArtistProfile } from './pages/artist-profile/artist-profile';
import { Styles } from './pages/styles/styles';
import { artistGuard } from '../services/guard';
import { ArtistAreaPage } from './pages/area-artista/artist-area-page/artist-area-page';
import { Cadastro } from './pages/cadastro/cadastro';
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
    path: 'cadastro',
    component: Cadastro,
  },
  {
    path: 'perfil',
    component: ArtistProfile,
  },
  {
    path: 'artista',
    component: ArtistAreaPage,
    canActivate: [artistGuard],
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
