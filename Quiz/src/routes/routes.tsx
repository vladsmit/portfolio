import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import MainLayout from '../layouts/main.layout';
import { Preset } from '../pages/Preset';
import { Round } from '../pages/Round';
import { Start } from '../pages/Start';
import { Superfinal } from '../pages/Superfinal';
import { Winner } from '../pages/Winner';
import {
  PRESET_PAGE_ROUTE,
  ROUND_PAGE_ROUTE,
  WINNER_PAGE_ROUTE,
  START_PAGE_ROUTE,
  SUPERFINAL_PAGE_ROUTE,
} from '../utils/models';
import { AuthPrivateGuard } from './Auth-private.guard';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/*"
      element={
        <AuthPrivateGuard>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path={START_PAGE_ROUTE} element={<Start />} />
              <Route path={PRESET_PAGE_ROUTE} element={<Preset />} />
              <Route path={WINNER_PAGE_ROUTE} element={<Winner />} />
              <Route path={SUPERFINAL_PAGE_ROUTE} element={<Superfinal />} />
              <Route path={ROUND_PAGE_ROUTE} element={<Round />} />
              <Route index element={<Navigate to={`${START_PAGE_ROUTE}`} />} />
            </Route>
          </Routes>
        </AuthPrivateGuard>
      }
    />
  )
);
