import { v4 as uuid } from 'uuid';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { colors } from '@material-ui/core';

import { db } from 'plugins/firebase';
import { toastNotice } from 'plugins/toast';
import { routes } from 'router';
import { Flyer, PublishedFlyer } from 'models';
import { AuthContext } from 'contexts/auth';
import InputLinkURL, { isValidURL } from './inputLinkURL';

const FC: React.FC<{ flyer: Flyer }> = ({ flyer }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [hostname, setHostname] = useState('');
  const [domainURL, setDomainURL] = useState<string>('');
  const valid = isValidURL(domainURL) && domainURL !== '';

  useEffect(
    () => {
      try {
        const url = new URL(domainURL);
        setHostname(url.hostname);
      } catch (e) {
        // try {
        //   const url = new URL(`https://${domainURL}`);
        //   setHostname(url.hostname);
        // } catch (e) {
        //   setHostname(null);
        // }
      }
    },
    [domainURL],
  );

  const publishFlyer = () => {
    if (!auth) return;
    const pub: PublishedFlyer = {
      ...flyer,
      pubId: uuid(),
      numShards: 1,
      targetDoamin: hostname,
    };
    db.collection('pubs').doc(pub.pubId).set(pub);
    db.collection('pubs').doc(pub.pubId).collection('shards').doc('0').set({
      displayCount: 0,
      clickCount: 0,
    });
    // NOTE
    // 広告主が広告の情報を取得するのに1広告あたり2回クエリ発行する
    // クリック数等のカウント情報は刻一刻と変わるのでデータをコピーして/users/:id/pubs/:idで保持するのは難しい
    // 広告主が広告情報を確認する回数と広告が表示される回数では後者のほうが大きいと考えられる
    // /users/:id/pubs/:id は /pubs/:id の参照とする
    db.collection('users').doc(auth.user.id).collection('pubs').doc(pub.pubId).set({
      ref: db.collection('pubs').doc(pub.pubId),
    });
    toastNotice('広告掲載を依頼しました', { color: colors.green[500] });
    history.push(routes.requestDetail.path.replace(':id', pub.pubId));
  };

  const RequestButton = () => {
    const [clicked, setClicked] = useState(false);

    const disabled = (!valid) || clicked;

    const message = '依頼';
    const style = { margin: '10px 0 10px 0' };
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClicked(true);
      publishFlyer();
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
    <div>
      <div> このドメインに広告を掲載依頼する </div>
      <div>
        <InputLinkURL {...{
          linkURL: domainURL,
          setLinkURL: setDomainURL,
        }} />
      </div>
      <div>掲載依頼するドメイン: <a href={`//${hostname}`} target="_blank">{hostname}</a></div>
      <div>
        <RequestButton />
      </div>
    </div>

  );

};

export default FC;
