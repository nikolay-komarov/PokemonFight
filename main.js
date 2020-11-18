const $btn = document.getElementById('btn-kick');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbarHP: document.getElementById('progressbar-character'),
}
const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbarHP: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', () => {
  console.log('kick');
  changeHP(random(20), character);
  changeHP(random(20), enemy);
});

const random = (num) => {
  return Math.ceil(Math.random() * num);
};

const renderHPLife = (person) => {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
};
const renderProgressbarHP = (person) => {
  person.elProgressbarHP.style.width = person.damageHP + '%';
};
const renderHP = (person) => {
  renderHPLife(person);
  renderProgressbarHP(person);
};

const changeHP = (count, person) => {
  if (person.damageHP < count) {
    person.damageHP = 0;
    alert('Бедный ' + person.name + ' проиграл бой!');
    $btn.disabled = true;
  } else {
    person.damageHP -= count;
  };

  renderHP(person);
};

const init = () => {
  console.log('start');
  renderHP(character);
  renderHP(enemy);
};

init();
