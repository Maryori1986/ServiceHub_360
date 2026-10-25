# ServiceHub 360 — Taller Formativo USS

**Asignatura:** Aplicaciones y Tecnologías de la Web · Unidad 1, Semana 2  
**Actividad:** Publica y estructura tu sitio en GitHub Pages  
**Autoría:** Maryori Rojas Alarcón  
**Estado:** Proyecto preparado para publicación; la URL pública se incorporará después de verificar GitHub Pages.

## 1. Propósito

ServiceHub 360 es un portal académico de servicios que permite consultar un catálogo, filtrar alternativas y validar un formulario de contacto en el navegador. Es una aplicación **estática** construida con HTML, CSS, JavaScript y JSON. No requiere backend ni base de datos; los datos utilizados son de demostración.

## 2. Arquitectura: separación de responsabilidades

- **HTML:** estructura semántica y contenedores de contenido de cada página.
- **CSS:** presentación y diseño responsive, centralizados en `css/styles.css`.
- **JavaScript:** comportamiento y renderizado, mediante módulos ES independientes.
- **JSON:** datos del catálogo en `data/services.json`, sin duplicarlos dentro del HTML.
- **Componentes:** `components/header.js` y `components/footer.js` se inyectan en las tres páginas desde `js/main.js`.

Se eligió esta arquitectura por su **alta cohesión** (cada archivo cumple una función principal) y **bajo acoplamiento** (por ejemplo, cambiar un servicio en el JSON no obliga a editar la página HTML). La estructura facilita reutilización y mantenimiento y evita encabezados y pies de página duplicados.

## 3. Estructura del repositorio

```text
ServiceHub_360/
├── index.html                # Portada del sitio
├── servicios.html            # Catálogo y filtros dinámicos
├── contacto.html             # Formulario validado
├── components/
│   ├── header.js             # Encabezado reutilizable
│   └── footer.js             # Pie de página reutilizable
├── css/
│   └── styles.css            # Estilos y responsive
├── js/
│   ├── main.js               # Inyección de componentes
│   ├── services.js           # Fetch JSON, renderizado y filtros
│   └── validation.js         # Validaciones y mensajes
├── data/
│   └── services.json         # Fuente única de datos
└── README.md
```

## 4. Ejecución local

El uso de `fetch()` requiere servir los archivos a través de HTTP; abrirlos mediante `file://` puede bloquear la lectura del JSON. Desde la carpeta raíz del proyecto:

```powershell
py -m http.server 5500
```

Se accede a `http://localhost:5500/` en un navegador. Alternativamente, puede utilizarse la extensión Live Server de VS Code.

## 5. Publicación GitHub Pages

1. Crear un repositorio público de GitHub y subir el contenido de **esta carpeta**, con `index.html` en la raíz.
2. En el repositorio, abrir **Settings → Pages**.
3. En **Build and deployment**, elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guardar.
4. Abrir la URL proporcionada por GitHub y comprobar navegación, estilos, carga del JSON, filtros y formulario.

**URL pública verificada:** Pendiente de publicación. Este dato debe completarse únicamente con la dirección real proporcionada por GitHub Pages.

Todas las referencias a CSS, JavaScript y JSON son relativas (por ejemplo, `./css/styles.css`, `./data/services.json`) para funcionar dentro de la ruta de un repositorio de GitHub Pages.

## 6. Validación y experiencia de usuario

El formulario comprueba nombre, correo, servicio, mensaje y aceptación del aviso; muestra errores específicos junto a cada campo, marca `aria-invalid` y comunica el resultado. La página de servicios dispone de búsqueda, filtro y estado visible incluso cuando el JSON no puede cargarse.

**Importante:** la confirmación del formulario indica únicamente que los campos se validaron; no se realiza envío, almacenamiento ni contacto real.

## 7. Ventajas y limitaciones

**Ventajas:** alojamiento gratuito del sitio estático; separación clara; componentes reutilizables; datos desacoplados; facilidad de prueba y publicación.  
**Limitaciones:** no hay persistencia ni autenticación; el formulario no envía información; el JSON público es apropiado solo para datos no confidenciales; cualquier función transaccional necesitaría un servicio de backend.

## 8. Lista de comprobación de la evaluación

| Indicador | Implementación |
|---|---|
| Carpetas `/components`, `/css`, `/js`, `/data` | Sí |
| Separación HTML/CSS/JS/JSON | Sí |
| Header y footer independientes | Sí |
| Inyección de componentes en las páginas | Sí |
| Listado desde `data/services.json` | Implementado; verificar al publicar |
| Datos fuera del HTML | Sí |
| Validaciones HTML5/JS | Sí |
| Errores visibles y comprensibles | Sí |
| URL pública GitHub Pages | Pendiente de publicación |
| Rutas relativas | Sí; verificar al publicar |
| README: arquitectura y modularidad | Sí |
| README: estructura y URL pública | Estructura incluida; URL pendiente |

## 9. Reflexión técnica breve

La modularidad mejora la mantenibilidad y hace más claras las responsabilidades de cada capa. El catálogo JSON permite modificar el contenido sin alterar la interfaz y los componentes compartidos garantizan coherencia entre páginas. Como contrapartida, el sitio estático no puede almacenar ni procesar solicitudes en forma segura sin servicios adicionales. GitHub Pages es adecuado para publicar esta demostración porque sirve archivos estáticos y permite comprobar el funcionamiento desde una dirección pública.
