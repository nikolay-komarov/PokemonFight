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
