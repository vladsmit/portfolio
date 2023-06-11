import { Input, InputNumber, Modal, Radio } from 'antd';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { TTurn } from '../../interfaces';
import {
  selectPlayers,
  updateForNewSeries,
} from '../../store/slices/ticTacToeSlice';
import styles from './NewSeriesModal.module.scss';

interface INewSeriesModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}

export const NewSeriesModal = (props: INewSeriesModalProps) => {
  const { isOpen, setIsOpen } = props;

  const { cross: firstPlayer, zero: secondPlayer } =
    useAppSelector(selectPlayers);
  const dispatch = useAppDispatch();

  const [firstPlayerName, setFirstPlayerName] = useState(firstPlayer.name);
  const [secondPlayerName, setSecondPlayerName] = useState(secondPlayer.name);
  const [gameFieldSize, setGameFieldSize] = useState(3);
  const [startWith, setStartWith] = useState<TTurn>('cross');

  const startNewSeries = () => {
    dispatch(
      updateForNewSeries(
        firstPlayerName,
        secondPlayerName,
        gameFieldSize,
        startWith,
      ),
    );
    setIsOpen(false);
  };

  return (
    <Modal
      title="Новая серия"
      open={isOpen}
      onOk={startNewSeries}
      onCancel={() => setIsOpen(false)}
      okButtonProps={{ disabled: !firstPlayerName || !secondPlayerName }}
      okText="Создать"
      cancelText="Отмена"
    >
      <div className={styles.wrapper}>
        <div className={styles.inputBlock}>
          <span className={styles.textWidth}>Имя игрока 1:</span>
          <Input
            className={styles.inputWidth}
            value={firstPlayerName}
            onChange={e => setFirstPlayerName(e.target.value)}
            placeholder="Игрок 1"
          />
        </div>
        <div className={styles.inputBlock}>
          <span className={styles.textWidth}>Имя игрока 2:</span>
          <Input
            className={styles.inputWidth}
            value={secondPlayerName}
            onChange={e => setSecondPlayerName(e.target.value)}
            placeholder="Игрок 2"
          />
        </div>
        <div className={styles.inputBlock}>
          <span className={styles.textWidth}>Размер игрового поля:</span>
          <InputNumber
            className={styles.inputNumberWidth}
            value={gameFieldSize}
            onChange={value => setGameFieldSize(value ?? 3)}
            min={3}
            max={10}
          />
        </div>
        <div className={styles.inputBlock}>
          <span className={styles.textWidth}>Кто ходит первым:</span>
          <Radio.Group
            onChange={e => setStartWith(e.target.value)}
            value={startWith}
          >
            <Radio value="cross">Игрок 1</Radio>
            <Radio value="zero">Игрок 2</Radio>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
};
