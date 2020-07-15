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
  const currentUser = auth.currentUser;

  const flyerId = uuid();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [linkURL, setLinkURL] = useState<string>('');
  const valid = isValidURL(linkURL) && imageURL;

  const onSave = () => {
    if (!imageURL) return;

    const flyer: Flyer = {
      id: flyerId,
      imageURL,
      size: [300, 250],
      linkURL,
      ownerId: currentUser.id,
    };
    db.collection('flyers').doc(flyerId).set(flyer);
    toastNotice('広告素材を保存しました', { color: colors.green[500] });
  };

  const SaveButton = () => {
    const [clicked, setClicked] = useState(false);
    const disabled = (!valid) || clicked;

    const message = '保存';
    const style = { margin: '10px 0 10px 0' };
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClicked(true);
      onSave();
      history.push(routes.flyerDetail.path.replace(':flyerId', flyerId));
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
            <InputLinkURL {...{ linkURL, setLinkURL }} />
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
          <div>
            <SaveButton />
          </div>
        </Paper>
      </Container>
      <AppFooter />
    </>
  );
};
