// Traducciones ES / EN.
// Los elementos con data-i18n="clave" toman el texto (puede incluir HTML) de este diccionario;
// data-i18n-attr="atributo:clave;otro:clave" traduce atributos (placeholder, aria-label, ...).
(function(){
  const DICT = {
    es: {
      'meta.title': 'Veltra — Automatización para PyMEs',
      'meta.description': 'Veltra automatiza las tareas repetitivas de PyMEs de cualquier rubro: agentes de WhatsApp con IA, turnos, facturas, CRM, reportes y software a medida.',

      'nav.services': 'Servicios',
      'nav.process': 'Cómo trabajamos',
      'nav.results': 'Resultados',
      'nav.contact': 'Contacto',
      'nav.menu': 'Abrir menú',
      'nav.close': 'Cerrar menú',
      'cta.demo': 'Agendá una demo',
      'cta.start': 'Comenzar',
      'cta.services': 'Ver servicios',

      'hero.pill': '<b>Nuevo</b><span class="sep"></span>Agentes de IA para PyMEs ↗',
      'hero.words': ['Automatización', 'Inteligencia', 'Eficiencia', 'Tiempo libre'],
      'hero.serif': 'para tu negocio',
      'hero.lead': 'Automatizamos las tareas repetitivas de <strong>PyMEs de cualquier rubro</strong> — turnos, mensajes, facturas, seguimientos — para que tu equipo se dedique a lo que realmente importa.',
      'hero.meta1': 'Implementación en semanas',
      'hero.meta2': 'Sin cambiar tus herramientas',
      'hero.meta3': 'Soporte en español e inglés',
      'hero.hover': 'Pasá el mouse ✦',
      'hero.scroll': 'Scroll',
      'shape.0': 'Veltra',
      'shape.1': 'Nuestro nombre',
      'shape.2': 'Tu flujo, automatizado',
      'shape.dot0': 'Logo', 'shape.dot1': 'Nombre', 'shape.dot2': 'Flujo',
      'flow.wa': 'WhatsApp', 'flow.mail': 'Email', 'flow.ia': 'IA', 'flow.crm': 'CRM',
      'flow.cal': 'Calendario', 'flow.fac': 'Facturación', 'flow.sh': 'Google Sheets',

      'marquee.label': 'Automatizamos negocios de todos los rubros',
      'marquee.items': ['Abogados', 'Psicólogos', 'Contadores', 'Inmobiliarias', 'Clínicas', 'Odontólogos', 'Gimnasios', 'E‑commerce', 'Escuelas', 'Estudios contables'],

      'services.eyebrow': 'Servicios',
      'services.title': 'Todo lo repetitivo, <em>en piloto automático.</em>',
      'services.lead': 'Diseñamos, construimos y mantenemos automatizaciones a medida de cómo trabaja tu negocio.',
      'services.1.title': 'Agentes de WhatsApp con IA',
      'services.1.text': 'Responden consultas, califican clientes y derivan a una persona cuando hace falta. Las 24 horas, con tu tono.',
      'services.1.tag': 'Atención al cliente',
      'services.2.title': 'Agenda de turnos automática',
      'services.2.text': 'Tus clientes reservan, reprograman y reciben recordatorios solos. Menos ausencias, cero idas y vueltas.',
      'services.2.tag': 'Consultorios · Estudios',
      'services.3.title': 'Carga de facturas y documentos',
      'services.3.text': 'La IA lee facturas, contratos y formularios, extrae los datos y los carga donde corresponde.',
      'services.3.tag': 'Administración',
      'services.4.title': 'CRM y seguimiento',
      'services.4.text': 'Cada contacto queda registrado y recibe el seguimiento justo en el momento justo. Ninguna venta se enfría.',
      'services.4.tag': 'Ventas',
      'services.5.title': 'Reportes automáticos',
      'services.5.text': 'Los números de tu negocio, armados y enviados a tu mail o WhatsApp cada semana. Sin planillas.',
      'services.5.tag': 'Dirección',
      'services.6.title': 'Software a medida',
      'services.6.text': 'Cuando no existe la herramienta que necesitás, la construimos: portales, paneles e integraciones.',
      'services.6.tag': 'Desarrollo',

      'process.eyebrow': 'Cómo trabajamos',
      'process.title': 'De la idea a funcionando, <em>en cuatro pasos.</em>',
      'process.1.title': 'Diagnóstico',
      'process.1.text': 'Charlamos con tu equipo y detectamos qué tareas se llevan más horas.',
      'process.1.time': '1 reunión',
      'process.2.title': 'Diseño',
      'process.2.text': 'Te mostramos cómo va a funcionar cada automatización antes de construir.',
      'process.2.time': '1 semana',
      'process.3.title': 'Implementación',
      'process.3.text': 'La conectamos con las herramientas que ya usás y la probamos con casos reales.',
      'process.3.time': '2–4 semanas',
      'process.4.title': 'Mejora continua',
      'process.4.text': 'Medimos resultados y la ajustamos para que rinda cada vez más.',
      'process.4.time': 'Siempre',

      'results.eyebrow': 'Resultados',
      'results.title': 'Menos tareas manuales. <em>Más negocio.</em>',
      'results.1': 'Horas ahorradas por semana en un equipo de 5 personas.',
      'results.2': 'De las consultas respondidas sin intervención humana.',
      'results.3': 'Más rápido el seguimiento de cada cliente potencial.',
      'results.4': 'Atención activa, incluso fuera del horario laboral.',
      'results.note': '* Resultados de ejemplo, ilustrativos de lo que buscamos lograr con cada cliente.',

      'quote.text': '“Antes pasábamos las mañanas confirmando turnos por teléfono. <span>Ahora el sistema lo hace solo y nosotros atendemos pacientes.</span>”',
      'quote.cite': 'Testimonio de ejemplo · Consultorio de psicología',

      'final.eyebrow': 'Empecemos',
      'final.title': '¿Qué tarea te gustaría <em>no hacer nunca más?</em>',
      'final.lead': 'Agendá una charla de 15 minutos. Te contamos qué se puede automatizar en tu negocio, sin compromiso.',

      'footer.about': 'Automatizaciones y software a medida para PyMEs que quieren crecer sin sumar trabajo manual.',
      'footer.services': 'Servicios',
      'footer.s1': 'WhatsApp con IA', 'footer.s2': 'Turnos', 'footer.s3': 'Documentos', 'footer.s4': 'Software a medida',
      'footer.company': 'Empresa',
      'footer.follow': 'Seguinos',
      'footer.tagline': 'Automatización y software para PyMEs',

      'form.eyebrow': 'Agendá una demo',
      'form.title': 'Contanos qué <em>necesitás.</em>',
      'form.lead': 'Completá tus datos y te contactamos para coordinar una charla de 15 minutos.',
      'form.email': 'Email',
      'form.emailPh': 'vos@tuempresa.com',
      'form.phone': 'Teléfono',
      'form.phonePh': '+54 9 11 1234 5678',
      'form.company': 'Empresa',
      'form.optional': 'opcional',
      'form.companyPh': 'Nombre de tu empresa',
      'form.message': '¿Qué te gustaría automatizar?',
      'form.messagePh': 'Ej: recibimos consultas por WhatsApp y agendamos turnos a mano…',
      'form.submit': 'Enviar solicitud',
      'form.sending': 'Enviando…',
      'form.privacy': 'Usamos tus datos solo para responder tu consulta.',
      'form.errEmail': 'Ingresá un email válido.',
      'form.errPhone': 'Ingresá un teléfono válido.',
      'form.errMessage': 'Contanos brevemente qué necesitás.',
      'form.errSend': 'No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.',
      'form.okTitle': '¡Gracias! Recibimos tu solicitud.',
      'form.okText': 'Te vamos a contactar a la brevedad para coordinar la demo.',
      'form.okClose': 'Volver al sitio',
      'form.demoNote': 'Modo demo: el formulario todavía no envía datos.',
      'form.close': 'Cerrar'
    },

    en: {
      'meta.title': 'Veltra — Automation for small businesses',
      'meta.description': 'Veltra automates the repetitive work of small businesses in any industry: AI WhatsApp agents, scheduling, invoices, CRM, reports and custom software.',

      'nav.services': 'Services',
      'nav.process': 'How we work',
      'nav.results': 'Results',
      'nav.contact': 'Contact',
      'nav.menu': 'Open menu',
      'nav.close': 'Close menu',
      'cta.demo': 'Book a demo',
      'cta.start': 'Get started',
      'cta.services': 'See services',

      'hero.pill': '<b>New</b><span class="sep"></span>AI agents for small businesses ↗',
      'hero.words': ['Automation', 'Intelligence', 'Efficiency', 'Free time'],
      'hero.serif': 'for your business',
      'hero.lead': 'We automate the repetitive work of <strong>small businesses in any industry</strong> — bookings, messages, invoices, follow-ups — so your team can focus on what really matters.',
      'hero.meta1': 'Up and running in weeks',
      'hero.meta2': 'Keep your current tools',
      'hero.meta3': 'Support in English & Spanish',
      'hero.hover': 'Hover me ✦',
      'hero.scroll': 'Scroll',
      'shape.0': 'Veltra',
      'shape.1': 'Our name',
      'shape.2': 'Your workflow, automated',
      'shape.dot0': 'Logo', 'shape.dot1': 'Name', 'shape.dot2': 'Workflow',
      'flow.wa': 'WhatsApp', 'flow.mail': 'Email', 'flow.ia': 'AI', 'flow.crm': 'CRM',
      'flow.cal': 'Calendar', 'flow.fac': 'Invoicing', 'flow.sh': 'Google Sheets',

      'marquee.label': 'We automate businesses in every industry',
      'marquee.items': ['Law firms', 'Therapists', 'Accountants', 'Real estate', 'Clinics', 'Dentists', 'Gyms', 'E‑commerce', 'Schools', 'Accounting firms'],

      'services.eyebrow': 'Services',
      'services.title': 'Everything repetitive, <em>on autopilot.</em>',
      'services.lead': 'We design, build and maintain automations tailored to the way your business works.',
      'services.1.title': 'AI WhatsApp agents',
      'services.1.text': 'They answer questions, qualify leads and hand off to a person when needed. 24/7, in your voice.',
      'services.1.tag': 'Customer service',
      'services.2.title': 'Automatic scheduling',
      'services.2.text': 'Your clients book, reschedule and get reminders on their own. Fewer no-shows, no back-and-forth.',
      'services.2.tag': 'Practices · Firms',
      'services.3.title': 'Invoice & document processing',
      'services.3.text': 'AI reads invoices, contracts and forms, extracts the data and puts it where it belongs.',
      'services.3.tag': 'Back office',
      'services.4.title': 'CRM & follow-up',
      'services.4.text': 'Every contact gets logged and followed up at the right moment. No deal goes cold.',
      'services.4.tag': 'Sales',
      'services.5.title': 'Automated reports',
      'services.5.text': 'Your business numbers, compiled and sent to your email or WhatsApp every week. No spreadsheets.',
      'services.5.tag': 'Management',
      'services.6.title': 'Custom software',
      'services.6.text': 'When the tool you need doesn’t exist, we build it: portals, dashboards and integrations.',
      'services.6.tag': 'Development',

      'process.eyebrow': 'How we work',
      'process.title': 'From idea to live, <em>in four steps.</em>',
      'process.1.title': 'Discovery',
      'process.1.text': 'We talk with your team and find the tasks that take up the most hours.',
      'process.1.time': '1 meeting',
      'process.2.title': 'Design',
      'process.2.text': 'We show you how each automation will work before we build it.',
      'process.2.time': '1 week',
      'process.3.title': 'Implementation',
      'process.3.text': 'We connect it to the tools you already use and test it with real cases.',
      'process.3.time': '2–4 weeks',
      'process.4.title': 'Continuous improvement',
      'process.4.text': 'We measure results and fine-tune it so it keeps delivering more.',
      'process.4.time': 'Always',

      'results.eyebrow': 'Results',
      'results.title': 'Less manual work. <em>More business.</em>',
      'results.1': 'Hours saved per week in a team of 5.',
      'results.2': 'Of inquiries answered with no human involvement.',
      'results.3': 'Faster follow-up on every potential client.',
      'results.4': 'Always-on service, even after hours.',
      'results.note': '* Example results, illustrating what we aim to achieve with each client.',

      'quote.text': '“We used to spend our mornings confirming appointments by phone. <span>Now the system does it on its own and we focus on our patients.</span>”',
      'quote.cite': 'Example testimonial · Psychology practice',

      'final.eyebrow': 'Let’s talk',
      'final.title': 'Which task would you like to <em>never do again?</em>',
      'final.lead': 'Book a 15-minute call. We’ll tell you what can be automated in your business, no strings attached.',

      'footer.about': 'Automation and custom software for small businesses that want to grow without adding manual work.',
      'footer.services': 'Services',
      'footer.s1': 'AI on WhatsApp', 'footer.s2': 'Scheduling', 'footer.s3': 'Documents', 'footer.s4': 'Custom software',
      'footer.company': 'Company',
      'footer.follow': 'Follow us',
      'footer.tagline': 'Automation and software for small businesses',

      'form.eyebrow': 'Book a demo',
      'form.title': 'Tell us what <em>you need.</em>',
      'form.lead': 'Leave your details and we’ll get in touch to set up a 15-minute call.',
      'form.email': 'Email',
      'form.emailPh': 'you@yourcompany.com',
      'form.phone': 'Phone',
      'form.phonePh': '+1 555 123 4567',
      'form.company': 'Company',
      'form.optional': 'optional',
      'form.companyPh': 'Your company name',
      'form.message': 'What would you like to automate?',
      'form.messagePh': 'E.g. we get inquiries on WhatsApp and book appointments by hand…',
      'form.submit': 'Send request',
      'form.sending': 'Sending…',
      'form.privacy': 'We only use your details to reply to your request.',
      'form.errEmail': 'Please enter a valid email.',
      'form.errPhone': 'Please enter a valid phone number.',
      'form.errMessage': 'Tell us briefly what you need.',
      'form.errSend': 'We couldn’t send your request. Please try again in a few minutes.',
      'form.okTitle': 'Thank you! We got your request.',
      'form.okText': 'We’ll be in touch shortly to schedule your demo.',
      'form.okClose': 'Back to the site',
      'form.demoNote': 'Demo mode: the form doesn’t send data yet.',
      'form.close': 'Close'
    }
  };

  const listeners = [];
  const store = {
    get(){ try { return localStorage.getItem('veltra-lang'); } catch (e) { return null; } },
    set(v){ try { localStorage.setItem('veltra-lang', v); } catch (e) {} }
  };

  const fromUrl = new URLSearchParams(location.search).get('lang');
  let lang = [fromUrl, store.get()].find(l => l === 'es' || l === 'en') || 'es';

  function t(key){ return (DICT[lang] && DICT[lang][key] !== undefined) ? DICT[lang][key] : DICT.es[key]; }

  function apply(){
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    document.querySelectorAll('[data-lang]').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
    listeners.forEach(fn => fn(lang));
  }

  function setLang(next){
    if (next === lang || !DICT[next]) return;
    lang = next; store.set(lang); apply();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) setLang(b.dataset.lang);
  });

  window.veltraI18n = {
    t, setLang, apply,
    get lang(){ return lang; },
    onChange(fn){ listeners.push(fn); }
  };
})();
