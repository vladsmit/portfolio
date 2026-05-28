import { IRoundData, LOCAL_STORAGE } from '../models';
import { getPlayerOneTotal, getPlayerTwoTotal } from './get-local-storage-data';

export const setPlayerNames = (playerOneName: string, playerTwoName: string) => {
  localStorage.setItem(LOCAL_STORAGE.playerOneName, playerOneName);
  localStorage.setItem(LOCAL_STORAGE.playerTwoName, playerTwoName);
};

export const setPlayerTotal = (player: number, points: number) => {
  if (player === 1) {
    const totalPoints = getPlayerOneTotal() + points;
    localStorage.setItem(LOCAL_STORAGE.playerOneTotal, JSON.stringify(totalPoints));
    return;
  }
  const totalPoints = getPlayerTwoTotal() + points;
  localStorage.setItem(LOCAL_STORAGE.playerTwoTotal, JSON.stringify(totalPoints));
}

export const resetPlayerTotals = () => {
  localStorage.setItem(LOCAL_STORAGE.playerOneTotal, JSON.stringify(0));
  localStorage.setItem(LOCAL_STORAGE.playerTwoTotal, JSON.stringify(0));
}

export const setRoundData = (data: IRoundData) => {
  localStorage.setItem(LOCAL_STORAGE.roundData, JSON.stringify(data));
} 