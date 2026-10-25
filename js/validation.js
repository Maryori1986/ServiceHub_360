/** Validación del formulario. Sitio estático: no envía mensajes ni persiste datos. */
const form = document.querySelector('#contact-form');
const summary = document.querySelector('#form-feedback');
const service = document.querySelector('#service');
const errors = {};
const validators = {
  nombre: v => v.trim().length >= 3 ? '' : 'Ingresa tu nombre (mínimo 3 caracteres).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresa un correo electrónico válido.',
  service: v => v ? '' : 'Selecciona un servicio.',
  mensaje: v => v.trim().length >= 15 ? '' : 'Describe tu consulta con al menos 15 caracteres.',
  consentimiento: (_,el) => el.checked ? '' : 'Debes aceptar el aviso para continuar.'
};
function validate(field) {
  const el = form.elements.namedItem(field);
  const message = validators[field](el.value,el);
  const error = document.querySelector(`[data-error="${field}"]`);
  error.textContent = message;
  el.setAttribute('aria-invalid',String(Boolean(message)));
  errors[field] = message;
  return !message;
}
async function loadServiceOptions() {
  try {
    const response=await fetch('./data/services.json');
    if(!response.ok) throw Error(`HTTP ${response.status}`);
    const data=await response.json();
    for (const item of data) {
      const option=document.createElement('option'); option.value=item.id; option.textContent=item.titulo;
      service.appendChild(option);
    }
    const selected = new URLSearchParams(window.location.search).get('servicio');
    if (selected && data.some(item=>item.id===selected)) service.value=selected;
  } catch(error) {
    console.error('No se pudieron cargar los servicios:',error);
    summary.textContent='No se pudo cargar el catálogo. Vuelve a abrir el sitio desde un servidor web.';
    summary.className='feedback error';
  }
}
if(form) {
  loadServiceOptions();
  Object.keys(validators).forEach(name=>{
    const el=form.elements.namedItem(name);
    el.addEventListener(name==='consentimiento'?'change':'blur',()=>validate(name));
    el.addEventListener('input',()=>{if(errors[name])validate(name)});
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const ok = Object.keys(validators).map(validate).every(Boolean);
    if (!ok) {
      summary.textContent='Revisa los campos señalados antes de continuar.';
      summary.className='feedback error';
      const first = Object.keys(validators).find(key=>errors[key]);
      form.elements.namedItem(first)?.focus();
      return;
    }
    summary.textContent='Formulario validado correctamente. Esta versión académica no envía solicitudes ni almacena datos.';
    summary.className='feedback success';
    form.reset();
    Object.keys(validators).forEach(name=>form.elements.namedItem(name).removeAttribute('aria-invalid'));
  });
}
