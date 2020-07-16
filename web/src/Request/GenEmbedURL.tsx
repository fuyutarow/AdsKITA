import React, { useState, useEffect, useContext } from 'react';
import { useCopyToClipboard } from 'react-use';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { colors } from '@material-ui/core';

import { toastNotice } from 'plugins/toast';
import { AuthContext } from 'contexts/auth';

const GenEmbedURL: React.FC<{
  spaceId: string;
}> = ({ spaceId }) => {
  const auth = useContext(AuthContext);
  const [key, setKey] = useState<string | null>(null);
  const embedURL = `https://adskita.now.sh/spaces/${spaceId}/pub?key=${key}`;
  const iframeHTML =
    `
<iframe width="300" height="250" style="border-width: 0;" src="${embedURL}"></iframe>
`;

  const ClipButton: React.FC<{ text: string }> = ({ text }) => {
    const [_, copyToClipboard] = useCopyToClipboard();

    return (
      <Button
        style={{ margin: 10 }}
        variant="contained"
        onClick={e => {
          copyToClipboard(text);
          toastNotice('クリップボードにコピーしました', { color: colors.green[500] });
        }}
      >
        コピー
      </Button>
    );
  };

  if (!auth) return null;
  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant='contained'
        onClick={e => {
          const key = auth.user.id;
          setKey(key);
        }}>
        埋め込みURL取得
      </Button>
      {
        key &&
        <>
          <div style={{ display: 'flex', verticalAlign: 'middle' }}>
            <div style={{ transform: 'translateY(20%)' }}>
              <ClipButton text={embedURL} />
            </div>
            <div style={{ width: '80%' }} >
              <TextField
                label="iframe埋め込み用URL"
                margin="normal"
                fullWidth
                variant="outlined"
                value={embedURL}
              />
            </div>
          </div>
          <div style={{ display: 'flex', verticalAlign: 'middle' }}>
            <div style={{ transform: 'translateY(20%)' }}>
              <ClipButton text={iframeHTML} />
            </div>
            <div style={{ width: '80%' }} >
              <TextField
                label="iframe埋め込み用HTML"
                margin="normal"
                variant="outlined"
                value={iframeHTML}
                fullWidth
              />
            </div>
          </div>
        </>
      }
    </div >
  );
};

export default GenEmbedURL;
