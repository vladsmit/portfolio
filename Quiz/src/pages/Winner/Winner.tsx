import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SUPERFINAL_PAGE_ROUTE } from '../../utils/models';
import {
  getPlayerOneName,
  getPlayerOneTotal,
  getPlayerTwoName,
  getPlayerTwoTotal,
} from '../../utils/methods';

const Winner = () => {
  const navigate = useNavigate();

  const getWinner = () => {
    if (getPlayerOneTotal() > getPlayerTwoTotal()) {
      return `${getPlayerOneName()} - ${getPlayerOneTotal()} очков`;
    } else if (getPlayerTwoTotal() > getPlayerOneTotal()) {
      return `${getPlayerTwoName()} - ${getPlayerTwoTotal()} очков`;
    }
    return 'Никто';
  };

  return (
    <div className="flex items-center justify-center flex-col h-full w-full py-7">
      <div className="flex items-center mt-20 flex-1 flex-col gap-10">
        <div className="flex items-center flex-col gap-1">
          <span className="text-3xl text-gray-600">
            Абсолютный топчик на сегодня:
          </span>
          <span className="text-3xl text-gray-600">{getWinner()}</span>
        </div>
        <video
          src={
            getPlayerTwoTotal() === getPlayerOneTotal()
              ? 'tie.mp4'
              : 'champ.mp4'
          }
          width="300"
          height="300"
          autoPlay
          muted
          loop
        ></video>
      </div>
      <div className="w-40 flex items-center justify-center">
        <Button
          variant="contained"
          onClick={() => navigate(`/${SUPERFINAL_PAGE_ROUTE}`)}
        >
          Суперфинал
        </Button>
      </div>
    </div>
  );
};

const WinnerObserver = observer(Winner);

export { WinnerObserver as Winner };
