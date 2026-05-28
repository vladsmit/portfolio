import { observer } from 'mobx-react';
import { useCommonStore } from '../../stores';
import { AnswerItem } from './ui';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Superfinal = () => {
  const { quizData, quizDataAlt } = useCommonStore();
  const navigate = useNavigate();

  const finalData = quizData['superfinal'];

  return (
    <div className="flex items-center justify-center flex-col h-full w-full py-7">
      <div className="flex items-center mt-20 flex-1 flex-col gap-10">
        <p className="text-3xl text-gray-600">{finalData.title}</p>
        <div className="flex gap-2 w-162 flex-wrap justify-center items-center">
          {finalData.answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              name={answer.name}
              isCorrect={answer.isCorrect!}
            />
          ))}
        </div>
      </div>
      <div className="w-40 flex items-center justify-center">
        <Button variant="contained" onClick={() => navigate('/')}>
          Конец игры
        </Button>
      </div>
    </div>
  );
};

const SuperfinalObserver = observer(Superfinal);

export { SuperfinalObserver as Superfinal };
