import { v4 as uuid } from 'uuid';
import { Base64 } from 'js-base64';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';

import { debug } from 'plugins/debug';

const MyDropzone: React.FC<{
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ setImageURL }) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const base64data = reader.result;
        if (!base64data) return;
        if (typeof base64data === 'string') return;

        debug('reader result', base64data);
        const base64string = Base64.fromUint8Array(new Uint8Array(base64data));
        const dataURL = `data:image/png;base64,${base64string}`;
        setImageURL(dataURL);
      };
      reader.readAsArrayBuffer(file);
    });

  }, [setImageURL]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{
    }}>
      <input {...getInputProps()} />
      広告素材をアップロード
      <IconButton>
        <ImageIcon />
      </IconButton>
    </div>
  );
};

export default MyDropzone;
