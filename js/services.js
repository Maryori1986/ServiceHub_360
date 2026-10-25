/** Carga dinámica desde JSON: los servicios no están embebidos en HTML. */
const icons = {
  monitor:'⌘', file:'▤', chart:'▥', headset:'◉', settings:'⚙', book:'▧'
};
const grid = document.querySelector('#services-grid');
const filter = document.querySelector('#category-filter');
const search = document.querySelector('#service-search');
const status = document.querySelector('#services-status');
let services = [];
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render() {
  const category = filter?.value || 'Todas';
  const query = search?.value.trim().toLocaleLowerCase('es') || '';
  const visible = services.filter(s => (category==='Todas'||s.categoria===category) &&
    (`${s.titulo} ${s.descripcion} ${s.categoria}`).toLocaleLowerCase('es').includes(query));
  grid.innerHTML = visible.map(s => `<article class="service-card">
    <span class="service-symbol" aria-hidden="true">${icons[s.icono] || '◈'}</span>
    <span class="eyebrow">${escapeHTML(s.categoria)}</span>
    <h3>${escapeHTML(s.titulo)}</h3><p>${escapeHTML(s.descripcion)}</p>
    <div class="service-bottom"><span>Tiempo referencial: ${escapeHTML(s.tiempo)}</span><a href="contacto.html?servicio=${encodeURIComponent(s.id)}" aria-label="Consultar sobre ${escapeHTML(s.titulo)}">Consultar ↗</a></div>
  </article>`).join('');
  status.textContent = visible.length ? `${visible.length} servicio${visible.length===1?'':'s'} disponible${visible.length===1?'':'s'}` : 'No se encontraron servicios. Prueba otro filtro o búsqueda.';
}
async function init() {
  try {
    const response = await fetch('./data/services.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Error HTTP '+response.status);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Formato JSON inesperado');
    services = data;
    const categories = [...new Set(services.map(s=>s.categoria))].sort((a,b)=>a.localeCompare(b,'es'));
    for (const category of categories) {
      const option = document.createElement('option'); option.value = category; option.textContent = category;
      filter.appendChild(option);
    }
    render();
  } catch(error) {
    console.error('No se pudo cargar services.json:', error);
    status.textContent = 'No fue posible cargar los servicios. Comprueba que el sitio se abra mediante un servidor web y vuelve a intentar.';
    grid.innerHTML = '';
  }
}
filter?.addEventListener('change',render);
search?.addEventListener('input',render);
if(grid) init();
