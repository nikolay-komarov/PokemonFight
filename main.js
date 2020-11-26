import {random, $getElById} from './utils.js';
import {
  MAX_KICKS,
  COUNT_JOLT_MAX,
  COUNT_JOLT_MIN,
  COUNT_BALL_MAX,
  COUNT_BALL_MIN,
} from './consts.js';

const $btnTunderJolt = $getElById('btn-thunder-jolt');
const $btnElectroBall = $getElById('btn-electro-ball');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: $getElById('health-character'),
  elProgressbarHP: $getElById('progressbar-character'),

  changeHP,
  renderHP,
  renderHPLife,
  renderProgressbarHP,
}
const enemy = {
  name: 'Charmander',
  defaultHP: 120,
  damageHP: 120,
  elHP: $getElById('health-enemy'),
  elProgressbarHP: $getElById('progressbar-enemy'),

  changeHP,
  renderHP,
  renderHPLife,
  renderProgressbarHP,
}

function countBtn (count = MAX_KICKS, el) {
  const innerText = el.innerText;
  el.innerText = `${innerText} (${count})`;

  return function () {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} (${count})`;
    return count;
  }
}

const btnCountJolt = countBtn(MAX_KICKS, $btnTunderJolt);
const btnElectroBall = countBtn(MAX_KICKS, $btnElectroBall);

$btnTunderJolt.addEventListener('click', function () {
  character.changeHP(random(COUNT_JOLT_MAX, COUNT_JOLT_MIN));
  enemy.changeHP(random(COUNT_JOLT_MAX, COUNT_JOLT_MIN));
});
$btnElectroBall.addEventListener('click', function () {
  character.changeHP(random(COUNT_BALL_MAX, COUNT_BALL_MIN));
  enemy.changeHP(random(COUNT_BALL_MAX, COUNT_BALL_MIN));
});

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
    $btnTunderJolt.disabled = true;
    $btnElectroBall.disabled = true;
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
