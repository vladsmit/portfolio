import { Avatar } from '@mui/material';
import Logo from '../assets/images/logo.jpg';
import QR from '../assets/images/qr.jpg';
import { Image } from './Image';

export const Header = () => {
  return (
    <div className="grid items-center h-28 w-full bg-blue-400 py-2 px-6">
      <Avatar
        className="col-start-1 col-end-2 row-start-1 row-end-2 justify-self-start"
        alt="Benchwarmers"
        src={Logo}
        sx={{ width: 92, height: 92 }}
      />
      <p className="col-start-1 col-end-2 row-start-1 row-end-2 justify-self-center text-6xl text-white font-semibold">
        Fantasy Quiz
      </p>
      <Image
        src={QR}
        alt="qr"
        className="animate-wiggle col-start-1 col-end-2 row-start-1 row-end-2 justify-self-end w-23 h-23 rounded-lg"
      ></Image>
    </div>
  );
};
