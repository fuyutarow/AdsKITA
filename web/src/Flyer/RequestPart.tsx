import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { colors } from '@material-ui/core';

import { Flyer } from 'models';
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

    const style = { margin: '10px 0 10px 0' };
    return disabled
      ? <Button disabled={disabled} variant='contained' style={{ ...style }}>依頼</Button>
      : (
        <Button
          variant='contained'
          style={{
            ...style,
            color: 'white',
            backgroundColor: colors.green[500],
          }}
          onClick={e => {
            alert('ok');
          }}
        >
          依頼
        </Button>
      );
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
      <div>掲載依頼するドメイン: {hostname}</div>
      <div>
        <RequestButton />
      </div>
    </div>

  );

};

export default FC;
