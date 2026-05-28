import { FC, useEffect, useState } from 'react';
import { TComponentPropsWithClassName } from '../../../utils/models';
import { useParams } from 'react-router-dom';

interface ITimerProps extends TComponentPropsWithClassName {}

export const Timer: FC<ITimerProps> = ({ className }) => {
  const { id } = useParams();
  const [seconds, setSeconds] = useState(10);
  const [isActiveTimer, setIsActiveTimer] = useState(false);

  const clickOnTimer = () => {
    setSeconds(10);
    setIsActiveTimer(true);
  };

  useEffect(() => {
    setSeconds(10);
    setIsActiveTimer(false);
  }, [id]);

  useEffect(() => {
    if (seconds < 1 || !isActiveTimer) {
      return;
    }
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, isActiveTimer]);

  return (
    <div
      className={`flex text-4xl text-red-500 bg-white h-12 border-2 border-gray-600 rounded-lg w-20 justify-center items-center cursor-pointer ${className}`}
      onClick={clickOnTimer}
    >
      {seconds}
    </div>
  );
};
