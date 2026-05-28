import { observer } from 'mobx-react';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthPrivateGuard: FC<PropsWithChildren> = ({ children }) => {
  const access = true;

  if (!access) {
    return <Navigate to={`/`} />;
  }

  return <>{children}</>;
};

const AuthPrivateGuardObserver = observer(AuthPrivateGuard);

export { AuthPrivateGuardObserver as AuthPrivateGuard };
