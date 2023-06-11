import { TCell, TTurn } from '../interfaces';

const checkHorizontal = (
  fields: TCell[][],
  currentTurn: TTurn,
  quantityToWin: number,
  row: number,
) => {
  let winner = null;
  let matches = 0;
  let colIndex = 0;

  while (colIndex < fields[row]?.length) {
    if (fields[row][colIndex] === currentTurn) {
      matches++;
    }
    colIndex++;
  }

  if (matches === quantityToWin) winner = currentTurn;

  return winner;
};

const checkVertical = (
  fields: TCell[][],
  currentTurn: TTurn,
  quantityToWin: number,
  col: number,
) => {
  let winner = null;
  let matches = 0;
  let rowIndex = 0;

  while (rowIndex < fields?.length) {
    if (fields[rowIndex][col] === currentTurn) {
      matches++;
    }
    rowIndex++;
  }

  if (matches === quantityToWin) winner = currentTurn;

  return winner;
};

const checkLeftTopToRightBottomDiagonal = (
  fields: TCell[][],
  currentTurn: TTurn,
  quantityToWin: number,
) => {
  let winner = null;
  let matches = 0;
  let cellIndex = 0;

  fields.forEach(field => {
    if (currentTurn !== field[cellIndex]) return;
    matches++;
    cellIndex++;
  });

  if (matches === quantityToWin) winner = currentTurn;

  return winner;
};

const checkLeftBottomToRightTopDiagonal = (
  fields: TCell[][],
  currentTurn: TTurn,
  quantityToWin: number,
) => {
  let winner = null;
  let matches = 0;
  let cellIndex = fields?.length - 1;

  fields.forEach(field => {
    if (currentTurn !== field[cellIndex]) return;
    matches++;
    cellIndex--;
  });

  if (matches === quantityToWin) winner = currentTurn;

  return winner;
};

export const checkWinner = (
  fields: TCell[][],
  currentTurn: TTurn,
  quantityToWin: number,
  row: number,
  col: number,
) => {
  const winner =
    checkHorizontal(fields, currentTurn, quantityToWin, row) ??
    checkVertical(fields, currentTurn, quantityToWin, col) ??
    checkLeftTopToRightBottomDiagonal(fields, currentTurn, quantityToWin) ??
    checkLeftBottomToRightTopDiagonal(fields, currentTurn, quantityToWin);

  return winner;
};

export const checkFilledCells = (fields: TCell[][]) => {
  let isFilled = true;
  fields.flat().forEach(field => {
    if (!field) {
      isFilled = false;
      return;
    }
  });

  return isFilled;
};
