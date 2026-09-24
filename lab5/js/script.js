const formSubmitBtn = document.getElementById('submit-btn');

const regexps = {
  fullname: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії’'-]+\s+[А-ЩЬЮЯҐЄІЇ]\.\s*[А-ЩЬЮЯҐЄІЇ]\.$/,
  faculty: /^[А-ЩЬЮЯҐЄІЇ]{2,5}$/,
  birthday: /^\d{4}-\d{2}-\d{2}$/,
  address: /^м\.\s*[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії’'-]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
};

const validateForm = (e, form) => {
  e.preventDefault();

  let isValid = true;
  const inputs = form.querySelectorAll('fieldset input');

  for (const input of inputs) {
    if (!regexps[input.id].test(input.value)) {
      addErrorMessage(input);
      isValid = false;
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  }

  if (isValid) submitForm(form);
};

const submitForm = (form) => {
  const inputs = form.querySelectorAll('fieldset input');
  const outputs = document.querySelectorAll('.user-data-output .data');

  outputs[0].innerHTML = `<b>ПІБ: </b>${form.fullname.value}`;
  outputs[1].innerHTML = `<b>Факультет: </b>${form.faculty.value}`;
  outputs[2].innerHTML = `<b>Дата народження: </b>${form.birthday.value}`;
  outputs[3].innerHTML = `<b>Адреса: </b>${form.address.value}`;
  outputs[4].innerHTML = `<b>Пошта: </b>${form.email.value}`;

  for (const input of inputs) input.value = '';
};

const addErrorMessage = (input) => {
  input.classList.add('invalid');
  input.classList.remove('valid');

  if (input.nextElementSibling?.matches('p.error-message')) return;

  const errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.innerText = 'Неправильний формат';

  input.after(errorElement);
};

const removeErrorMessage = (input) => {
  input.classList.remove('invalid');

  if (input.nextElementSibling?.matches('p.error-message')) {
    input.nextElementSibling.remove();
  }
};

const inputs = document.querySelectorAll('.user-data-form input');

for (const input of inputs) {
  input.addEventListener('input', () => {
    removeErrorMessage(input);

    if (regexps[input.id].test(input.value)) {
      input.classList.add('valid');
    } else {
      input.classList.remove('valid');
    }
  });
}

const tableRows = document.querySelectorAll('.numbers-table tr');
let count = 1;

for (const row of tableRows) {
  for (let i = 0; i < tableRows.length; i++) {
    const td = document.createElement('td');
    if (count === 5) td.classList.add('selected-cell');
    td.innerText = count++;

    row.append(td);
  }
}

const getRandomColor = () => {
  const chars = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }

  return color;
};

const tableContainer = document.querySelector('.table-container');
const numbersTable = tableContainer.querySelector('.numbers-table');
const selectedCell = numbersTable.querySelector('.selected-cell');
const otherCells = numbersTable.querySelectorAll('td:not(.selected-cell)');

selectedCell.addEventListener('mouseenter', () => {
  selectedCell.style.backgroundColor = getRandomColor();
  selectedCell.style.color = getRandomColor();
});

const inputColor = tableContainer.querySelector('input');

selectedCell.addEventListener('click', () => {
  selectedCell.style.backgroundColor = inputColor.value;
});

selectedCell.addEventListener('dblclick', () => {
  for (const cell of otherCells) {
    cell.style.backgroundColor = inputColor.value;
  }
  selectedCell.style.backgroundColor = 'transparent';
});
