document.addEventListener("DOMContentLoaded", async () => {
  const filmes = await buscarFilmes();
  carregarCarrossel(filmes);
  carregarCards(filmes);
});

function carregarCarrossel(filmes) {
  const carouselContainer = document.getElementById("carousel-items");
  let ativo = true;
  carouselContainer.innerHTML = '';

  filmes.filter(filme => filme.destaque).forEach(filme => {
    const item = document.createElement("div");
    item.className = `carousel-item ${ativo ? "active" : ""}`;
    ativo = false;

    item.innerHTML = `
      <img src="${filme.imagem}" class="d-block w-100" alt="${filme.titulo}">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>${filme.titulo}</h5>
        <p>${filme.descricao}</p>
      </div>
    `;
    carouselContainer.appendChild(item);
  });
}

function carregarCards(filmes) {
  const cardsContainer = document.getElementById("cards-filmes");
  cardsContainer.innerHTML = '';

  filmes.forEach(filme => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.descricao}</p>
        </div>
        <div class="card-footer text-center">
          <a href="detalhes.html?id=${filme.id}" class="btn btn-primary">Ver Detalhes</a>
        </div>
      </div>
    `;
    cardsContainer.appendChild(col);
  });
}
