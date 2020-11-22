const $getElById = (id) => {
  return document.getElementById(id);
};

const $btnKickCharacter = $getElById('btn-kick-character');
const $btnKickEnemy = $getElById('btn-kick-enemy');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: $getElById('health-character'),
  elProgressbarHP: $getElById('progressbar-character'),

  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
}
const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: $getElById('health-enemy'),
  elProgressbarHP: $getElById('progressbar-enemy'),

  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
}

$btnKickCharacter.addEventListener('click', function () {
  console.log('kick');
  character.changeHP(random(20));
});
$btnKickEnemy.addEventListener('click', function () {
  console.log('kick');
  enemy.changeHP(random(20));
});

function random (num) {
  return Math.ceil(Math.random() * num);
};

function renderHPLife () {
  this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
};
function renderProgressbarHP () {
  this.elProgressbarHP.style.width = this.damageHP + '%';
};
function renderHP () {
  this.renderHPLife();
  this.renderProgressbarHP();
};

function changeHP (count) {
  this.damageHP -= count;

  if (this.damageHP <= 0) {
    this.damageHP = 0;
    alert('Бедный ' + this.name + ' проиграл бой!');
    $btnKickCharacter.disabled = true;
    $btnKickEnemy.disabled = true;
  }

  this.renderHP();
};

function init () {
  console.log('start');
  character.renderHP();
  enemy.renderHP();
};

init();
