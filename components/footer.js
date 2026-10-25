/** Pie de página reutilizable; evita repetir marcado HTML. */
export function renderFooter() {
  const target = document.querySelector('#site-footer');
  if (!target) return;
  target.innerHTML = `<div class="shell footer-content">
    <div><strong>ServiceHub <span>360</span></strong><p>Conectamos necesidades con soluciones.</p></div>
    <div class="footer-links"><a href="index.html">Inicio</a><a href="servicios.html">Servicios</a><a href="contacto.html">Contacto</a></div>
    <small>© ${new Date().getFullYear()} ServiceHub 360 · Prototipo académico USS</small>
  </div>`;
}
