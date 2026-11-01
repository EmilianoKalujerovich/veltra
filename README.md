# Veltra

Sitio web de Veltra: automatizaciones y software a medida para PyMEs.

Sitio estático, sin build: HTML, CSS y JavaScript plano. Three.js (r128) y las fuentes se cargan desde CDN.

## Estructura

```
index.html        Página principal
css/styles.css    Estilos (tokens de color en :root)
js/i18n.js        Textos en español e inglés (selector ES / EN, también con ?lang=en)
js/form.js        Formulario "Agendá una demo" (validación y envío)
js/main.js        Interacciones: menú mobile, máquina de escribir, contadores, spotlight y partículas 3D
assets/           Logo (SVG y JPG original) y favicon
```

## Verlo localmente

Abrí `index.html` en el navegador, o levantá un servidor:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Textos e idiomas

Todos los textos están en `js/i18n.js`. Cada elemento traducible tiene `data-i18n="clave"` en el HTML; para agregar o cambiar un texto, editá la clave en los dos idiomas.

## Pendiente

- Conectar el formulario: crear un formulario en https://formspree.io y pegar su URL en `FORM_ENDPOINT` (`js/form.js`). Mientras esté vacío funciona en modo demo y no envía datos.
- Reemplazar las métricas y el testimonio de ejemplo por datos reales.
- Links reales de redes sociales en el footer.
