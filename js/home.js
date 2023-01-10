// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

(async () => {
  await axios.get('/remove-message/');
})();

(async () => {
  const popup = document.querySelector('.popup');
  const popupBack = document.querySelector('.popup_background');
  const cross = document.querySelector('.cross');
  const close = document.querySelector('.popup__close');

  const res = await axios.get('pop-up-check/');

  if (res.data.pop_up === 'not') {
    popup.style.display = 'flex';
    popupBack.style.display = 'initial';
  }

  cross.addEventListener('click', () => {
    popup.style.display = 'none';
    popupBack.style.display = 'none';
  });

  close.addEventListener('click', () => {
    popup.style.display = 'none';
    popupBack.style.display = 'none';
  });
})();

(async () => {
  await axios.get('pop-up-read/');
})();

(() => {
  const successMsg = document.querySelector('.success_message_cont');

  setTimeout(() => {
    if (successMsg) {
      successMsg.style.right = '-80%';
    }
  }, 5000);
})();

(() => {
  const button = document.querySelector('.hero').querySelector('button');

  button.addEventListener('click', () => {
    window.location.href = '/booking/public/';
  });
})();

(() => {
  const button = document.querySelector('.map_book');

  button.addEventListener('click', () => {
    window.location.href = '/booking';
  });
})();
