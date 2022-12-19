import React from 'react';
import { AdminPanelAuth } from '../containers/AdminPanelAuth';
import { AdminPanelContainer } from '../containers/AdminPanelContainer';

const isAuth = false;

export const AdminPanelPage = () => {
  return isAuth ? <AdminPanelContainer /> : <AdminPanelAuth />;
};
