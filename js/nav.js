(() => {
  const nav = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  nav.addEventListener('click', () => {
    nav.classList.toggle('burger_open');
    menu.classList.toggle('menu_open');

    document.body.style.overflowY =
      nav.className === 'burger burger_open' ? 'hidden' : 'initial';
  });
})();

(() => {
  const nav = document.querySelector('nav');

  if (
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/about.html'
  ) {
    nav.classList.add('nav_trans');
  }

  if (
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/about.html'
  ) {
    window.addEventListener('scroll', () => {
      const position = window.scrollY > 140;

      nav.classList.toggle('nav_scroll', position);
    });
  }
})();
