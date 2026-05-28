import { Header } from '../components/Header';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex w-full h-full flex-col overflow-hidden bg-white-1000">
      <Header />
      <main className="flex flex-1 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default observer(MainLayout);
