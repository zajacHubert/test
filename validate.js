const inputs = document.querySelectorAll('.input');
const form = document.querySelector('.info');
const paragraphs = document.querySelectorAll('.error');

class Validate {
  info = {
    destination: '',
    dateIn: '',
    dateOut: '',
    guest: '',
    pay: false,
  };

  setInfo(name, value) {
    this.info[`${name}`] = value;
  }

  isRequired(value) {
    if (!value.length) {
      return 'This field is required';
    }
    return 'success';
  }

  isCorrectDate(dateIn, dateOut) {
    const today = new Date().getTime();
    if (dateIn < today || dateIn > dateOut) {
      return 'Incorrect Date';
    } else {
      return 'success';
    }
  }
}

const validate = new Validate();

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    validate.setInfo(e.target.name, e.target.value);
  });
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  for (let [key, value] of Object.entries(validate.info)) {
    const res = validate.isRequired(value);
    if (res !== 'success') {
      const p = document.querySelector(`.error.${key}`);
      if (p) {
        p.textContent = res;
      }
    } else {
      if (key === 'dateIn' || key === 'dateOut') {
        const dateIn = new Date(validate.info.dateIn).getTime();
        const dateOut = new Date(validate.info.dateOut).getTime();
        const res = validate.isCorrectDate(dateIn, dateOut);
        if (res !== 'success') {
          const p = document.querySelector(`.error.${key}`);
          p.textContent = res;
        } else {
          paragraphs.forEach((p) => {
            p.textContent = '';
          });
          console.log('Przesłanie formularza');
        }
      }
    }
  }
});
