import isURL from 'is-url';
import firebase from 'firebase';
import React, { useState, useEffect, useContext, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import { colors } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { db } from 'plugins/firebase';
import { AuthContext } from 'contexts/auth';
import { getHostname } from 'utils';

export const isValidURL = (linkURL: string): boolean => {
  return linkURL === '' || isURL(linkURL);
};

const InputLinkURL: React.FC<{
  linkURL: string;
  setLinkURL: React.Dispatch<React.SetStateAction<string>>;
}> = ({ linkURL, setLinkURL }) => {
  const validation = isValidURL(linkURL);

  return (
    <TextField
      label="リンク先URL"
      placeholder="https://example.com"
      helperText={(!validation) && 'URLが正しくありません'}
      fullWidth
      margin="normal"
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      value={linkURL}
      error={!validation}
      onChange={e => { setLinkURL(e.target.value); }}
    />
  );
};

const InputDomain: React.FC<{
  // linkURL: string;
  // setLinkURL: React.Dispatch<React.SetStateAction<string>>;
  // }> = ({ linkURL, setLinkURL }) => {
}> = () => {
  const [domainURL, setDomainURL] = useState<string>('');
  const valid = isValidURL(domainURL) && domainURL !== '';
  const auth = useContext(AuthContext);

  const pushDomain = () => {
    if (!auth) return;
    const domain = getHostname(domainURL);

    // IDEA: ☆つけたらcollection('spaces')に追加してあげよう
    db.collection('users').doc(auth.user.id).update({
      domains: firebase.firestore.FieldValue.arrayUnion(domain),
    });
  };

  const PushButton = () => {
    const [clicked, setClicked] = useState(false);

    const disabled = (!valid) || clicked;

    const message = '追加';
    const style = { margin: '10px 0 10px 0' };
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setClicked(true);
      pushDomain();
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
    <div style={{ padding: 20 }}>
      <div>自分のサービスのURLを入力</div>
      <InputLinkURL {...{
        linkURL: domainURL,
        setLinkURL: setDomainURL,
      }} />
      <PushButton />
    </div>
  );

};
export default InputDomain;
