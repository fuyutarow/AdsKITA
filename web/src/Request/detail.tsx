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
import { Flyer, PublishedFlyer } from 'models';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';

export default () => {
  const auth = useContext(AuthContext);

  return auth
    ? <Main auth={auth} />
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

  useEffect(
    () => {
      const listener = db.collection('pubs').doc(pubId)
        .onSnapshot(doc => {
          const pubed = doc.data() as PublishedFlyer || null;
          setFlyer(pubed);
        });
      return () => listener();
    },
    [pubId],
  );

  if (!flyer) return null;
  return (
    <Container maxWidth="sm" style={{
      padding: 10,
    }}>
      <Paper style={{
        padding: 20,
      }}>

        <div>
          <div>リンク先URL: <a href={flyer.linkURL} target="_blank">{flyer.linkURL}</a></div>
          <div>規格: 300 x 250</div>
          <div>
            <img {...{
              width: 300,
              height: 250,
              src: flyer.imageURL,
            }} />
          </div>
          <div>
            <Button color='primary' variant='contained'
              style={{ margin: '10px 0 10px 0' }}
              onClick={e => {
                history.push(routes.pubs.path.replace(':id', flyer.pubId));
              }}
            >
              プレビュー
            </Button>
          </div>
          <div>このドメインに広告の掲載を依頼しています</div>
          <div>掲載依頼するドメイン: <a href={`//${flyer.targetDoamin}`} target="_blank">{flyer.targetDoamin}</a></div>
        </div>
      </Paper>
    </Container>
  );
};
