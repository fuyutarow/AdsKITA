import { v4 as uuid } from 'uuid';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { colors } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { db } from 'plugins/firebase';
import { toastNotice } from 'plugins/toast';
import { routes } from 'router';
import { Flyer, PublishedFlyer, PubId, PubRecord } from 'models';
import { AuthContext, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import { debug } from 'plugins/debug';

export default () => {
  const auth = useContext(AuthContext);

  return auth
    ? (
      <>
        <AppHeader />
        <Main auth={auth} />
      </>
    )
    : (
      <div>
        ログインしてチケットを出品しよう
      </div>
    );
};

const Main: React.FC<{ auth: AuthContextProps }> = ({ auth }) => {
  const history = useHistory();
  const { id: pubId } = useParams();
  const [flyer, setFlyer] = useState<PublishedFlyer | null>(null);
  const [pubRecord, setPubRecord] = useState<PubRecord>({});

  useEffect(
    () => {
      const listener = db.collection('users').doc(auth.user.id).collection('pubs')
        .onSnapshot(querySnapshot => {
          const pubList: Array<PublishedFlyer> = querySnapshot.docs.map(doc => {
            return doc.data() as PublishedFlyer;
          });
          pubList.forEach(pub => {
            pubRecord[pub.pubId] = pub;
          });
          setPubRecord(pubRecord);
        });
      return () => listener();
    },
    [auth.user.id, pubRecord],
  );

  return (
    <div>
      <div>hello</div>
      <button onClick={e => {
        debug(pubRecord);
      }}>dbg</button>
    </div>
  );
};
