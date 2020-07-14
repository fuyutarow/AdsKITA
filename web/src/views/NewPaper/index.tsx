import { v4 as uuid } from 'uuid';

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import Paper from '@material-ui/core/Paper';

import { debug } from 'plugins/debug';
import { db } from 'plugins/firebase';
import { Ticket, TicketStatus, NewTicket, UserInfo } from 'models';
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
      画像をアップロード
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
        </Paper>
      </Container>
      <AppFooter />
    </>
  );
};
