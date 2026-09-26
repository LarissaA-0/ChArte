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
import { ModalService } from '../../../services/modal.service';
import { PinService } from '../../../services/pinService';
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
  constructor(
    public modal: ModalService,
    private pinService: PinService,
  ) {}
  artes: Post[] = [
    {
      id: 1,
      titulo: 'Batman',
      descricao: '',
      portfolio: 'batman.jpeg',
      nomeArtistico: 'Larissa',
      preco: 12.99,
      usuario: {
        id: 1,
        artistaId: 2,
        nomeArtistico: 'Larissa',
        fotoPerfil: 'batman.jpeg',
      },

      categoria: {
        id: 1,
        nomeCategoria: 'Ilustração',
      },
    },
    {
      id: 2,
      titulo: 'Frieren',
      descricao: 'Fanart da Frieren',
      portfolio: 'frieren.jpeg',
      nomeArtistico: 'Yasmin',
      preco: 0.0,
      usuario: {
        id: 2,
        artistaId: 2,
        nomeArtistico: 'YasArt',
        fotoPerfil: 'frieren.jpeg',
      },

      categoria: {
        id: 2,
        nomeCategoria: 'Fanart',
      },
    },
    {
      id: 3,
      titulo: 'Nimona',
      descricao: 'Ilustração da personagem Nimona',
      portfolio: 'nimona.jpeg',
      nomeArtistico: 'Carol',
      preco: 0.0,

      usuario: {
        id: 3,
        artistaId: 2,
        nomeArtistico: 'CarolArt',
        fotoPerfil: 'nimona.jpeg',
      },

      categoria: {
        id: 1,
        nomeCategoria: 'Ilustração',
      },
    },
  ];
  postSelecionado!: Post;

  /*como
  openPinModal(post: Post) {
    this.modal.selecionarPost(post);
    this.modal.openModal('pinModal');
  }*/

  openPinModal(pin: Post) {
    console.log('POST CLICADO:', pin);

    this.modal.selecionarPost(pin);
    this.modal.openModal('pinModal');
  }
}
