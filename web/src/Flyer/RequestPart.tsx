import { v4 as uuid } from 'uuid';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { colors } from '@material-ui/core';

import { db } from 'plugins/firebase';
import { toastNotice } from 'plugins/toast';
import { Flyer, PublishedFlyer } from 'models';
import InputLinkURL, { isValidURL } from './inputLinkURL';

const FC: React.FC<{ flyer: Flyer }> = ({ flyer }) => {
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

  const RequestButton = () => {
    const [clicked, setClicked] = useState(false);
    const disabled = (!valid) || clicked;

    const message = '依頼';
    const style = { margin: '10px 0 10px 0' };
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClicked(true);
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
      toastNotice('広告掲載を依頼しました', { color: colors.green[500] });
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
