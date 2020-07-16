import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
import { debug, DebugButton, debugToast } from 'plugins/debug';
import { routes } from 'router';
import {
  Timestamp,
  PublishedFlyer, PubRecord,
  PublishedFlyerWithStatus, PubRecordWithStatus, StatusPublish,
  DomainSpace,
} from 'models';
import { AuthContext, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import { head7 } from 'utils';

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

const AdTile: React.FC<{ flyer: PublishedFlyerWithStatus }> = ({ flyer }) => {
  const { spaceId } = useParams();
  const history = useHistory();
  const breakpoint = 'L';
  const [statusPublish, setStatusPublish] = useState<StatusPublish>(flyer.statusPublish);
  const auth = useContext(AuthContext);
  const domain = decodeURIComponent(spaceId);

  useEffect(
    () => {
      if (!auth) return;
      db.collection('users').doc(auth.user.id).collection('domains').doc(domain).collection('pubs').doc(flyer.pubId).update({
        statusPublish,
      });
    },
    [auth, domain, flyer.pubId, statusPublish],
  );

  const cardPadding = (breakpoint: string) => {
    return breakpoint === 'L'
      ? { padding: 10 }
      : breakpoint === 'M'
        ? { padding: 5 }
        : { margin: 'auto', padding: 5 };
  };

  const cardStyle = (breakpoint: string) => {
    const width = 200;
    return ['L', 'M'].includes(breakpoint)
      ? {
        width,
        height: width * 1.6,
        borderRadius: '20px',
      }
      : {
        width: 'calc( 90vw / 2 )',
        height: 'calc( 90vw / 2 * 1.6)',
        borderRadius: 'calc( 90vw / 2 * 0.1)',
        maxWidth: 200,
        maxHeight: 200 * 1.6,
      };
  };

  const StatusButton: React.FC<{
    style?: React.CSSProperties | undefined;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  }> = ({ children, style, onClick }) => {

    return (
      <IconButton
        style={{
          margin: 5,
          borderRadius: 5,
          width: 40,
          height: 40,
          color: 'white',
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </IconButton>
    );
  };

  const StatusButtonDiv = () => {

    return (
      <>
        <StatusButton children={<DoneIcon />}
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
        <StatusButton children={<WarningIcon />}
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
        <StatusButton children={<BlockIcon />}
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

  return (
    <div style={cardPadding(breakpoint)}>
      <Card style={cardStyle(breakpoint)}>
        <CardActionArea onClick={e => {
          history.push({
            pathname: routes.requestDetailWithSpace.path
              .replace(':spaceId', spaceId)
              .replace(':pubId', flyer.pubId),
          });
        }}>
          <div style={cardStyle(breakpoint)}>
            <CardMedia
              component="img"
              height="140"
              image={flyer.imageURL}
            />
            <CardContent style={{ height: '100%' }}>
              {/* <div>id: {head7(flyer.id)}</div> */}
              {flyer.linkURL
                ? <div><a href={flyer.linkURL} target="_blank">{flyer.linkURL}</a></div>
                : <div>リンクURL: なし </div>
              }
              {/* <div>対象ドメイン: <a href={`//${flyer.targetDoamin}`} target="_blank">{flyer.targetDoamin}</a></div> */}
              <div>残り掲載日数: {flyer.days} 日</div>
              <div>予算: {flyer.budget} 円</div>
              <div>日当予算: {flyer.budgetPerDay.toFixed(1)} 円</div>
              <div style={{ margin: 'auto' }}>
                <StatusButtonDiv />
              </div>
              <div>
                {
                  statusPublish === 'going' ? '広告掲載中' :
                    statusPublish === 'pending' ? '広告掲載を保留' :
                      statusPublish === 'blocked' ? '広告掲載をブロック' : null
                }
              </div>
            </CardContent>
          </div>
        </CardActionArea >
      </Card>
    </div>
  );
};

const Main: React.FC<{ auth: AuthContextProps }> = ({ auth }) => {
  const { spaceId } = useParams();
  const [pubRecord, setPubRecord] = useState<PubRecordWithStatus>({});
  const [patchPubRecord, setPatchPubRecord] = useState<PubRecord>({});
  const [first, setFirst] = useState(true);
  const domain = decodeURIComponent(spaceId);
  const [domainSpace, setDomainSpace] = useState<DomainSpace | null>(null);
  const [pulledAt, setPulledAt] = useState<Timestamp | null>(null);

  // fetch /users/:id/domains on init
  useEffect(
    () => {
      if (!auth) return;
      const listener = db.collection('users').doc(auth.user.id).collection('domains').doc(domain)
        .onSnapshot(doc => {
          const space = doc.data() as DomainSpace;
          setDomainSpace(space);
          setPulledAt(space.pulledAt);
          debugToast('fetch [/users/domains]');
        });
      return () => listener();
    },
    [auth, domain],
  );

  // push /users/:id/domains on updating pulledAt
  useEffect(
    () => {
      if (!auth) return;
      if (!pulledAt) return;
      db.collection('users').doc(auth.user.id).collection('domains').doc(domain).update({
        pulledAt,
      });
      debugToast('push /users/domains', { color: 'blue' });
    },
    [auth, domain, pulledAt],
  );

  useEffect(
    () => {
      if (!pulledAt) return;
      const listener = db.collection('domains').doc(domain).collection('pubs')
        .where('createdAt', '>', pulledAt.toDate())
        .onSnapshot(querySnapshot => {
          const pubList: Array<PublishedFlyer> = querySnapshot.docs.map(doc => {
            return doc.data() as PublishedFlyer;
          });

          if (pubList.length === 0) return;
          const pulledAt = Timestamp.now();

          const record: PubRecord = {};

          pubList.forEach(pub => {
            record[pub.pubId] = pub;
            debugToast(`fetch [/domains/pubs/:${head7(pub.pubId)}]`);
          });
          setPatchPubRecord(record);
          setPulledAt(pulledAt);

          // 再描画を誘う
          setFirst(false);
        });
      return () => listener();
    },
    [domain, domainSpace, pulledAt],
  );

  // /domains/:id/pubs のレプリカを /users/:id/domains/:id/pubs に移す
  // その差分のpubだけを /users/:id/domains/:id/pubs にプッシュ
  useEffect(
    () => {
      if (!domainSpace) return;
      Object.values(patchPubRecord)
        .filter((x): x is PublishedFlyer => Boolean(x))
        .forEach(pub => {
          const pubWithStatus: PublishedFlyerWithStatus = {
            ...pub,
            statusPublish: domainSpace.defaultStatusPublish,
          };
          db.collection('users').doc(auth.user.id).collection('domains').doc(domain).collection('pubs').doc(pub.pubId).set(
            pubWithStatus,
            { merge: true },
          );
        });
    },
    [auth.user.id, domain, domainSpace, patchPubRecord],
  );

  useEffect(
    () => {
      if (!auth) return;

      const listener = db.collection('users').doc(auth.user.id).collection('domains').doc(domain).collection('pubs')
        .onSnapshot(querySnapshot => {
          const pubList: Array<PublishedFlyerWithStatus> = querySnapshot.docs.map(doc => {
            return doc.data() as PublishedFlyerWithStatus;
          });
          pubList.forEach(pub => {
            pubRecord[pub.pubId] = pub;
            debugToast(`fetch [/users/domains/pubs/:${head7(pub.pubId)}]`);
          });
          setPubRecord(pubRecord);

          // 再描画を誘う
          setFirst(false);
        });
      return () => listener();
    },
    [auth, auth.user.id, domain, pubRecord],
  );

  const PubTable = () => {
    return (
      <>
        {Object.values(pubRecord)
          .filter((x): x is PublishedFlyerWithStatus => Boolean(x))
          .map(pub => <AdTile flyer={pub} />)
        }
      </>
    );
  };

  return (
    <div>
      <DebugButton onClick={e => {
      }} />
      <div>{Object.keys(pubRecord).length}</div>
      <PubTable />
    </div>
  );
};
