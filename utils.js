function random (max, min = 0) {
  const num = max - min;
  return Math.ceil(Math.random() * num) + min;
};

const $getElById = (id) => {
  return document.getElementById(id);
};

export {
  random,
  $getElById
};
