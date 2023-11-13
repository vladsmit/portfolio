import { RootState } from '..';
import ticTacToeReducer, {
  ticTacToeState,
  selectCurrentTurn,
  selectFields,
  selectIsGameOver,
  selectPlayers,
  selectRowsQuantity,
  selectStartingTurn,
  selectWinner,
  changeGameStatus,
  changeStartingTurn,
  changeCurrentTurn,
  changeTheWinner,
  changeRowsQuantity,
  updateField,
  updatePlayers,
  increaseWins,
  resetFields,
  startNewGame,
  checkEndOfTheGame,
  updateForNewSeries,
} from './ticTacToeSlice';

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

describe('ticTacToe reducer selectors', () => {
  it('should select current turn from state object', () => {
    const result = selectCurrentTurn({ ticTacToe: initialState });

    expect(result).toBe(initialState.currentTurn);
  });

  it('should select fields from state object', () => {
    const result = selectFields({ ticTacToe: initialState });

    expect(result).toBe(initialState.fields);
  });

  it('should select game status from state object', () => {
    const result = selectIsGameOver({ ticTacToe: initialState });

    expect(result).toBe(initialState.isGameOver);
  });

  it('should select players from state object', () => {
    const result = selectPlayers({ ticTacToe: initialState });

    expect(result).toBe(initialState.players);
  });

  it('should select rows quantity from state object', () => {
    const result = selectRowsQuantity({ ticTacToe: initialState });

    expect(result).toBe(initialState.rowsQuantity);
  });

  it('should select starting turn from state object', () => {
    const result = selectStartingTurn({ ticTacToe: initialState });

    expect(result).toBe(initialState.startingTurn);
  });

  it('should select winner from state object', () => {
    const result = selectWinner({ ticTacToe: initialState });

    expect(result).toBe(initialState.winner);
  });
});

describe('ticTacToe reducer actions', () => {
  it('should return default state when passed an empty action', () => {
    expect(ticTacToeReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should change game status with "changeGameStatus" action', () => {
    const action = { type: changeGameStatus.type, payload: true };
    const result = ticTacToeReducer(initialState, action);

    expect(result.isGameOver).toBe(true);
  });

  it('should change starting turn with "changeStartingTurn" action', () => {
    const action = { type: changeStartingTurn.type, payload: 'zero' };
    const result = ticTacToeReducer(initialState, action);

    expect(result.startingTurn).toBe('zero');
  });

  it('should change current turn with "changeCurrentTurn" action', () => {
    const action = { type: changeCurrentTurn.type, payload: 'zero' };
    const result = ticTacToeReducer(initialState, action);

    expect(result.currentTurn).toBe('zero');
  });

  it('should change the winner with "changeTheWinner" action', () => {
    const action = { type: changeTheWinner.type, payload: 'cross' };
    const result = ticTacToeReducer(initialState, action);

    expect(result.winner).toBe('cross');
  });

  it('should change quantity of rows with "changeRowsQuantity" action', () => {
    const action = { type: changeRowsQuantity.type, payload: 4 };
    const result = ticTacToeReducer(initialState, action);

    expect(result.rowsQuantity).toBe(4);
  });

  it('should update field state with "updateField" action', () => {
    const action = {
      type: updateField.type,
      payload: { row: 1, col: 2 },
    };
    const result = ticTacToeReducer(initialState, action);

    expect(result.fields[1][2]).toBe(initialState.currentTurn);
  });

  it('should update players data with "updatePlayers" action', () => {
    const updatedPlayers = {
      cross: { name: 'player 1', wins: 0 },
      zero: { name: 'player 2', wins: 0 },
    };
    const action = { type: updatePlayers.type, payload: updatedPlayers };
    const result = ticTacToeReducer(initialState, action);

    expect(result.players).toEqual(updatedPlayers);
  });

  it('should increase number of wins with "increaseWins" action', () => {
    const action = { type: increaseWins.type, payload: 'zero' };
    const result = ticTacToeReducer(initialState, action);

    expect(result.players['zero'].wins).toBe(1);
  });

  it('should reset fields with "resetFields" action', () => {
    const action = { type: resetFields.type, payload: 'zero' };
    const result = ticTacToeReducer(initialState, action);

    expect(result.fields).toEqual(initialState.fields);
  });
});

describe('ticTacToe reducer thunk actions', () => {
  it('should update data and start new series with "updateForNewSeries" action', async () => {
    const dispatch = jest.fn();
    const state: RootState = {
      ticTacToe: initialState,
    };
    const thunk = updateForNewSeries('player 1', 'player 2', 4, 'zero');

    await thunk(dispatch, () => state, undefined);
  });

  it('should check status of the winner and tie-game with "checkEndOfTheGame" action', async () => {
    const dispatch = jest.fn();
    const state: RootState = {
      ticTacToe: initialState,
    };
    const thunk = checkEndOfTheGame({ row: 1, col: 2 });

    await thunk(dispatch, () => state, undefined);
  });

  it('should start new game with "startNewGame" action', async () => {
    const dispatch = jest.fn();
    const state: RootState = {
      ticTacToe: initialState,
    };
    const thunk = startNewGame();

    await thunk(dispatch, () => state, undefined);
  });
});
