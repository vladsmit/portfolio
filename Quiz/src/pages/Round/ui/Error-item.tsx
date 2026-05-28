import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface IErrorItemProps {
  formName: string;
}

export const ErrorItem: FC<IErrorItemProps> = ({ formName }) => {
  const { register, watch } = useFormContext();
  const isChecked = watch(formName);

  return (
    <label className="cursor-pointer ">
      <input {...register(formName)} type="checkbox" className="hidden" />
      {isChecked ? (
        <CancelIcon sx={{ fontSize: 48, color: 'red' }} />
      ) : (
        <CancelOutlinedIcon sx={{ fontSize: 48, color: 'red' }} />
      )}
    </label>
  );
};
