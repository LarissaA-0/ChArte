import { Component } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Post } from '../../models/post';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { PinCard } from '../../components/pin-card/pin-card';
import { PinService } from '../../../services/pinService';
import { UserLoginModal } from '../../components/user-login-modal/user-login-modal';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-favorites-page',
  imports: [SearchBar, PinCard, PinCardModal, UserLoginModal, SubMenu, ArtistLoginModal],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPage {
  constructor(
    public modal: ModalService,
    private pinService: PinService,
  ) {}
}
