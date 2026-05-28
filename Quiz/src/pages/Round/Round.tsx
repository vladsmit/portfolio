import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommonStore } from '../../stores';
import { NotFound } from '../../components';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import { EMPTY_DATA, IRoundData, WINNER_PAGE_ROUTE } from '../../utils/models';
import { AnswerItem, ErrorItem, Timer } from './ui';
import { FormProvider, useForm } from 'react-hook-form';
import {
  getPlayerOneName,
  getPlayerOneTotal,
  getPlayerTwoName,
  getPlayerTwoTotal,
  getRoundData,
  setPlayerTotal,
  setRoundData,
} from '../../utils/methods';

const Round = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizData, quizDataAlt } = useCommonStore();

  const [hasTransferFinished, setHasTransferFinished] = useState(false);

  const formMethods = useForm<IRoundData>({
    defaultValues: {
      roundTotal: getRoundData().roundTotal,
      playerOneError1: getRoundData().playerOneError1,
      playerOneError2: getRoundData().playerOneError2,
      playerOneError3: getRoundData().playerOneError3,
      playerTwoError1: getRoundData().playerTwoError1,
      playerTwoError2: getRoundData().playerTwoError2,
      playerTwoError3: getRoundData().playerTwoError3,
      answer1: getRoundData().answer1,
      answer2: getRoundData().answer2,
      answer3: getRoundData().answer3,
      answer4: getRoundData().answer4,
      answer5: getRoundData().answer5,
      answer6: getRoundData().answer6,
      answer7: getRoundData().answer7,
      answer8: getRoundData().answer8,
    },
  });
  const { reset, watch, setValue } = formMethods;
  const roundTotal = watch('roundTotal');
  const playerOneError1 = watch('playerOneError1');
  const playerOneError2 = watch('playerOneError2');
  const playerOneError3 = watch('playerOneError3');
  const playerTwoError1 = watch('playerTwoError1');
  const playerTwoError2 = watch('playerTwoError2');
  const playerTwoError3 = watch('playerTwoError3');
  const answer1 = watch('answer1');
  const answer2 = watch('answer2');
  const answer3 = watch('answer3');
  const answer4 = watch('answer4');
  const answer5 = watch('answer5');
  const answer6 = watch('answer6');
  const answer7 = watch('answer7');
  const answer8 = watch('answer8');
  const setRoundTotal = (value: number) => setValue('roundTotal', value);

  const data = quizData[id!];

  const getRoundTotal = () => {
    if (hasTransferFinished) {
      return 0;
    }

    const answersArray = [
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      answer7,
      answer8,
    ];
    const currentRoundTotal = answersArray.reduce(
      (sum: number, answer: boolean, index: number) => {
        if (answer) {
          sum += data.answers[index].id * +id!;
        }
        return sum;
      },
      0
    );
    return currentRoundTotal;
  };

  const transferRoundTotal = (player: number) => {
    setPlayerTotal(player, roundTotal);
    setRoundTotal(0);
    setHasTransferFinished(true);
  };

  const resetRound = () => {
    setRoundTotal(0);
    setHasTransferFinished(false);
    reset(EMPTY_DATA);
  };

  const navigateFurther = () => {
    if (!id) {
      return;
    }

    resetRound();
    if (id === '4') {
      navigate(`/${WINNER_PAGE_ROUTE}`);
      return;
    }
    navigate(`/${+id + 1}`);
  };

  useEffect(() => {
    setRoundTotal(getRoundTotal());
  }, [answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8]);

  useEffect(() => {
    setRoundData({
      roundTotal,
      playerOneError1,
      playerOneError2,
      playerOneError3,
      playerTwoError1,
      playerTwoError2,
      playerTwoError3,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      answer7,
      answer8,
    });
  }, [
    roundTotal,
    playerOneError1,
    playerOneError2,
    playerOneError3,
    playerTwoError1,
    playerTwoError2,
    playerTwoError3,
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
    answer8,
  ]);

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="flex h-full w-full justify-center gap-16 items-start py-7">
      <div className="flex flex-col justify-between gap-2 w-64 h-48 mt-20 items-center rounded-lg bg-slate-100 border-2 border-gray-600 p-2">
        <p className="text-2xl text-gray-500 font-medium text-center">
          {getPlayerOneName()}
        </p>
        <div className="flex flex-col items-center">
          <p className="rounded-lg bg-blue-400 border-2 border-gray-600 flex items-center justify-center w-16 h-10 text-2xl text-white">
            {getPlayerOneTotal()}
          </p>
          <IconButton
            className="w-10"
            color="success"
            onClick={() => transferRoundTotal(1)}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 36 } }}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>

      <FormProvider {...formMethods}>
        <div className="flex flex-col items-center gap-4 w-123">
          <div className="grid items-center w-full">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 justify-self-center">
              <p className="flex text-4xl text-white bg-blue-400 h-16 border-2 border-gray-600 rounded-lg w-24 justify-center items-center">
                {roundTotal}
              </p>
            </div>
            <Timer className="col-start-1 col-end-2 row-start-1 row-end-2 justify-self-end" />
          </div>
          <p className="text-xl h-16 p-2 w-full text-center text-white bg-blue-400 border-2 border-gray-600 rounded-lg flex items-center justify-center">
            {data.title}
          </p>
          <div className="flex w-full justify-between px-2">
            <div className="flex flex-col items-center gap-6">
              <p className="text-4xl text-white bg-blue-400 h-20 border-2 border-gray-600 rounded-lg w-14 flex items-center justify-center">
                {id}
              </p>
              <ButtonGroup
                orientation="vertical"
                className="w-10 flex gap-3 items-center justify-center"
              >
                <ErrorItem formName="playerOneError1" />
                <ErrorItem formName="playerOneError2" />
                <ErrorItem formName="playerOneError3" />
              </ButtonGroup>
            </div>
            <div className="flex gap-1 justify-center flex-col items-center">
              {data.answers.map((answer, i) => (
                <AnswerItem
                  key={answer.id}
                  name={answer.name}
                  index={i}
                  formName={`answer${i + 1}`}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-6">
              <p className="text-4xl text-white bg-blue-400 h-20 border-2 border-gray-600 rounded-lg w-14 flex items-center justify-center">
                {id}
              </p>
              <ButtonGroup
                orientation="vertical"
                className="w-10 flex gap-3 items-center justify-center"
              >
                <ErrorItem formName="playerTwoError1" />
                <ErrorItem formName="playerTwoError2" />
                <ErrorItem formName="playerTwoError3" />
              </ButtonGroup>
            </div>
          </div>
          <div className="flex mt-10 w-full gap-4 items-center justify-center">
            <Button
              className="w-40"
              variant="outlined"
              color="error"
              onClick={resetRound}
            >
              Сброс очков
            </Button>
            <Button
              className="w-40"
              variant="contained"
              onClick={navigateFurther}
            >
              {+id! < 4 ? `${+id! + 1} Раунд` : 'Итоги'}
            </Button>
          </div>
        </div>
      </FormProvider>

      <div className="flex flex-col justify-between gap-2 w-64 h-48 mt-20 items-center rounded-lg bg-slate-100 border-2 border-gray-600 p-2">
        <p className="text-2xl text-gray-500 font-medium text-center">
          {getPlayerTwoName()}
        </p>
        <div className="flex flex-col items-center">
          <p className="rounded-lg bg-blue-400 border-2 border-gray-600 flex items-center justify-center w-16 h-10 text-2xl text-white">
            {getPlayerTwoTotal()}
          </p>
          <IconButton
            className="w-10"
            color="success"
            onClick={() => transferRoundTotal(2)}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 36 } }}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const RoundObserver = observer(Round);

export { RoundObserver as Round };
