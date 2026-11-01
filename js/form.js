// Formulario "Agendá una demo".
// Para recibir las solicitudes, crear un formulario en https://formspree.io y pegar su URL acá
// (ej: 'https://formspree.io/f/abcdwxyz'). Mientras esté vacío, el formulario funciona en modo demo:
// valida y muestra la confirmación, pero no envía nada.
const FORM_ENDPOINT = '';

(function(){
  const i18n = window.veltraI18n;
  const modal = document.getElementById('demoModal');
  const form = document.getElementById('demoForm');
  const formView = document.getElementById('demoFormView');
  const success = document.getElementById('demoSuccess');
  const demoNote = document.getElementById('demoNote');
  const formError = document.getElementById('formError');
  const submit = document.getElementById('demoSubmit');
  const counter = document.getElementById('msgCounter');
  let lastFocus = null;

  function open(){
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.classList.add('modal-open');
    setTimeout(() => form.elements.email.focus({preventScroll: true}), 60);
  }
  function close(){
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.hidden = true;
      if (!success.hidden) reset();
    }, 250);
    if (lastFocus) lastFocus.focus({preventScroll: true});
  }
  function reset(){
    form.reset(); clearErrors(); updateCounter();
    formView.hidden = false; success.hidden = true;
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-demo]')) { e.preventDefault(); open(); }
    else if (e.target.closest('[data-close-demo]')) close();
  });
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      // Mantener el foco dentro del modal
      const els = [...modal.querySelectorAll('button, input, textarea, a[href]')].filter(el => !el.closest('[hidden]') && !el.classList.contains('hp'));
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  if (location.hash === '#demo') open();

  // Contador del mensaje
  function updateCounter(){ counter.textContent = `${form.elements.message.value.length}/600`; }
  form.elements.message.addEventListener('input', updateCounter);

  // Validación
  const RULES = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'form.errEmail',
    phone: v => v.replace(/\D/g, '').length >= 7 ? '' : 'form.errPhone',
    message: v => v.trim().length >= 10 ? '' : 'form.errMessage'
  };
  function setError(name, key){
    const field = form.elements[name];
    const out = form.querySelector(`[data-error-for="${name}"]`);
    field.classList.toggle('invalid', !!key);
    field.setAttribute('aria-invalid', key ? 'true' : 'false');
    out.dataset.key = key || '';
    out.textContent = key ? i18n.t(key) : '';
  }
  function validate(){
    let firstBad = null;
    Object.keys(RULES).forEach(name => {
      const key = RULES[name](form.elements[name].value);
      setError(name, key);
      if (key && !firstBad) firstBad = form.elements[name];
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  function clearErrors(){ Object.keys(RULES).forEach(n => setError(n, '')); formError.textContent = ''; }
  Object.keys(RULES).forEach(name => {
    form.elements[name].addEventListener('blur', () => {
      if (form.elements[name].value) setError(name, RULES[name](form.elements[name].value));
    });
    form.elements[name].addEventListener('input', () => {
      if (form.elements[name].classList.contains('invalid')) setError(name, RULES[name](form.elements[name].value));
    });
  });

  // Re-traducir los errores visibles al cambiar de idioma
  i18n.onChange(() => {
    form.querySelectorAll('[data-error-for]').forEach(out => { if (out.dataset.key) out.textContent = i18n.t(out.dataset.key); });
    if (formError.dataset.key) formError.textContent = i18n.t(formError.dataset.key);
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formError.textContent = ''; formError.dataset.key = '';
    if (!validate()) return;
    if (form.elements._gotcha.value) return; // bot

    const data = {
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      company: form.elements.company.value.trim(),
      message: form.elements.message.value.trim(),
      language: i18n.lang,
      _subject: 'Nueva solicitud de demo — Veltra'
    };

    submit.disabled = true;
    submit.firstElementChild.textContent = i18n.t('form.sending');
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
      } else {
        await new Promise(r => setTimeout(r, 700));
      }
      demoNote.hidden = !!FORM_ENDPOINT;
      formView.hidden = true; success.hidden = false;
      success.querySelector('[data-close-demo]').focus();
    } catch (err) {
      formError.dataset.key = 'form.errSend';
      formError.textContent = i18n.t('form.errSend');
    } finally {
      submit.disabled = false;
      submit.firstElementChild.textContent = i18n.t('form.submit');
    }
  });
})();
