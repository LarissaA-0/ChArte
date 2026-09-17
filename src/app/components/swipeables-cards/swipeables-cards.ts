import { Component } from '@angular/core';
import { Card } from '../card/card';
import { CardSm } from '../card-sm/card-sm';

@Component({
  selector: 'app-swipeables-cards',
  imports: [Card, CardSm],
  templateUrl: './swipeables-cards.html',
  styleUrl: './swipeables-cards.css',
})
export class SwipeablesCards {
  categorias = [
    { nome: 'Ilustração', imagem: 'assets/ilustracao.jpg', categoria: 'ilustração' },
    { nome: 'ConceptArt', imagem: 'assets/concept.jpg', categoria: '' },
    { nome: 'Background', imagem: 'assets/background.jpg', categoria: '' },
    { nome: 'Fanart', imagem: 'assets/fanart.jpg', categoria: '' },
    { nome: 'Animação 2D', imagem: 'assets/2d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg', categoria: '' },
  ];
  estilos = [
    { nome: 'Anime', imagem: 'assets/ilustracao.jpg' },
    { nome: 'Cartoon', imagem: 'assets/background.jpg' },
    { nome: 'Realismo', imagem: 'assets/original.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
    { nome: 'Semi Realismo', imagem: 'assets/fanart.jpg' },
  ];
}
