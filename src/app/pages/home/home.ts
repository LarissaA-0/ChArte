import { Component } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Card } from '../../components/card/card';
import { CardSm } from '../../components/card-sm/card-sm';
import { SwipeablesCards } from '../../components/swipeables-cards/swipeables-cards';
import { PinCard } from '../../components/pin-card/pin-card';
import { Post } from '../../models/post';
import { UserLoginModal } from '../../components/user-login-modal/user-login-modal';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBar,
    Card,
    CardSm,
    SwipeablesCards,
    PinCard,
    UserLoginModal,
    SubMenu,
    ArtistLoginModal,
    PinCardModal,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  posts: Post[] = [
    {
      id: 1,
      titulo: 'Minha primeira arte',
      descricao: 'Arte para teste',
      portfolio: '_(1).jpeg',
      nomeArtistico: 'Larissa',

      usuario: {
        id: 1,
        artista: 'Larissa',
        fotoPerfil: 'assets/img/perfil.png',
      },

      categoria: {
        id: 1,
        nomeCategoria: 'Digital',
      },

      curtidas: 0,
    },
  ];
}
