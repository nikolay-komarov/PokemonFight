import {
  random,
  toCapitalizeFirstLetter,
  generateLogEl,
} from './utils.js';

class Game {
  constructor({player1, player2}) {
    this.player1 = player1;
    this.player2 = player2;

    this.$controls = document.querySelector('.control');
    this.$startGameBtn = document.createElement('button');
    this.$resetGameBtn = document.createElement('button');
    this.$logs = document.querySelector('.logs__board');

    this.renderGame();
  };

  renderGame = () => {
    const $body = document.querySelector('.body');
    const $playground = document.querySelector('.playground');
    const $gameControls = document.createElement('div');
    $gameControls.classList.add('game-control');
    $body.insertBefore($gameControls, $playground);

    this.$startGameBtn.classList.add('button');
    this.$startGameBtn.innerText = 'Start Game';
    this.$startGameBtn.addEventListener('click', () => this.startGame());
    $gameControls.appendChild(this.$startGameBtn);

    this.$resetGameBtn.classList.add('button');
    this.$resetGameBtn.innerText = 'Reset Game';
    this.$resetGameBtn.addEventListener('click', () => this.resetGame());
    $gameControls.appendChild(this.$resetGameBtn);
    this.toDisableBtn(this.$resetGameBtn);
  };

  startGame = () => {
    this.toDisableBtn(this.$startGameBtn);
    this.player1.attacks.forEach(item => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = toCapitalizeFirstLetter(item.name);
      const btnCount = this.countBtn(item.maxCount, $btn);
      $btn.addEventListener('click', () => {
        btnCount();
        this.player1.changeHP(
          random(item.maxDamage, item.minDamage),
          (count) => {
            generateLogEl(this.$logs, this.player2, this.player1, count);
          },
          this.endGame
        );
        this.player2.changeHP(
          random(item.maxDamage, item.minDamage),
          (count) => {
            generateLogEl(this.$logs, this.player2, this.player1, count);
          },
          this.endGame
        );
      });
      this.$controls.appendChild($btn);
    });
  };

  resetGame = () => {
    // todo: add resetGame
    console.log(`### resetGame`);
    this.$controls.querySelectorAll('button').forEach(item => item.disabled = true);
  };

  toDisableBtn = (el) => {
    el.disabled = true;
  };
  toEnableBtn = (el) => {
    el.disabled = false;
  };

  countBtn = (count, el) => {
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
  };

  endGame = () => {
    this.$controls.querySelectorAll('button').forEach(item => item.disabled = true);
    this.toEnableBtn(this.$resetGameBtn);
  }
};

export default Game;
