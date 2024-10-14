import React, { useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { AdminPanelAuth } from '../containers/adminPanel/AdminPanelAuth';
import { AdminPanelMenuContainer } from '../containers/adminPanel/AdminPanelMenuContainer';

export const AdminPanelPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => setUser(user));

  return user !== null ? (
    <AdminPanelMenuContainer user={user} />
  ) : (
    <AdminPanelAuth />
  );
};
