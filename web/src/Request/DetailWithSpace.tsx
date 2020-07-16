import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { colors } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';
import { css } from 'emotion';

import { db } from 'plugins/firebase';
import { debug } from 'plugins/debug';
import { toastNotice } from 'plugins/toast';
import { routes } from 'router';
import { PublishedFlyerWithStatus, StatusPublish } from 'models';
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
  const { spaceId } = useParams();
  const domain = decodeURIComponent(spaceId);
  const history = useHistory();
  const { pubId } = useParams();
  const [flyer, setFlyer] = useState<PublishedFlyerWithStatus | null>(null);

  useEffect(
    () => {
      if (!auth) return;
      if (!domain) return;
      debug(auth, domain, pubId);
      const listener = db.collection('users').doc(auth.user.id).collection('domains').doc(domain).collection('pubs').doc(pubId)
        .onSnapshot(doc => {
          const pubed = doc.data() as PublishedFlyerWithStatus || null;
          setFlyer(pubed);
        });
      return () => listener();
    },
    [auth, auth.user.id, domain, pubId],
  );

  const StatusButton: React.FC<{
    style?: React.CSSProperties | undefined;
    value: string;
    startIcon?: React.ReactNode | undefined;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  }> = ({ style, value, startIcon, onClick }) => {
    return (
      <Button
        startIcon={startIcon}
        style={{
          margin: 5,
          borderRadius: 5,
          width: 100,
          color: 'white',
          ...style,
        }}
        onClick={onClick}
      >
        {value}
      </Button>
    );
  };

  const StatusButtonDiv: React.FC<{ flyer: PublishedFlyerWithStatus }> = ({ flyer }) => {
    const [statusPublish, setStatusPublish] = useState<StatusPublish>(flyer.statusPublish);

    useEffect(
      () => {
        if (!auth) return;
        db.collection('users').doc(auth.user.id).collection('domains').doc(domain).collection('pubs').doc(flyer.pubId).update({
          statusPublish,
        });
      },
      [flyer.pubId, statusPublish],
    );

    return (
      <>
        <StatusButton startIcon={<DoneIcon />}
          value="掲載"
          style={statusPublish === 'going'
            ? { backgroundColor: colors.green[500] }
            : { backgroundColor: colors.green[50], border: 'solid 1px green' }
          }
          onClick={e => {
            e.stopPropagation();
            // if (statusPublish !== 'going') return;
            setStatusPublish('going');
          }}
        />
        <StatusButton startIcon={<WarningIcon />}
          value="保留"
          style={statusPublish === 'pending'
            ? { backgroundColor: colors.amber[500] }
            : { backgroundColor: colors.amber[100], border: `solid 1px ${colors.amber[500]}` }
          }
          onClick={e => {
            e.stopPropagation();
            // if (statusPublish !== 'pending') return;
            setStatusPublish('pending');
          }}
        />
        <StatusButton startIcon={<BlockIcon />}
          value="ブロック"
          style={statusPublish === 'blocked'
            ? { backgroundColor: colors.red[500] }
            : { backgroundColor: colors.red[50], border: 'solid 1px red' }
          }
          onClick={e => {
            e.stopPropagation();
            // if (statusPublish !== 'blocked') return;
            setStatusPublish('blocked');
          }}
        />
      </>
    );
  };

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
          <div style={{ margin: 'auto' }}>
            <StatusButtonDiv flyer={flyer} />
          </div>
        </div>
      </Paper>
    </Container>
  );
};
