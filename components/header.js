/** Encabezado reutilizable compartido por todas las páginas. */
export function renderHeader(active = '') {
  const target = document.querySelector('#site-header');
  if (!target) return;
  const links = [
    { href: 'index.html', key: 'inicio', label: 'Inicio' },
    { href: 'servicios.html', key: 'servicios', label: 'Servicios' },
    { href: 'contacto.html', key: 'contacto', label: 'Contacto' }
  ];
  target.innerHTML = `
    <div class="shell header-content">
      <a class="brand" href="index.html" aria-label="ServiceHub 360, ir al inicio">
        <span class="brand-icon" aria-hidden="true">S<span class="brand-dot">•</span></span>
        <span><strong>ServiceHub <em>360</em></strong><small>Portal de servicios</small></span>
      </a>
      <button id="nav-toggle" class="nav-toggle" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Abrir menú">☰</button>
      <nav id="main-nav" class="nav" aria-label="Navegación principal">
        ${links.map(({href,key,label})=>`<a href="${href}" ${active===key?'aria-current="page"':''}>${label}</a>`).join('')}
        <a class="nav-cta" href="contacto.html">Solicitar orientación <span aria-hidden="true">↗</span></a>
      </nav>
    </div>`;
  const button = target.querySelector('#nav-toggle');
  const nav = target.querySelector('#main-nav');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
    nav.classList.toggle('is-open', !expanded);
  });
}
