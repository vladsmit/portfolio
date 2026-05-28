import { FC, useState } from 'react';

interface IAnswerItemProps {
  name: string;
  isCorrect: boolean;
}

export const AnswerItem: FC<IAnswerItemProps> = ({ name, isCorrect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkAnswer = () => {
    if (isChecked && isCorrect) {
      return 'bg-green-500';
    } else if (isChecked && !isCorrect) {
      return 'bg-red-500';
    }
    return 'bg-blue-400';
  };

  return (
    <label
      className={`w-80 h-10 flex items-center justify-center text-xl text-white border border-gray-600 rounded-lg cursor-pointer ${checkAnswer()}`}
    >
      <input
        checked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
        type="checkbox"
        className="hidden"
      />
      {name}
    </label>
  );
};
