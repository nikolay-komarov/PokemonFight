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
  defaultHP: 120,
  damageHP: 120,
  elHP: $getElById('health-enemy'),
  elProgressbarHP: $getElById('progressbar-enemy'),

  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
}

const MAX_KICKS = 6;

function countKicks (person) {
  let count = 0;
  const maxKicks = MAX_KICKS;
  const {name} = person;

  return function addCount(el) {
    if (count <= (maxKicks - 1)) {
      count += 1;
      console.log(`kick ${name}: ${count} / ${maxKicks}; re: ${maxKicks - count}`);
    }
    
    if (count === maxKicks) {
      el.disabled = true;
    }
  }
}

const countKicksCharacter = countKicks(character);
const countKicksEnemy = countKicks(enemy);

$btnKickCharacter.addEventListener('click', function () {
  character.changeHP(random(20));

  countKicksCharacter($btnKickCharacter);
});
$btnKickEnemy.addEventListener('click', function () {
  enemy.changeHP(random(20));

  countKicksEnemy($btnKickEnemy);
});

function random (num) {
  return Math.ceil(Math.random() * num);
};

function renderHPLife () {
  this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
};
function renderProgressbarHP () {
  this.elProgressbarHP.style.width = Math.ceil((this.damageHP / this.defaultHP) * 100) + '%';
};
function renderHP () {
  this.renderHPLife();
  this.renderProgressbarHP();
};

const $logs = document.querySelector('.logs__board');

function changeHP (count) {
  this.damageHP -= count;

  const logText = (this === character) ? generateLog(character, enemy, count) : generateLog(enemy, character, count);

  const $p = document.createElement('p');
  $p.innerText = logText;
  $logs.insertBefore($p, $logs.firstChild);

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
  const {
    name: characterName,
    damageHP,
    defaultHP
  } = firstPerson;
  const {name: enemyName} = secondPerson;
  const logs = [
    `${characterName} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${damage} [${damageHP} / ${defaultHP}].`,
    `${characterName} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${damage} [${damageHP} / ${defaultHP}]`,
    `${characterName} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${damage} [${damageHP} / ${defaultHP}]`,
  ];

  return logs[random(logs.length) - 1];
};

init();
