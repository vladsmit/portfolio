import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectIsGameOver,
  selectWinner,
  selectPlayers,
  selectCurrentTurn,
  startNewGame,
} from '../../store/slices/ticTacToeSlice';
import styles from './Footer.module.scss';

export const Footer = () => {
  const isGameOver = useAppSelector(selectIsGameOver);
  const winner = useAppSelector(selectWinner);
  const currentTurn = useAppSelector(selectCurrentTurn);
  const { cross: firstPlayer, zero: secondPlayer } =
    useAppSelector(selectPlayers);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      {isGameOver ? (
        <p className={styles.text}>
          <span>{winner ? 'Победитель: ' : 'Ничья!'}</span>
          {winner && (
            <span className={styles.playerText}>
              {winner === 'cross' ? firstPlayer.name : secondPlayer.name}
            </span>
          )}
        </p>
      ) : (
        <p className={styles.text}>
          <span>Ходит: </span>
          <span className={styles.playerText}>
            {currentTurn === 'cross' ? firstPlayer.name : secondPlayer.name}
          </span>
        </p>
      )}
      <Button type="primary" ghost onClick={() => dispatch(startNewGame())}>
        Новая игра
      </Button>
    </div>
  );
};
