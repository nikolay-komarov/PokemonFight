import Pokemon from './pokemon.js';
import Game from './game.js';

import {random} from './utils.js';

import {pokemons} from './pokemons.js';

const character = pokemons.find(item => item.name === 'Pikachu');
const enemyPokemon = pokemons[random(pokemons.length)];

const player1 = new Pokemon ({
  ...character,
  selectors: 'player1',
});
const player2 = new Pokemon ({
  ...enemyPokemon,
  selectors: 'player2',
});

const game = new Game({player1, player2});

function init () {
  console.log('start');
};

init();
