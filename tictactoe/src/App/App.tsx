import { useState } from 'react';

import { NewSeriesModal, Header, Footer, GameField } from '../components';
import styles from './App.module.scss';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header setIsOpen={() => setIsOpen(true)} />
        <GameField className={styles.gameFieldMargin} />
        <Footer />
      </div>
      {isOpen && <NewSeriesModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
