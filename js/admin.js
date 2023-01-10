// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const date = new Date();
const year = date.getFullYear();

const renderCalendar = () => {
  date.setDate(1);

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[date.getMonth()];
  const monthDays = document.querySelector('.days');
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const nextDays = 7 - lastDayIndex - 1;

  document.querySelector('.date h1').innerHTML = month;
  document.querySelector('.date p').innerHTML = new Date().toDateString();

  let days = '';

  for (let i = firstDayIndex; i > 0; i--) {
    days += `<div class="prev_date">${prevLastDay - i + 1}</div>`;
  }

  for (let x = 1; x <= lastDay; x++) {
    if (
      x === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="available_day hrefday">${x}</div>`;
      // days += `<a href="/admin2/day/${year}-${
      //   date.getMonth() + 1
      // }-${x}/" class="available_day hrefday">${x}</a>`;
    } else {
      days += `<div class="available_day">${x}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next_date">${j}</div>`;
    monthDays.innerHTML = days;
  }

  const group = document.querySelector('.filter_group');
  const place = document.querySelector('.filter_place');
  const sort = document.querySelector('.filter_sort');

  // On click event
  document.querySelectorAll('.available_day').forEach((day) => {
    day.addEventListener('click', async (e) => {
      url = `/admin2/day/${year}-${date.getMonth() + 1}-${e.target.innerHTML}/${
        group.value
      }/${place.value}/${sort.value}`;

      window.location.href = url;
    });
  });
};

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);

  renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);

  renderCalendar();
});

renderCalendar();
