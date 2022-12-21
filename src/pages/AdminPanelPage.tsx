import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdminPanelAuth } from '../containers/AdminPanelAuth';
import { AdminPanelMenuContainer } from '../containers/AdminPanelMenuContainer';

export const AdminPanelPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => setIsAuth(!!user));

  return isAuth ? <AdminPanelMenuContainer /> : <AdminPanelAuth />;
};
