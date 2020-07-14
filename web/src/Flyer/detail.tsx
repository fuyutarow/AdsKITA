import { v4 as uuid } from 'uuid';
import isURL from 'is-url';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { colors } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { debug } from 'plugins/debug';
import { db } from 'plugins/firebase';
import { toastNotice } from 'plugins/toast';
import { Flyer } from 'models';
import { routes } from 'router';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import InputImage from './inputImage';

export default () => {
  const auth = useContext(AuthContext);

  return auth
    ? (
      <NewTicketEditor auth={auth} />
    )
    : (
      <div>
        ログインしてチケットを出品しよう
      </div>
    );
};

const NewTicketEditor: React.FC<{ auth: AuthContextProps }> = ({ auth }) => {
  const history = useHistory();
  const { flyerId } = useParams();
  const currentUser = auth.currentUser;

  const [imageURL, setImageURL] = useState<string | null>(null);

  const [flyer, setFlyer] = useState<Flyer | null>(null);

  useEffect(
    () => {
      const listener = db.collection('flyers').doc(flyerId)
        .onSnapshot(doc => {
          const flyer = doc.data() as Flyer || null;
          setFlyer(flyer);
        });
      return () => listener();
    },
    [flyerId],
  );

  const onSave = () => {
    if (!flyer) return;

    const currentFlyer: Flyer = {
      id: flyer.id,
      imageURL: imageURL || flyer.imageURL,
      size: [300, 250],
      linkURL: '',
      ownerId: currentUser.id,
    };
    db.collection('flyers').doc(flyerId).set(currentFlyer);
    toastNotice('広告素材を更新しました', { color: colors.green[500] });
  };

  const SaveButton = () => {
    const [clicked, setClicked] = useState(false);

    const disabled = (!imageURL) || clicked;
    return disabled
      ? <Button disabled={disabled} variant='contained'>保存</Button>
      : (
        <Button
          variant='contained'
          style={{
            color: 'white',
            backgroundColor: colors.green[500],
          }}
          onClick={e => {
            setClicked(true);
            onSave();
          }}
        >
          更新
        </Button>
      );
  };

  return (
    <>
      <AppHeader />
      <Container maxWidth="sm" style={{
        padding: 10,

      }}>
        <Paper style={{
          padding: 20,
        }}>
          <div>規格: 300 x 250</div>
          <InputImage {...{ setImageURL }} />
          {imageURL &&
            <img {...{
              width: 300,
              height: 250,
              src: imageURL,
            }} />
          }
          {(!imageURL) && flyer && flyer.imageURL &&
            <img {...{
              width: 300,
              height: 250,
              src: flyer.imageURL,
            }} />
          }
          <div>
            <SaveButton />
            <span style={{ padding: '0 5px 0 5px' }} ></span>
            <Button color='primary' variant='contained'
              onClick={e => {
                history.push(routes.pubs.path.replace(':id', flyerId));
              }}
            >
              プレビュー
            </Button>
          </div>
        </Paper>
      </Container>
      <AppFooter />
    </>
  );
};
