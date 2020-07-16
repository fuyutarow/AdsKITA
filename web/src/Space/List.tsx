import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { db } from 'plugins/firebase';
import { debug, DebugButton } from 'plugins/debug';
import { routes } from 'router';
import { PublishedFlyer, PubRecord } from 'models';
import { AuthContext, AuthContextProps } from 'contexts/auth';
import InputDomain from './InputDomain';
import { head7 } from 'utils';

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

const DomainView: React.FC<{ hostname: string }> = ({ hostname }) => {
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
        height: 200 * 0.625,
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
    <Card style={cardStyle(breakpoint)}>
      <CardActionArea onClick={e => {
        history.push({
          pathname: routes.requestListWithSpace.path
            .replace(':spaceId', encodeURIComponent(hostname)),
        });
      }}>
        <div style={{
          ...cardStyle(breakpoint),
          position: 'relative',

        }}>
          <CardContent style={{ height: '100%' }}>
            <div style={{
              display: 'grid',
              placeItems: 'center',
              // position: 'absolute',
              // top: '50%',
              // left: '50%',
              // transform: 'translateY(-50%) translateX(-50%)',
              transform: 'translateY(20%)',
              // width: '80%',
            }}>
              <div style={{
                fontSize: 18,
              }}>
                <a href={`//${hostname}`} target="_blank">{hostname}</a>
              </div>
              <Button>
                広告依頼をみる
              </Button>
            </div>
          </CardContent>
        </div>
      </CardActionArea >
    </Card >
  );
};

const Main: React.FC<{ auth: AuthContextProps }> = ({ auth }) => {
  const [pubRecord, setPubRecord] = useState<PubRecord>({});
  const [first, setFirst] = useState(true);
  const domains = auth.user.domains;

  const PubTable = () => {
    return (
      <>
        {domains.map(domain => <DomainView hostname={domain} />)}
      </>
    );
  };

  return (
    <div>
      <InputDomain />
      <DebugButton onClick={e => {
        debug(domains);
      }} />
      <PubTable />
    </div>
  );
};
