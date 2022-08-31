import React from 'react';
import { Navigate } from 'react-router-dom';

export const DefaultIndex = () => {
  return <Navigate replace to="/home" />;
};
