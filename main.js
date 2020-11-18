// #1
const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function getRow(firstRow, secondRow) {
  let countAInFirstRow = 0;
  let countAInSecondRow = 0;

  for (let i = 0; i < firstRow.length; i++) {
    if (firstRow.charAt(i) === 'а') {
      countAInFirstRow++;
    }
  }
  for (let i = 0; i < secondRow.length; i++) {
    if (secondRow.charAt(i) === 'а') {
      countAInSecondRow++;
    }
  }

  return (countAInFirstRow >= countAInSecondRow) ? firstRow : secondRow;
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму


// #2
const VALID_COUNT = 12;
function formattedPhone(phone) {
  let formattedOutput = '';
  if (phone.length === VALID_COUNT) {
    for (i = 0; i < phone.length; i++)  {
      formattedOutput = formattedOutput + phone.charAt(i);
      if (i === 1) {formattedOutput = formattedOutput + ' ('}
      if (i === 4) {formattedOutput = formattedOutput + ') '}
      if (i === 7 || i === 9) {formattedOutput = formattedOutput + '-'}
    }
  } else {
    return 'введено не верное кол-во в номере';
  }

  return formattedOutput;
}

console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90
