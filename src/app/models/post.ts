export interface Post {
  id: number;

  titulo: string;
  descricao: string;
  portfolio: string;
  nomeArtistico: string;
  preco: number;

  usuario: {
    id: number;
    artistaId: number;
    nomeArtistico: string;
    fotoPerfil: string;
  };
  categoria: {
    id: number;
    nomeCategoria: string;
  };
}
