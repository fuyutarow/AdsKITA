import isURL from 'is-url';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

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

  return (
    <div style={{ padding: 20 }}>
      <div>自分のサービスのURLを入力</div>
      <InputLinkURL {...{
        linkURL: domainURL,
        setLinkURL: setDomainURL,
      }} />
    </div>
  );

};
export default InputDomain;
