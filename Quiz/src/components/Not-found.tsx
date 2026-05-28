import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Oops!</h1>
        <h2 className="text-2xl font-medium text-gray-600">
          404 - Страница не найдена
        </h2>
      </div>
      <div className="mt-8">
        <Button onClick={() => navigate('/')} variant='contained'>Вернуться на главную</Button>
      </div>
    </div>
  );
};
