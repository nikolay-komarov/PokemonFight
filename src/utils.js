export const random = (max, min = 0) => {
  const num = max - min;
  return Math.ceil(Math.random() * num) + min;
};

export const toCapitalizeFirstLetter = (str) => {
  return str
    .split(' ')
    .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ')
};

const generateLog = (firstPerson, secondPerson, damage) => {
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

export const generateLogEl = (elLog, player1, player2, count) => {
  const logText = (this === player1) ? generateLog(player1, player2, count) : generateLog(player1, player2, count);
  const $p = document.createElement('p');
  $p.innerText = logText;
  elLog.insertBefore($p, elLog.firstChild);
};

