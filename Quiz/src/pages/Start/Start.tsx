import { Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { PRESET_PAGE_ROUTE } from '../../utils/models';
import QR from '../../assets/images/qr.jpg';
import { Image } from '../../components/Image';

const Start = () => {
  const navigate = useNavigate();

  const navigateToPresetPage = () => {
    localStorage.clear();
    navigate(`/${PRESET_PAGE_ROUTE}`);
  };

  return (
    <div className="flex items-center justify-center flex-col h-full w-full py-7">
      <div className="flex items-center mt-20 flex-1 flex-col gap-10">
        <p className="text-3xl text-gray-600">
          Подписывайтесь на канал Benchwarmers:
        </p>
        <Image src={QR} alt="qr" className="w-72 h-72 rounded-lg"></Image>
      </div>
      <div className="w-40 flex items-center justify-center">
        <Button
          className="w-full"
          variant="contained"
          onClick={navigateToPresetPage}
        >
          Начать игру
        </Button>
      </div>
    </div>
  );
};

const StartObserver = observer(Start);

export { StartObserver as Start };
