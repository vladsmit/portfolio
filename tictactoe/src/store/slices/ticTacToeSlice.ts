import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCell, TTurn, IPlayerSet, ICoords } from '../../interfaces';
import { checkWinner, checkFilledCells } from '../../utils';
import { RootState, AppThunk } from '../';

export interface ticTacToeState {
  isGameOver: boolean;
  startingTurn: TTurn;
  currentTurn: TTurn;
  winner: TCell;
  players: IPlayerSet;
  fields: TCell[][];
  rowsQuantity: number;
}

const initialState: ticTacToeState = {
  isGameOver: false,
  startingTurn: 'cross',
  currentTurn: 'cross',
  winner: null,
  players: {
    cross: { name: 'Игрок 1', wins: 0 },
    zero: { name: 'Игрок 2', wins: 0 },
  },
  fields: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  rowsQuantity: 3,
};

export const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    changeGameStatus: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    changeStartingTurn: (state, action: PayloadAction<TTurn>) => {
      state.startingTurn = action.payload;
    },
    changeCurrentTurn: (state, action: PayloadAction<TTurn>) => {
      state.currentTurn = action.payload;
    },
    changeTheWinner: (state, action: PayloadAction<TCell>) => {
      state.winner = action.payload;
    },
    changeRowsQuantity: (state, action: PayloadAction<number>) => {
      state.rowsQuantity = action.payload;
    },
    updateField: (state, action: PayloadAction<ICoords>) => {
      const { row, col } = action.payload;
      state.fields[row][col] = state.currentTurn;
    },
    increaseWins: (state, action: PayloadAction<TTurn>) => {
      state.players[action.payload].wins++;
    },
    updatePlayers: (state, action: PayloadAction<IPlayerSet>) => {
      state.players = action.payload;
    },
    resetFields: state => {
      const fields: TCell[][] = Array(state.rowsQuantity).fill(
        Array(state.rowsQuantity).fill(null),
      );
      state.fields = fields;
    },
  },
});

export const updateForNewSeries =
  (
    playerOne: string,
    playerTwo: string,
    rowsQuantity: number,
    startingTurn: TTurn,
  ): AppThunk =>
  dispatch => {
    const players = {
      cross: { name: playerOne, wins: 0 },
      zero: { name: playerTwo, wins: 0 },
    };
    dispatch(updatePlayers(players));
    dispatch(changeRowsQuantity(rowsQuantity));
    dispatch(changeStartingTurn(startingTurn));
    dispatch(changeCurrentTurn(startingTurn));
    dispatch(changeTheWinner(null));
    dispatch(changeGameStatus(false));
    dispatch(resetFields());
  };

export const checkEndOfTheGame =
  (coords: ICoords): AppThunk =>
  (dispatch, getState) => {
    const { fields, currentTurn, rowsQuantity } = getState().ticTacToe;

    const winner = checkWinner(
      fields,
      currentTurn,
      rowsQuantity,
      coords.row,
      coords.col,
    );
    const isFilled = checkFilledCells(fields);

    if (winner) {
      dispatch(changeTheWinner(winner));
      dispatch(changeGameStatus(true));
      dispatch(increaseWins(winner));
    } else if (isFilled) {
      dispatch(changeGameStatus(true));
      dispatch(changeTheWinner(winner));
    } else {
      dispatch(changeCurrentTurn(currentTurn === 'cross' ? 'zero' : 'cross'));
    }
  };

export const startNewGame = (): AppThunk => (dispatch, getState) => {
  const { startingTurn } = getState().ticTacToe;
  dispatch(resetFields());
  dispatch(changeCurrentTurn(startingTurn === 'cross' ? 'zero' : 'cross'));
  dispatch(changeStartingTurn(startingTurn === 'cross' ? 'zero' : 'cross'));
  dispatch(changeTheWinner(null));
  dispatch(changeGameStatus(false));
};

export const selectIsGameOver = (state: RootState) =>
  state.ticTacToe.isGameOver;
export const selectStartingTurn = (state: RootState) =>
  state.ticTacToe.startingTurn;
export const selectCurrentTurn = (state: RootState) =>
  state.ticTacToe.currentTurn;
export const selectWinner = (state: RootState) => state.ticTacToe.winner;
export const selectPlayers = (state: RootState) => state.ticTacToe.players;
export const selectFields = (state: RootState) => state.ticTacToe.fields;
export const selectRowsQuantity = (state: RootState) =>
  state.ticTacToe.rowsQuantity;

export const {
  changeGameStatus,
  changeStartingTurn,
  changeCurrentTurn,
  changeTheWinner,
  changeRowsQuantity,
  updateField,
  updatePlayers,
  increaseWins,
  resetFields,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
