import { EMPTY_DATA, IRoundData, LOCAL_STORAGE } from '../models';

export const getPlayerOneName = () => {
  return localStorage.getItem(LOCAL_STORAGE.playerOneName) ?? '';
};

export const getPlayerTwoName = () => {
  return localStorage.getItem(LOCAL_STORAGE.playerTwoName) ?? '';
};

export const getPlayerOneTotal = () => {
  return Number(localStorage.getItem(LOCAL_STORAGE.playerOneTotal)) ?? 0;
};

export const getPlayerTwoTotal = () => {
  return Number(localStorage.getItem(LOCAL_STORAGE.playerTwoTotal)) ?? 0;
};

export const getRoundData = (): IRoundData => {
  const roundData = localStorage.getItem(LOCAL_STORAGE.roundData);
  return roundData ? JSON.parse(roundData) : EMPTY_DATA;
}