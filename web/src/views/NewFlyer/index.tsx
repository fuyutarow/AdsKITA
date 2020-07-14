import { v4 as uuid } from 'uuid';

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import Paper from '@material-ui/core/Paper';

import { debug } from 'plugins/debug';
import { db } from 'plugins/firebase';
import { Flyer } from 'models';
import { routes } from 'router';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';

const MyDropzone: React.FC<{
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ setImageURL }) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const base64data = reader.result;
        if (!base64data) return;
        if (typeof base64data === 'string') return;

        debug('reader result', base64data);
        const base64string = Base64.fromUint8Array(new Uint8Array(base64data));
        const dataURL = `data:image/png;base64,${base64string}`;
        setImageURL(dataURL);
      };
      reader.readAsArrayBuffer(file);
    });

  }, [setImageURL]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{
    }}>
      <input {...getInputProps()} />
      広告素材をアップロード
      <IconButton>
        <ImageIcon />
      </IconButton>
    </div>
  );
};

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

  const [imageURL, setImageURL] = useState<string | null>(null);
  const flyerId = uuid();

  const onSave = () => {
    if (!imageURL) return;

    const flyer: Flyer = {
      id: flyerId,
      imageURL,
      size: [300, 250],
      ownerId: currentUser.id,
    };
    db.collection('flyers').doc(flyerId).set(flyer);
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
            history.push(routes.flyerDetail.path.replace(':flyerId', flyerId));
          }}
        >
          保存
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
          <MyDropzone {...{ setImageURL }} />
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
