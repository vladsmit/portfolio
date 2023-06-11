import { Button } from 'antd';

import { useAppSelector } from '../../hooks';
import { selectPlayers } from '../../store/slices/ticTacToeSlice';
import styles from './Header.module.scss';

interface IHeaderProps {
  setIsOpen: () => void;
}

export const Header = (props: IHeaderProps) => {
  const { setIsOpen } = props;

  const { cross: firstPlayer, zero: secondPlayer } =
    useAppSelector(selectPlayers);

  return (
    <>
      <h1 className={styles.text}>Крестики-нолики</h1>
      <div className={styles.gameCountBlock}>
        <div className={styles.playerInfoBlock}>
          <span className={styles.playerName}>{firstPlayer.name}</span>
          <span className={styles.text}>{firstPlayer.wins}</span>
        </div>

        <Button
          className={styles.buttonFontWeight}
          type="text"
          onClick={setIsOpen}
        >
          Новая серия
        </Button>

        <div className={styles.playerInfoBlock}>
          <span className={styles.playerName}>{secondPlayer.name}</span>
          <span className={styles.text}>{secondPlayer.wins}</span>
        </div>
      </div>
    </>
  );
};
