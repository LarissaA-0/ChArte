import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { PinCard } from '../../components/pin-card/pin-card';
import { PinService } from '../../../services/pinService';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Sidebar } from '../../components/profile/sidebar/sidebar';
import { PerfilMenu } from '../../components/profile/perfil-menu/perfil-menu';
import { Banner } from '../../components/banner/banner';

@Component({
  selector: 'app-artist-profile',
  imports: [SearchBar, PinCard, PinCardModal, Sidebar, PerfilMenu, Banner],
  templateUrl: './artist-profile.html',
  styleUrl: './artist-profile.css',
})
export class ArtistProfile {}
