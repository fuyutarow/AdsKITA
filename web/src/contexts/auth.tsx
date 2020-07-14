import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

import { UserInfo, Timestamp } from 'models';

import { auth } from 'plugins/firebase';

export interface AuthContextProps {
  currentUser: UserInfo;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: any) => {
  const [value, setValue] = useState<AuthContextProps | null>(null);

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    // plugins/firebase.authの状態変化をトリガーにしてAuthContextのvalueを変更
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        // ユーザがログインしました
        const currentUser: UserInfo = {
          id: user.uid,
          displayName: user.displayName,
          providerId: user.providerId,
          photoURL: user.photoURL,
          updatedAt: Timestamp.now(),
        };
        // socket.emit('iam', currentUser.uid);
        setValue({ currentUser, signOut });
      } else {
        // ユーザがログアウトしました
        // socket.disconnect();
        setValue(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
