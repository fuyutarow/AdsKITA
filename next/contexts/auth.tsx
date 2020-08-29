import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

import { auth, db } from 'plugins/firebase';
import { debugToast } from 'plugins/debug';
import { UserId, UserInfo, Timestamp } from 'models';
import { head7 } from 'utils';

export interface AuthContextProps {
  firebaseCurrentUser: firebase.User;
  user: UserInfo;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<UserId | null>(null);
  const [firebaseCurrentUser, setFirebaseCurrentUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    // plugins/firebase.authの状態変化をトリガーにしてAuthContextのvalueを変更
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        // ユーザがログインしました
        const currentUser = {
          id: user.uid,
          displayName: user.displayName,
          providerId: user.providerId,
          photoURL: user.photoURL,
          updatedAt: Timestamp.now(),
          // visitedThreads: {},
        };
        setFirebaseCurrentUser(user);
        setUserId(user.uid);
      } else {
        // ユーザがログアウトしました
        // socket.disconnect();
        setFirebaseCurrentUser(null);
      }
    });
  }, []);

  useEffect(
    () => {
      if (!userId) return;
      if (!firebaseCurrentUser) return;
      const listener = db.collection('users').doc(userId)
        .onSnapshot(doc => {
          const userInfo = doc.data() as UserInfo || null;

          if (userInfo) {
            const displayName = userInfo.displayName || firebaseCurrentUser.displayName || null;
            setUser({
              id: userId,
              displayName,
              photoURL: userInfo.photoURL || firebaseCurrentUser.photoURL || null,
              createdAt: userInfo.createdAt || Timestamp.now(),
              updatedAt: userInfo.updatedAt || Timestamp.now(),
            });
          } else {
            // 初見さんいらっしゃい
            const displayName = firebaseCurrentUser.displayName || null;

            // 新規ユーザのプロフィールをDBプッシュ
            const user: UserInfo = {
              id: userId,
              displayName,
              photoURL: firebaseCurrentUser.photoURL || null,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            };
            db.collection('users').doc(user.id).set(user);

            setUser(user);
          }

          debugToast(`fetch user on [userId: ${head7(userId)}]`);
        });
      return () => listener();
    },
    [firebaseCurrentUser, userId],
  );

  const value = firebaseCurrentUser && user && {
    firebaseCurrentUser,
    signOut,
    user,
  } || null;

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
