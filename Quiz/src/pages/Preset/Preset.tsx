import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  setPlayerNames,
  resetPlayerTotals,
  setRoundData,
} from '../../utils/methods';
import { EMPTY_DATA } from '../../utils/models';

const Preset = () => {
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: {
      playerOneName: '',
      playerTwoName: '',
    },
  });
  const {
    register,
    formState: { isValid },
    watch,
  } = formMethods;
  const playerOneName = watch('playerOneName');
  const playerTwoName = watch('playerTwoName');

  const startGame = () => {
    setPlayerNames(playerOneName, playerTwoName);
    resetPlayerTotals();
    setRoundData(EMPTY_DATA);
    navigate(`/${1}`);
  };

  return (
    <div className="flex items-center justify-center flex-col h-full w-full py-7">
      <div className="flex items-center w-162 mt-20 flex-1 flex-col gap-10">
        <h1 className="text-3xl text-gray-500 font-medium">
          Кто сегодня наши герои?
        </h1>
        <div className="flex items-center justify-evenly w-full px-10 text-gray-500">
          <FormProvider {...formMethods}>
            <div className="flex flex-col gap-1 w-1/3">
              <span>Участник 1</span>
              <TextField
                {...register('playerOneName', { required: true })}
                id="outlined-basic"
                placeholder="Введите имя"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/3">
              <span>Участник 2</span>
              <TextField
                {...register('playerTwoName', { required: true })}
                id="outlined-basic"
                placeholder="Введите имя"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
            </div>
          </FormProvider>
        </div>
      </div>
      <div className="w-40 flex items-center justify-center">
        <Button
          className="w-full"
          variant="contained"
          disabled={!isValid}
          onClick={startGame}
        >
          1 раунд
        </Button>
      </div>
    </div>
  );
};

const PresetObserver = observer(Preset);

export { PresetObserver as Preset };
