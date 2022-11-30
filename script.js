const burger = document.querySelector('.burger');
const iconBurger = document.querySelector('.fa-bars');
const iconX = document.querySelector('.fa-xmark');
const column = document.querySelector('aside');

const play = document.querySelector('.play-icon');
const spanClose = document.querySelector('.close');
const popup = document.getElementById('myModal');

burger.addEventListener('click', () => {
  iconBurger.classList.toggle('show');
  iconX.classList.toggle('show');
  column.classList.toggle('show');
});

play.addEventListener('click', () => {
  popup.style.display = 'block';
});

if (spanClose && popup) {
  spanClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = 'none';
  }
};
