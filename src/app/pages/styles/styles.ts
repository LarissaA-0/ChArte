import { Component } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Card } from '../../components/card/card';
import { CardSm } from '../../components/card-sm/card-sm';
import { SwipeablesCards } from '../../components/swipeables-cards/swipeables-cards';
import { PinCard } from '../../components/pin-card/pin-card';
import { Post } from '../../models/post';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { ModalService } from '../../../services/modal.service';
import { PinService } from '../../../services/pinService';

@Component({
  selector: 'app-styles',
  imports: [
    SearchBar,
    Card,
    CardSm,
    SwipeablesCards,
    PinCard,
    ArtistLoginModal,
    SubMenu,
    PinCardModal,
  ],
  templateUrl: './styles.html',
  styleUrl: './styles.css',
})
export class Styles {}
