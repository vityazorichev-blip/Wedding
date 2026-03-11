document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('open');
  const card = document.getElementById('card');
  const toggleDetails = document.getElementById('toggleDetails');
  const details = document.getElementById('details');
  const shots = Array.from(document.querySelectorAll('.shot'));
  const reveals = Array.from(document.querySelectorAll('.reveal'));

  function showCard() {
    if (!card.classList.contains('show')) {
      card.classList.add('show');
      card.setAttribute('aria-hidden', 'false');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', showCard);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach((el) => revealObserver.observe(el));

  const shotObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        shotObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  shots.forEach((el) => shotObserver.observe(el));

  if (toggleDetails && details) {
    toggleDetails.addEventListener('click', () => {
      const isOpen = details.classList.toggle('open');
      toggleDetails.setAttribute('aria-expanded', String(isOpen));
      toggleDetails.textContent = isOpen ? 'Скрыть детали' : 'Показать детали';
    });
  }

  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  if (name) {
    const subtitle = document.getElementById('subtitle');
    if (subtitle) {
      subtitle.textContent = `${name}, мы будем счастливы видеть вас на нашей свадьбе`;
    }
  }
});
