const API_BASE = 'https://api.consumet.org/anime/zoro';

async function fetchAnime(endpoint) {
  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results;
}

function displayAnime(containerId, animeList) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  animeList.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" />
      <h3>${anime.title}</h3>
    `;
    card.onclick = () => window.open(anime.id, '_blank');
    container.appendChild(card);
  });
}

// Load Trending
fetchAnime(`${API_BASE}/popular/1`).then(list => displayAnime('trendingGrid', list));
// Load Recent
fetchAnime(`${API_BASE}/recent-release/1`).then(list => displayAnime('recentGrid', list));
// Load Top
fetchAnime(`${API_BASE}/top-airing/1`).then(list => displayAnime('topGrid', list));

// Search functionality
document.getElementById('searchInput').addEventListener('input', async (e) => {
  const query = e.target.value;
  if (!query) return;
  const results = await fetchAnime(`${API_BASE}/search?title=${query}`);
  displayAnime('trendingGrid', results);
});
