import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteConfig from './routes';
import { Layouts } from '@/layouts';

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Layouts>
          <RouteConfig />
        </Layouts>
      </BrowserRouter>
    </React.StrictMode>
  );
};
