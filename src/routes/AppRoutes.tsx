import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/not-found';
import MainLayout from '../layout/MainLayout';
import Classes from '../pages/Classes';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Settings = lazy(() => import('../pages/Settings'));


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Index Route */}
        <Route index element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        } />

        {/* Dashboard Route */}
        <Route path="dashboard" element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        } />

         <Route path="settings" element={
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        } />

          <Route path="classes" element={
          <Suspense fallback={<Loader />}>
            <Classes />
          </Suspense>
        } />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
