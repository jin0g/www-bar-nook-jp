const grid = document.querySelector('.bar-grid');
const searchPanel = document.querySelector('.search-panel');
const searchInput = document.querySelector('#bar-search');
const emptyMessage = document.querySelector('.empty-message');
let tenants = [];

function cardTemplate(tenant, index) {
  const position = `${18 + ((index * 19) % 64)}% ${28 + ((index * 13) % 48)}%`;
  return `
    <article class="bar-card">
      <div class="bar-photo">
        <img src="${tenant.image}" alt="${tenant.name}のイメージ" style="object-position:${position}">
      </div>
      <div class="bar-content">
        <h3>${tenant.name}</h3>
        <p>${tenant.description}</p>
        <div class="bar-meta"><span>${tenant.area}</span><span>${tenant.walk}</span></div>
      </div>
    </article>`;
}

function render(items) {
  grid.innerHTML = items.map((tenant) => cardTemplate(tenant, tenants.indexOf(tenant))).join('');
  emptyMessage.hidden = items.length > 0;
}

fetch('/tenants.json')
  .then((response) => response.json())
  .then((data) => {
    tenants = data;
    render(tenants);
  })
  .catch(() => {
    grid.innerHTML = '<p class="empty-message">店舗情報を読み込めませんでした</p>';
  });

document.querySelector('[data-scroll]').addEventListener('click', () => {
  document.querySelector('#bars').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('[data-search]').addEventListener('click', () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchInput.focus();
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  render(tenants.filter((tenant) => Object.values(tenant).join(' ').toLowerCase().includes(query)));
});
