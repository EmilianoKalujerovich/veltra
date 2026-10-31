# Veltra

Sitio web de Veltra: automatizaciones y software a medida para PyMEs.

Sitio estático, sin build: HTML, CSS y JavaScript plano. Three.js (r128) y las fuentes se cargan desde CDN.

## Estructura

```
index.html        Página principal
css/styles.css    Estilos (tokens de color en :root)
js/main.js        Interacciones: máquina de escribir, contadores, spotlight y partículas 3D
assets/           Logo (SVG y JPG original) y favicon
```

## Verlo localmente

Abrí `index.html` en el navegador, o levantá un servidor:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Pendiente

- Conectar los botones "Agendá una demo" a un formulario, Calendly o WhatsApp.
- Reemplazar las métricas y el testimonio de ejemplo por datos reales.
- Links reales de redes sociales en el footer.
