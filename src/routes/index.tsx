import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteConfing from './config';
import Layout from '@/layouts';

export const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <RouteConfing />
        </Layout>
      </BrowserRouter>
    </React.StrictMode>
  );
};
