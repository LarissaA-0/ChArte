<script src="https://cdn.jsdelivr.net/npm/dragscroll@0.0.8/dragscroll.min.js"></script>;

export function SwipeableCards() {
  const container = document.querySelector(".swipeableCards");
  if (!container) return;

  container.innerHTML = categorias
    .map((c) => `<a href="${c.link}" class="card">${c.nome}</a>`)
    .join("");
}

const categorias = [
  { nome: "Ilustrações", link: "/ilustracoes" },
  { nome: "Personagens / OC", link: "/personagens" },
  { nome: "Concept Art", link: "/concept-art" },
  { nome: "Background", link: "/background" },
  { nome: "Original", link: "/original" },
  { nome: "Fanart", link: "/fanart" },
  { nome: "Animação 2D", link: "/animacao-2d" },
  { nome: "Animação 3D", link: "/animacao-3d" },
];

const container = document.querySelector(".swipeableCards");

container.innerHTML = categorias
  .map((c) => `<a href="${c.link}" class="card">${c.nome}</a>`)
  .join("");

alert("JS rodou");
