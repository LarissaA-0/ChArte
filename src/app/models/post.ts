export interface Post {
  id: number;

  titulo: string;
  descricao: string;
  portfolio: string;
  nomeArtistico: string;

  usuario: {
    id: number;
    artista: string;
    fotoPerfil: string;
  };
  categoria: {
    id: number;
    nomeCategoria: string;
  };

  curtidas: number;
}
