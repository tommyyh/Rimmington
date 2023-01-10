// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const allowed = false;
const times = [
  '9:00',
  '9:05',
  '9:10',
  '9:15',
  '9:20',
  '9:25',
  '9:30',
  '9:35',
  '9:40',
  '9:45',
  '9:50',
  '9:55',
  '10:00',
  '10:05',
  '10:10',
  '10:15',
  '10:20',
  '10:25',
  '10:30',
  '10:35',
  '10:40',
  '10:45',
  '10:50',
  '10:55',
  '11:00',
  '11:05',
  '11:10',
  '11:15',
  '11:20',
  '11:25',
  '11:30',
  '11:35',
  '11:40',
  '11:45',
  '11:50',
  '11:55',
  '12:00',
  '12:05',
  '12:10',
  '12:15',
  '12:20',
  '12:25',
  '12:30',
  '12:35',
  '12:40',
  '12:45',
  '12:50',
  '12:55',
  '14:05',
  '14:10',
  '14:15',
  '14:20',
  '14:25',
  '14:30',
  '14:35',
  '14:40',
  '14:45',
  '14:50',
  '14:55',
  '15:00',
  '15:05',
  '15:10',
  '15:15',
  '15:20',
  '15:25',
  '15:30',
  '15:35',
  '15:40',
  '15:45',
  '15:50',
  '15:55',
  '16:00',
  '16:05',
  '16:10',
  '16:15',
  '16:20',
  '16:25',
  '16:30',
  '16:35',
  '16:40',
  '16:45',
  '16:50',
  '16:55',
  '17:00',
  '17:05',
  '17:10',
  '17:15',
  '17:20',
  '17:25',
  '17:30',
];

// Pickaday
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 8);

const picker = new Pikaday({
  field: document.getElementById('manage_date'),
  format: 'YYYY-M-D',
  toString(date, format) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  },
  parse(dateString, format) {
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  },
  minDate: tomorrow,
});

// picker.setDate(new Date('2021-09-29'));

(() => {
  const button = document.querySelector('.change_submit');
  const email = document.querySelector('#change_email');
  const code = document.querySelector('#change_code');
  const group = document.querySelector('#change_group');
  const error = document.querySelector('.change_error');
  const manage = document.querySelector('.manage');
  const change = document.querySelector('.change_form');

  email.addEventListener('focusin', () => {
    error.style.display = 'none';
    email.style.border = '1px #bbbbbb solid';
  });

  code.addEventListener('focusin', () => {
    error.style.display = 'none';
    code.style.border = '1px #bbbbbb solid';
  });

  button.addEventListener('click', async () => {
    if (!email.value) {
      error.style.display = 'initial';
      email.style.border = '0.5px solid #FF3C3C';

      return;
    }

    if (/(@[A-Za-z])\w+/.test(email.value) == false) {
      error.style.display = 'initial';
      email.style.border = '0.5px solid #FF3C3C';

      return;
    }

    if (/\s/.test(email.value) == true) {
      error.style.display = 'initial';
      email.style.border = '0.5px solid #FF3C3C';

      return;
    }

    if (!code.value) {
      error.style.display = 'initial';
      error.innerHTML = 'Please enter a valid code';
      code.style.border = '0.5px solid #FF3C3C';

      return;
    }

    const res = await axios.post('/booking/check-code/', {
      email: email.value,
      code: code.value,
      group: group.value,
    });

    if (res.data.status === 404) {
      error.style.display = 'initial';
      error.innerHTML = 'Please enter valid credentials';
    }

    if (res.data.status === 200) {
      change.style.display = 'none';
      manage.classList.add('manage_open');

      const dateInput = document.querySelector('#manage_date');
      const datePicker = document.querySelector('.date_picker');
      const bookAppointment = document.querySelector('#book_appointment');
      const datePickerSuccess = document.querySelector('.date_picker_success');

      datePicker.innerHTML = times
        .map(
          (time) =>
            `<div class="date_picker_item">
    <h6>${time}</h6>
  </div>`
        )
        .join('');

      dateInput.addEventListener('change', async () => {
        const res = await axios.post('/booking/new-date/', {
          date: dateInput.value,
        });

        const available_times = res.data.available_times;

        datePickerSuccess.classList.add('date_picker_success_on');

        // Show in html
        datePicker.innerHTML = available_times
          .map(
            (time) =>
              `<div class="date_picker_item">
      <h6>${time}</h6>
    </div>`
          )
          .join('');

        // Change button
        bookAppointment.innerText = 'Pick a Time';

        // Add event listener on time clicks
        const timeItems = document.querySelectorAll('.date_picker_item');

        timeItems.forEach((timeItem) => {
          timeItem.addEventListener('click', (e) => {
            // Reset the previous ones
            timeItems.forEach((timeItem) => {
              timeItem.style.background = '#eeeeee';
            });

            if (e.target.className === 'date_picker_item') {
              // Re-assign value
              selectedTime = e.target.querySelector('h6').textContent;

              e.target.style.background = '#36c4e0';
            } else {
              // Re-assign value
              selectedTime = e.target.textContent;

              e.target.parentNode.style.background = '#36c4e0';
            }

            bookAppointment.style.background = '#d3a150';
            bookAppointment.style.cursor = 'pointer';
            bookAppointment.disabled = false;
            bookAppointment.innerHTML = 'Save Changes';
          });
        });
      });

      bookAppointment.addEventListener('click', async () => {
        bookAppointment.disabled = true;
        bookAppointment.innerHTML = 'Processing...';

        const res = await axios.post('/booking/save-changes/', {
          date: dateInput.value,
          time: selectedTime,
        });

        if (res.data.status === 200) {
          bookAppointment.disabled = false;
          bookAppointment.innerHTML = 'Save Changes';

          window.location.href = '/';
        }
      });
    }
  });
})();
