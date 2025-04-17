import '../sass/main.scss';
import '../index.pug';

const menuBtn = document.getElementById('hamburguer');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', menu.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    menu.setAttribute('aria-hidden', menu.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
    menuBtn.setAttribute('aria-expanded', menu.getAttribute('aria-expanded'));
    menuBtn.setAttribute('aria-hidden', menu.getAttribute('aria-hidden'));
    menu.classList.toggle('active');
});