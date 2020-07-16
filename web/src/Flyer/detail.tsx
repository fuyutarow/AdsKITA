import { v4 as uuid } from 'uuid';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { colors } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { debug } from 'plugins/debug';
import { db } from 'plugins/firebase';
import { toastNotice } from 'plugins/toast';
import { Flyer } from 'models';
import { routes } from 'router';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';
import InputImage from './inputImage';
import InputLinkURL, { isValidURL } from './inputLinkURL';
import RequestPart from './RequestPart';

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
  const currentUser = auth.user;

  const { flyerId } = useParams();
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [linkURL, setLinkURL] = useState<string>('');

  useEffect(
    () => {
      const listener = db.collection('flyers').doc(flyerId)
        .onSnapshot(doc => {
          const flyer = doc.data() as Flyer || null;
          setFlyer(flyer);
          setLinkURL(flyer.linkURL);
        });
      return () => listener();
    },
    [flyerId],
  );

  if (!flyer) return null;
  const currnetLinkURL = isValidURL(linkURL) && linkURL !== flyer.linkURL
    ? linkURL
    : flyer.linkURL;
  const valid = currnetLinkURL !== flyer.linkURL || Boolean(imageURL);

  const onSave = () => {
    if (!flyer) return;

    const currentFlyer: Flyer = {
      id: flyer.id,
      imageURL: imageURL || flyer.imageURL,
      size: [300, 250],
      linkURL: currnetLinkURL,
      ownerId: currentUser.id,
    };
    db.collection('flyers').doc(flyerId).set(currentFlyer);
    toastNotice('広告素材を更新しました', { color: colors.green[500] });
  };

  const SaveButton = () => {
    const [clicked, setClicked] = useState(false);
    const disabled = (!valid) || clicked;

    const message = '更新';
    const style = { margin: '10px 0 10px 0' };
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClicked(true);
      onSave();
    };
    return disabled
      ? <Button disabled={disabled} variant='contained' style={{ ...style }}>{message}</Button>
      : <Button variant='contained' onClick={onClick} style={{
        ...style,
        color: 'white',
        backgroundColor: colors.green[500],
      }}>{message}</Button>;
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
          <div>
            <InputLinkURL {...{
              linkURL: linkURL === '' ? flyer.linkURL : linkURL,
              setLinkURL,
            }} />
          </div>
          <div>規格: 300 x 250</div>
          <InputImage {...{ setImageURL }} />
          {imageURL &&
            <img {...{
              width: 300,
              height: 250,
              src: imageURL,
            }} />
          }
          {(!imageURL) && flyer.imageURL &&
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
              style={{ margin: '10px 0 10px 0' }}
              onClick={e => {
                history.push(routes.pubs.path.replace(':id', flyerId));
              }}
            >
              プレビュー
            </Button>
          </div>

          <hr style={{ margin: '10px 0 20px 0' }} />

          <RequestPart flyer={flyer} />
        </Paper>
      </Container>
    </>
  );
};
