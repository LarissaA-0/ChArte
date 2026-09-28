import { Post } from '../models/post';

export const MOCK_ARTES: Post[] = [
  {
    id: 1,
    titulo: 'Batman',
    descricao: 'Ilustração sombria do Cavaleiro das Trevas.',
    portfolio: 'batman.jpeg',
    nomeArtistico: 'Muzzle',
    preco: 12.99,
    usuario: {
      id: 1,
      artistaId: 1,
      nomeUsuario: 'muzzle',
      nomeArtistico: 'Muzzle',
      fotoPerfil: 'assets/imagens/perfil.jpg',
    },
    categoria: {
      id: 1,
      nomeCategoria: 'Ilustração',
    },
  },
  {
    id: 2,
    titulo: 'Frieren',
    descricao: 'Fanart da Frieren além do fim da jornada.',
    portfolio: 'frieren.jpeg',
    nomeArtistico: 'YasArt',
    preco: 25.0,
    usuario: {
      id: 3,
      artistaId: 2,
      nomeUsuario: 'yasart',
      nomeArtistico: 'YasArt',
      fotoPerfil: 'frieren.jpeg',
    },
    categoria: {
      id: 2,
      nomeCategoria: 'Fanart',
    },
  },
  {
    id: 3,
    titulo: 'Nimona',
    descricao: 'Ilustração digital da personagem Nimona.',
    portfolio: 'nimona.jpeg',
    nomeArtistico: 'YasArt',
    preco: 18.5,
    usuario: {
      id: 3,
      artistaId: 2,
      nomeUsuario: 'yasart',
      nomeArtistico: 'YasArt',
      fotoPerfil: 'frieren.jpeg',
    },
    categoria: {
      id: 1,
      nomeCategoria: 'Ilustração',
    },
  },
];

