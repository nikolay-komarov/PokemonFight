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

  console.log((this === character) ? generateLog(character, enemy, count) : generateLog(enemy, character, count));

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

function generateLog (firstPerson, secondPerson, damage) {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар / ${firstPerson.defaultHP}.`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику -${damage} [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
  ];

  return logs[random(logs.length) - 1];
};

init();
