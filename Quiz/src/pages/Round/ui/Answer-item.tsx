import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface IAnswerItemProps {
  name: string;
  formName: string;
  index: number;
}

export const AnswerItem: FC<IAnswerItemProps> = ({ name, index, formName }) => {
  const { register, watch } = useFormContext();
  const isChecked = watch(formName);

  if (!isChecked) {
    return (
      <label className="w-80 h-10 flex items-center justify-center text-xl text-white bg-blue-400 border border-gray-600 rounded-lg cursor-pointer">
        <input {...register(formName)} type="checkbox" className="hidden" />
        {index + 1}
      </label>
    );
  }

  return (
    <div className="w-80 h-10 flex items-center justify-center text-xl text-white bg-blue-400 border border-gray-600 rounded-lg cursor-pointer">
      {name}
    </div>
  );
};
