async function fetchFilmes() {
  const response = await fetch('http://localhost:3000/filmes');
  return await response.json();
}

function agruparDados(filmes) {
  const generoCount = {};
  const somaAvaliacoes = {};
  const totalPorGenero = {};

  filmes.forEach(filme => {
    const genero = filme.genero;

    // Contagem de filmes por gênero
    generoCount[genero] = (generoCount[genero] || 0) + 1;

    // Somar avaliações para cálculo de média
    somaAvaliacoes[genero] = (somaAvaliacoes[genero] || 0) + filme.avaliacao;
    totalPorGenero[genero] = (totalPorGenero[genero] || 0) + 1;
  });

  // Cálculo da média
  const mediaAvaliacao = {};
  for (let genero in somaAvaliacoes) {
    mediaAvaliacao[genero] = somaAvaliacoes[genero] / totalPorGenero[genero];
  }

  return { generoCount, mediaAvaliacao };
}

function gerarGraficos(generoCount, mediaAvaliacao) {
  const cores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  // Gráfico de Pizza: Distribuição por Gênero
  new Chart(document.getElementById('graficoGenero'), {
    type: 'pie',
    data: {
      labels: Object.keys(generoCount),
      datasets: [{
        data: Object.values(generoCount),
        backgroundColor: cores
      }]
    }
  });

  // Gráfico de Barras: Média de Avaliação
  new Chart(document.getElementById('graficoNota'), {
    type: 'bar',
    data: {
      labels: Object.keys(mediaAvaliacao),
      datasets: [{
        label: 'Média de Avaliação',
        data: Object.values(mediaAvaliacao),
        backgroundColor: cores
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  });
}

async function main() {
  const filmes = await fetchFilmes();
  const { generoCount, mediaAvaliacao } = agruparDados(filmes);
  gerarGraficos(generoCount, mediaAvaliacao);
}

main();
