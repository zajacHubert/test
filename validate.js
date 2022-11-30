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

  checkRequired(value) {
    if (!value.length) {
      return 'This field is required';
    }
    return 'success';
  }

  checkDestination(value) {
    const res = this.checkRequired(value);
    if (res !== 'success') {
      return {
        correct: false,
        selector: 'destination',
        message: res,
      };
    } else {
      if (value.length < 3 || value.length > 30) {
        return {
          correct: false,
          selector: 'destination',
          message:
            'The length of the expression must be between 3 and 30 characters',
        };
      } else {
        return { correct: true };
      }
    }
  }

  checkDate(dateIn, dateOut) {
    const res = this.checkRequired(dateIn);
    const res2 = this.checkRequired(dateOut);
    if (res !== 'success' || res2 !== 'success') {
      return {
        correct: false,
        selector: 'date',
        message: res,
      };
    } else {
      const today = new Date().getTime();
      const dateInTime = new Date(dateIn).getTime();
      const dateOutTime = new Date(dateOut).getTime();
      if (dateInTime < today || dateInTime > dateOutTime) {
        return {
          correct: false,
          selector: 'date',
          message: 'Incorrect date',
        };
      } else {
        return { correct: true };
      }
    }
  }

  checkGuest(value) {
    const res = this.checkRequired(value);
    if (res !== 'success') {
      return {
        correct: false,
        selector: 'guest',
        message: res,
      };
    } else {
      return { correct: true };
    }
  }

  displayError(selector, message) {
    const p = document.querySelector(`.error.${selector}`);
    if (p) {
      p.textContent = message;
    }
  }
}

const validate = new Validate();

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    validate.setInfo(e.target.name, e.target.value);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { destination, dateIn, dateOut, guest } = validate.info;

  const resDestination = validate.checkDestination(destination);
  if (!resDestination.correct) {
    validate.displayError(resDestination.selector, resDestination.message);
  }

  const resDate = validate.checkDate(dateIn, dateOut);
  if (!resDate.correct) {
    validate.displayError(resDate.selector, resDate.message);
  }

  const resGuest = validate.checkGuest(guest);
  if (!resGuest.correct) {
    validate.displayError(resGuest.selector, resGuest.message);
  }

  if (resDestination.correct && resDate.correct && resGuest.correct) {
    paragraphs.forEach((p) => {
      if (p.textContent) {
        p.textContent = '';
      }
    });
    console.log('Przesłanie formularza');
  }
});
