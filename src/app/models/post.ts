export interface Post {
  id: number;

  titulo: string;
  descricao: string;
  portfolio: string;
  nomeArtistico: string;
  preco: number;
  estilo?: string;

  usuario: {
    id: number;
    artistaId: number;
    nomeUsuario?: string;
    nomeArtistico: string;
    fotoPerfil: string;
  };
  categoria: {
    id: number;
    nomeCategoria: string;
  };
}
