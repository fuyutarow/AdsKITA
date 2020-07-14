import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

import { debug, sampleBase64 } from 'plugins/debug';
import { Base64 } from 'js-base64';

import { useDropzone } from 'react-dropzone';

const MyDropzone = () => {
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
        debug(dataURL);
        // // Do whatever you want with the file contents
        // const binaryStr = reader.result;
        // debug(binaryStr);
        // debug(sampleBase64);
      };
      reader.readAsArrayBuffer(file);
      debug('reader', reader);
    });

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{
      border: 'solid 2px red',
      width: 300,
      height: 300 * 1.6,
    }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
};

const App = () => {
  const [pictures, setPictures] = useState<Array<any>>([]);

  // // const onDrop = ((files: File[], pictures: string[]) => {
  // const onDrop = (files: File[], pictures: string[]) => {
  const onDrop = (picture: any) => {
    setPictures([...pictures, picture]);
  };

  return (
    <>
      <button onClick={e => {
        debug(pictures);
      }}>dbg</button>
      <ImageUploader
        withIcon={true}
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
    </>
  );
};

export default () => {

  return (
    <>
      <div>dropzone</div>
      <MyDropzone />
      {/* <App /> */}
      <img {...{
        src: sampleBase64,
        width: 300,
        height: 300,
      }} />
      {/* <div>inner</div>
      <iframe
        {...{
          title: 'fmfm',
          width: 300,
          height: 300 * 1.6,
          src: '/ads/114514',
        }}
        style={{
          borderWidth: 0,
        }}
      /> */}
      <div>gif</div>
      <iframe
        {...{
          title: 'fmfm',
          width: 900,
          height: 110,
          src: 'https://katori.now.sh/burner.gif',
        }}
        style={{
          borderWidth: 0,
        }}
      />
      <div>html</div>
      <iframe
        {...{
          title: 'fmfm',
          width: 900,
          height: 110,
          src: './sample.html',
        }}
        style={{
          borderWidth: 0,
        }}
      />
      <div>katori</div>
      <iframe
        {...{
          title: 'fmfm',
          width: 300,
          height: 300 * 1.6,
          src: 'https://katori.now.sh',
        }}
        style={{
          borderWidth: 0,
        }}
      />
      <div>notch</div>
      <iframe
        id="inlineFrameExample"
        {...{
          title: 'fmfm',
          width: 300,
          height: 300 * 1.6,
          src: 'https://notchapp.now.sh/r/alpha3/t/cbc533b9-eb0d-4387-9189-7121d7c428c1',
        }}
        style={{
          borderWidth: 0,
        }}
      />
    </>
  );
};
