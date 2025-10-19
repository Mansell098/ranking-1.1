let players = [];

async function fetchRanking() {
  try {
    const res = await fetch('players.json');
    players = await res.json();
    // adicionar score placeholders para teste
    players = players.map(p => ({
      ...p,
      psnScore: p.psn ? 1000 : 0,
      xboxScore: p.xbox ? 800 : 0,
      steamScore: p.steamId ? 1200 : 0,
      retroScore: p.retroUser ? 1500 : 0,
      total: (p.psn ? 1000 : 0) + (p.xbox ? 800 : 0) + (p.steamId ? 1200 : 0) + (p.retroUser ? 1500 : 0)
    }));
    renderTable(players, 'total');
  } catch(err) {
    console.error('Erro ao carregar ranking:', err);
  }
}

function renderTable(data, platform) {
  const tbody = document.querySelector('#ranking tbody');
  const sorted = [...data].sort((a,b) => (b[platform] || 0) - (a[platform] || 0));
  tbody.innerHTML = sorted.map((p,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${p.nome}</td>
      <td><a href="https://psnprofiles.com/${p.psn}" target="_blank">${p.psnScore}</a></td>
      <td><a href="https://account.xbox.com/Profile?gamertag=${p.xbox}" target="_blank">${p.xboxScore}</a></td>
      <td><a href="https://steamcommunity.com/profiles/${p.steamId}" target="_blank">${p.steamScore}</a></td>
      <td><a href="https://retroachievements.org/user/${p.retroUser}" target="_blank">${p.retroScore}</a></td>
      <td><strong>${p.total}</strong></td>
    </tr>
  `).join('');
}

document.getElementById('platform-filter').addEventListener('change', (e)=>{
  const platform = e.target.value; // total, psn, xbox, steam, retro
  renderTable(players, platform);
});

fetchRanking();
