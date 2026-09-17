import { Injectable } from '@angular/core';
import { Post } from '../app/models/post';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  adicionar(post: Post) {
    // adiciona a arte ao carrinho
  }

  remover(postId: number) {
    // remove do carrinho
  }

  listar() {
    // retorna itens
  }

  limpar() {
    // limpa carrinho
  }
}
