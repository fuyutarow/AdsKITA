import isURL from 'is-url';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

export const isValidURL = (linkURL: string): boolean => {
  return linkURL === '' || isURL(linkURL);
};

const FC: React.FC<{
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

export default FC;
