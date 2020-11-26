class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbarHP = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, hp, type, selectors}) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;

    this.renderHP();
  }

  changeHP = (count, cb, endGame) => {
    this.hp.current -= count;
   
    if (this.hp.current <= 0) {
      this.hp.current = 0;
      alert('Бедный ' + this.name + ' проиграл бой!');
      endGame && endGame();
     }
  
    this.renderHP();
    cb && cb(count);
  };

  renderHPLife = () => {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
  };
  renderProgressbarHP = () => {
    this.elProgressbarHP.style.width = Math.ceil((this.hp.current / this.hp.total) * 100) + '%';
  };
  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  };
};

export default Pokemon;