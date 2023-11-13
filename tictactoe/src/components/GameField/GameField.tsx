import cn from 'classnames';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { TCell } from '../../interfaces';
import {
  selectFields,
  selectIsGameOver,
  updateField,
  checkEndOfTheGame,
} from '../../store/slices/ticTacToeSlice';
import { Cell } from '..';
import styles from './GameField.module.scss';

interface IGameFieldProps {
  className?: string;
}

export const GameField = (props: IGameFieldProps) => {
  const { className } = props;

  const fields = useAppSelector(selectFields);
  const gameIsOver = useAppSelector(selectIsGameOver);
  const dispatch = useAppDispatch();

  const classes = cn(styles.wrapper, className);

  const cellClick = (cell: TCell, row: number, col: number) => {
    if (!gameIsOver && !cell) {
      dispatch(updateField({ row, col }));
      dispatch(checkEndOfTheGame({ row, col }));
    }
  };

  return (
    <div className={classes}>
      {fields.map((row, x) => (
        <div key={x} className={styles.row}>
          {row.map((col, y) => (
            <Cell
              key={y}
              sign={col as TCell}
              onClick={() => cellClick(col, x, y)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
