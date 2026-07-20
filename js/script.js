// WOOD FRAME — interactions
document.addEventListener('DOMContentLoaded', function () {

  /* Sticky nav background on scroll */
  var nav = document.querySelector('.wf-nav');
  function handleNavScroll(){
    if (window.scrollY > 60) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* Close mobile menu on link click */
  var navLinks = document.querySelectorAll('.wf-nav-links a, .offcanvas a');
  var offcanvasEl = document.getElementById('wfOffcanvas');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (offcanvasEl && window.bootstrap) {
        var oc = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (oc) oc.hide();
      }
    });
  });

  /* Scroll reveal via IntersectionObserver */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Smooth anchor scrolling offset for sticky nav */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* Simple form handlers (demo — no backend) */
  document.querySelectorAll('.wf-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.id === 'quote-form') {
        var data = new FormData(form);
        var message = [
          'Hola Wood Frame, quiero solicitar una cotización.',
          '',
          '*Nombre:* ' + data.get('nombre'),
          '*Óptica/empresa:* ' + data.get('empresa'),
          '*WhatsApp:* ' + data.get('whatsapp'),
          '*Correo:* ' + data.get('correo'),
          '*Ciudad:* ' + data.get('ciudad'),
          '*Cantidad:* ' + data.get('cantidad'),
          '*Mensaje:* ' + data.get('mensaje')
        ].join('\n');

        window.open('https://wa.me/573332929778?text=' + encodeURIComponent(message), '_blank', 'noopener');
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.innerHTML;
      btn.innerHTML = 'Enviado ✓';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled = false;
        form.reset();
      }, 2600);
    });
  });

});
