import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { colors } from '@material-ui/core';

import { Flyer } from 'models';
import InputLinkURL, { isValidURL } from './inputLinkURL';

const FC: React.FC<{ flyer: Flyer }> = ({ flyer }) => {
  const [domain, setDomain] = useState<string>('');
  const valid = isValidURL(domain) && domain !== '';

  const RequestButton = () => {
    const [clicked, setClicked] = useState(false);
    const disabled = (!valid) || clicked;

    return disabled
      ? <Button disabled={disabled} variant='contained'>依頼</Button>
      : (
        <Button
          variant='contained'
          style={{
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
          linkURL: domain,
          setLinkURL: setDomain,
        }} />
      </div>
      <div>
        <RequestButton />
      </div>
    </div>

  );

};

export default FC;
