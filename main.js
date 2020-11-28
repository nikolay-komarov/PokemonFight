import Pokemon from './pokemon.js';

import {random, $getElById} from './utils.js';
import {
  MAX_KICKS,
  COUNT_JOLT_MAX,
  COUNT_JOLT_MIN,
  COUNT_BALL_MAX,
  COUNT_BALL_MIN,
} from './consts.js';

const player1 = new Pokemon ({
  name: 'Pikachu',
  type: 'electric',
  hp: 50,
  selectors: 'character',
});
const player2 = new Pokemon ({
  name: 'Charmander',
  type: 'fire',
  hp: 45,
  selectors: 'enemy',
});

// console.log(player1);
// console.log(player2);

const $btnThunderJolt = $getElById('btn-thunder-jolt');
const $btnElectroBall = $getElById('btn-electro-ball');

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

const btnThunderJolt = countBtn(MAX_KICKS, $btnThunderJolt);
const btnElectroBall = countBtn(MAX_KICKS, $btnElectroBall);

$btnThunderJolt.addEventListener('click', function () {
  btnThunderJolt();
  player1.changeHP(
    random(COUNT_JOLT_MAX, COUNT_JOLT_MIN),
    function (count) {
      generateLogEl(player1, player2, count);
    },
    endGame
  );
  player2.changeHP(
    random(COUNT_JOLT_MAX, COUNT_JOLT_MIN),
    function (count) {
      generateLogEl(player1, player2, count);
    },
    endGame
  );
});
$btnElectroBall.addEventListener('click', function () {
  btnElectroBall();
  player1.changeHP(
    random(COUNT_BALL_MAX, COUNT_BALL_MIN),
    function (count) {
      generateLogEl(player1, player2, count);
    },
    endGame
  );
  player2.changeHP(
    random(COUNT_BALL_MAX, COUNT_BALL_MIN),
    function (count) {
      generateLogEl(player1, player2, count);
    },
    endGame
  );
});

const $logs = document.querySelector('.logs__board');

function generateLog (firstPerson, secondPerson, damage) {
  const {
    name: characterName,
    hp: {
      current: damageHP,
      total: defaultHP,
    },
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

function generateLogEl (player1, player2, count) {
  const logText = (this === player1) ? generateLog(player1, player2, count) : generateLog(player1, player2, count);

  const $p = document.createElement('p');
  $p.innerText = logText;
  $logs.insertBefore($p, $logs.firstChild);
}

function endGame () {
  $btnThunderJolt.disabled = true;
  $btnElectroBall.disabled = true;
}

function init () {
  console.log('start');
};

init();
