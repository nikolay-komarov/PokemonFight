import Pokemon from './pokemon.js';

import {
  random,
  toCapitalizeFirstLetter
} from './utils.js';

import {pokemons} from './pokemons.js';

const pikachu = pokemons.find(item => item.name === 'Pikachu');
const charmander = pokemons.find(item => item.name === 'Charmander');

// const enemyPokemon = pokemons[random(pokemons.length)];

const player1 = new Pokemon ({
  ...pikachu,
  selectors: 'player1',
});
const player2 = new Pokemon ({
  ...charmander,
  selectors: 'player2',
});

const $controls = document.querySelector('.control');

player1.attacks.forEach(item => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = toCapitalizeFirstLetter(item.name);
  const btnCount = countBtn(item.maxCount, $btn);
  $btn.addEventListener('click', () => {
    btnCount();
    player1.changeHP(
      random(item.maxDamage, item.minDamage),
      function (count) {
        generateLogEl(player1, player2, count);
      },
      endGame
    );
    player2.changeHP(
      random(item.maxDamage, item.minDamage),
      function (count) {
        generateLogEl(player1, player2, count);
      },
      endGame
    );
  });
  $controls.appendChild($btn);
})

function countBtn (count, el) {
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
  $controls.querySelectorAll('button').forEach(item => item.disabled = true);
}

function init () {
  console.log('start');
};

init();
