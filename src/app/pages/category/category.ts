import { Component } from '@angular/core';
//descobre infos da URL atual
import { ActivatedRoute } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
import { PinCard } from '../../components/pin-card/pin-card';
import { Post } from '../../models/post';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { UserLoginModal } from '../../components/user-login-modal/user-login-modal';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { ModalService } from '../../../services/modal.service';
import { PinService } from '../../../services/pinService';
import { submit } from '@angular/forms/signals';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SearchBar, PinCard, PinCardModal, ArtistLoginModal, UserLoginModal, SubMenu],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  //variavel categoria. Garda a categoria da URL
  artes: Post[] = [];
  categoria!: string;

  //função que recebe dependecias de um obj
  constructor(
    private route: ActivatedRoute,
    private PinService: PinService,
  ) {}

  ngOnInit() {
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;

    this.artes = this.artes.filter((post) => post.categoria.nomeCategoria === this.categoria);
  }
  /*
  //carregar dados
  ngOnInit() {
    //faz o angular ver a url como uma variavel
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    //fala pro backend buscar por categroia pega na url
    this.PinService.buscarPorCategoria(this.categoria).subscribe((pins) => {
      this.posts = pins;
    });
  }*/
}
