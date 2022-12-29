import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdminPanelAuth } from '../containers/adminPanel/AdminPanelAuth';
import { AdminPanelMenuContainer } from '../containers/adminPanel/AdminPanelMenuContainer';

export const AdminPanelPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => setIsAuth(!!user));

  return isAuth ? <AdminPanelMenuContainer /> : <AdminPanelAuth />;
};
