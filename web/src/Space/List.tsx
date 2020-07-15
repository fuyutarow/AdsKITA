import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { db } from 'plugins/firebase';
import { debug, DebugButton } from 'plugins/debug';
import { routes } from 'router';
import { PublishedFlyer, PubRecord } from 'models';
import { AuthContext, AuthContextProps } from 'contexts/auth';
import AppHeader from 'components/AppHeader';
import InputDomain from './InputDomain';
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

const AdTile: React.FC<{ flyer: PublishedFlyer }> = ({ flyer }) => {
  const history = useHistory();
  const breakpoint = 'L';

  const cardPadding = (breakpoint: string) => {
    return breakpoint === 'L'
      ? { padding: 10 }
      : breakpoint === 'M'
        ? { padding: 5 }
        : { margin: 'auto', padding: 5 };
  };

  const cardStyle = (breakpoint: string) => {
    return ['L', 'M'].includes(breakpoint)
      ? {
        width: 200,
        height: 200 * 1.6,
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

  return (
    <div style={cardPadding(breakpoint)}>
      <Card style={cardStyle(breakpoint)}>
        <CardActionArea onClick={e => {
          history.push({
            pathname: routes.requestDetail.path
              .replace(':id', flyer.pubId),
          });
        }}>
          <div style={cardStyle(breakpoint)}>
            <CardMedia
              component="img"
              height="140"
              image={flyer.imageURL}
            />
            <CardContent style={{ height: '100%' }}>
              <div>id: {head7(flyer.id)}</div>
              {flyer.linkURL
                ? <div>リンクURL: <a href={flyer.linkURL} target="_blank">{flyer.linkURL}</a></div>
                : <div>リンクURL: なし </div>
              }
              <div>対象ドメイン: <a href={`//${flyer.targetDoamin}`} target="_blank">{flyer.targetDoamin}</a></div>
            </CardContent>
          </div>
        </CardActionArea >
      </Card>
    </div>
  );
};

const Main: React.FC<{ auth: AuthContextProps }> = ({ auth }) => {
  const [pubRecord, setPubRecord] = useState<PubRecord>({});
  const [first, setFirst] = useState(true);

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

          // 再描画を誘う
          setFirst(false);
        });
      return () => listener();
    },
    [auth.user.id, pubRecord],
  );

  const PubTable = () => {
    return (
      <>
        {Object.values(pubRecord)
          .filter((x): x is PublishedFlyer => Boolean(x))
          .map(pub => <AdTile flyer={pub} />)
        }
      </>
    );
  };

  return (
    <div>
      <InputDomain />
      <DebugButton onClick={e => {
        debug(pubRecord);
        const ll = Object.values(pubRecord)
          .filter((x): x is PublishedFlyer => Boolean(x));
        debug(ll);
      }} />
      <div>{Object.keys(pubRecord).length}</div>
      <PubTable />
    </div>
  );
};
