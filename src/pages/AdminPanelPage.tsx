import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdminPanelAuth } from '../containers/AdminPanelAuth';
import { AdminPanelContainer } from '../containers/AdminPanelContainer';

export const AdminPanelPage = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => setIsAuth(!!user));

  return isAuth ? <AdminPanelContainer /> : <AdminPanelAuth />;
};
