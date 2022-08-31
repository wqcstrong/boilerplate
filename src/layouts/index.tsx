import LoadingFallback from '@/components/LoadingFallback';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomTab from './BottomTab';
import './index.less';

const Layouts = () => {
  return (
    <div className="app-layouts">
      <div className="app-content">
        <React.Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </React.Suspense>
      </div>
      <BottomTab />
    </div>
  );
};

export default Layouts;
