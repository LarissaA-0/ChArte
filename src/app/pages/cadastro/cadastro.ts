import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuario } from '../../mocks/usuarios.mock';
import { AuthService } from '../../../services/auth.service';

interface SlotGaleria {
  imagem: string;
  direcao: 'up' | 'down';
  duracao: string;
  atraso: string;
  tamanho: number;
}

interface LinhaGaleria {
  itens: SlotGaleria[];
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  nome = '';
  nomeArtistico = '';
  nomeUsuario = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mostrarSenha = false;
  mostrarConfirmarSenha = false;
  tipoUsuario: TipoUsuario = 'Comum';
  erro = '';
  carregando = false;

  readonly tipos: TipoUsuario[] = ['Comum', 'Artista'];

  private readonly imagensGaleria = [
    '/styles-icons/fantasy_style.jpeg',
    '/styles-icons/Manga_style.jpeg',
    '/styles-icons/pop-art_style.jpeg',
    '/styles-icons/kawaii_style.jpeg',
    '/styles-icons/realismo_style.jpeg',
    '/styles-icons/sci-fi_style.jpeg',
    '/styles-icons/cartoon_style.jpeg',
    '/styles-icons/gotico_style.jpeg',
    '/styles-icons/chibi_style.jpeg',
    '/styles-icons/noir_style.jpeg',
    '/styles-icons/Y2K_style.jpeg',
    '/styles-icons/kemonomimi_style.jpeg',
    '/styles-icons/semi-realismo_style.jpeg',
    '/styles-icons/grunge_style.jpeg',
    '/styles-icons/cute_style.jpeg',
    '/styles-icons/horror_style.jpeg',
  ];

  readonly galeria: LinhaGaleria[] = Array.from({ length: 4 }, (_, coluna) => {
    const tamanhos = [
      [1.5, 0.65, 1, 1.5],
      [1, 1.5, 1, 0.65],
      [0.65, 1, 1.5, 1],
      [1.5, 1, 0.65, 1.5],
    ][coluna];

    return {
      itens: tamanhos.map((tamanho, indice) => ({
        imagem: this.imagensGaleria[(coluna * tamanhos.length + indice) % this.imagensGaleria.length],
        direcao: coluna % 2 === 0 ? ('up' as const) : ('down' as const),
        duracao: `${(18 + coluna * 2.5).toFixed(2)}s`,
        atraso: `${(coluna * 1.1).toFixed(2)}s`,
        tamanho,
      })),
    };
  });

  constructor(private auth: AuthService, private router: Router) {}

  rotuloTipo(tipo: TipoUsuario): string {
    return tipo === 'Artista' ? 'Artista' : 'Usuário';
  }

  async criarConta(): Promise<void> {
    this.erro = '';
    const emailNormalizado = this.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
      this.erro = 'Digite um e-mail válido, como voce@email.com.';
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não conferem.';
      return;
    }
    this.carregando = true;
    try {
      const sessao = await this.auth.registrar({
        nome: this.nome,
        nomeArtistico: this.nomeArtistico,
        nomeUsuario: this.nomeUsuario,
        email: emailNormalizado,
        senha: this.senha,
        tipoUsuario: this.tipoUsuario,
      });
      if (!sessao) {
        this.erro = 'Não foi possível criar a conta. Verifique os dados e se o e-mail ou usuário já estão cadastrados.';
        return;
      }
      void this.router.navigate(
        sessao.tipoUsuario === 'Artista' ? ['/artista'] : ['/perfil', sessao.nomeUsuario],
      );
    } finally {
      this.carregando = false;
    }
  }
}
