import { Component } from '@angular/core';
//descobre infos da URL atual
import { ActivatedRoute } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
import { PinCard } from '../../components/pin-card/pin-card';
import { Post } from '../../models/post';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';

//Serviços
import { PinService } from '../../../services/pinService';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SearchBar, PinCard, PinCardModal],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  //variavel categoria. Garda a categoria da URL
  categoria!: string;

  //Lista de pins que o back responde
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
        nomeCategoria: 'Ilustração',
      },

      curtidas: 0,
    },
  ];

  //função que recebe dependecias de um obj
  constructor(
    private route: ActivatedRoute,
    private PinService: PinService,
  ) {}

  ngOnInit() {
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;

    this.posts = this.posts.filter((post) => post.categoria.nomeCategoria === this.categoria);
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
