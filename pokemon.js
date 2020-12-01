class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbarHP = document.getElementById(`progressbar-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, img, hp, type, selectors, attacks = []}) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.img = img;

    this.renderPokemon();
    this.renderHP();
  }

  renderPokemon = () => {
    this.elName.innerText = this.name;
    this.elImg.src = this.img;
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
    const percentHP = Math.ceil((this.hp.current / this.hp.total) * 100);
    this.elProgressbarHP.style.width = percentHP + '%';
    if (percentHP < 60 && percentHP >= 20) {
      this.elProgressbarHP.classList.add('low');
    }
    if (percentHP < 20) {
      this.elProgressbarHP.classList.add('critical');
    }
  };
  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  };
};

export default Pokemon;