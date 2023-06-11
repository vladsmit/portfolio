import cross from '../../assets/images/cross.png';
import zero from '../../assets/images/zero.png';
import { TCell } from '../../interfaces';
import styles from './Cell.module.scss';

interface ICellProps {
  sign: TCell;
  onClick: () => void;
}

export const Cell = (props: ICellProps) => {
  const { sign, onClick } = props;
  return (
    <div className={sign ? styles.filledCell : styles.cell} onClick={onClick}>
      {sign ? (
        <img
          src={sign === 'cross' ? cross : zero}
          alt={sign}
          className={styles.image}
        />
      ) : (
        ''
      )}
    </div>
  );
};
