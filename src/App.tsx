import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteConfing from '@/routes/config';

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <RouteConfing />
      </BrowserRouter>
    </React.StrictMode>
  );
};
