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
  estilo = [
    { nome: 'Ilustração', imagem: 'assets/ilustracao.jpg' },
    { nome: 'Concept Art', imagem: 'assets/concept.jpg' },
    { nome: 'Background', imagem: 'assets/background.jpg' },
    { nome: 'Fanart', imagem: 'assets/fanart.jpg' },
    { nome: 'Animação 2D', imagem: 'assets/2d.jpg' },
    { nome: 'Animação 3D', imagem: 'assets/3d.jpg' },
  ];
  categorias = [
    { nome: 'Ilustração', imagem: 'assets/ilustracao.jpg' },
    { nome: 'Background', imagem: 'assets/background.jpg' },
    { nome: 'Original', imagem: 'assets/original.jpg' },
    { nome: 'Fanart', imagem: 'assets/fanart.jpg' },
  ];
}
