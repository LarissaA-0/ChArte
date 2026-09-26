import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.css',
})
export class PostModal {
  titulo = '';
  descricao = '';

  categoria = '';
  estilo = '';

  compravel = false;
  preco: number | null = null;

  categorias = [
    { id: 1, nome: 'Ilustração' },
    { id: 2, nome: 'Pixel Art' },
    { id: 3, nome: '3D' },
    { id: 4, nome: 'Animação' },
    { id: 5, nome: 'Pintura' },
  ];

  estilos = [
    { id: 1, nome: 'Anime' },
    { id: 2, nome: 'Cartoon' },
    { id: 3, nome: 'Realista' },
    { id: 4, nome: 'Conceitual' },
    { id: 5, nome: 'Minimalista' },
  ];

  constructor(private modalService: ModalService) {}

  fecharModal(): void {
    this.modalService.closeModal();
  }

  publicarPostagem(): void {
    const postagem = {
      titulo: this.titulo,
      descricao: this.descricao,
      categoria: this.categoria,
      estilo: this.estilo,
      compravel: this.compravel,
      preco: this.compravel ? this.preco : null,
    };

    console.log(postagem);

    this.modalService.closeModal();
  }

  imagemSelecionada: File | null = null;

  selecionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];

      console.log('Imagem selecionada:', this.imagemSelecionada);
    }
  }
}
