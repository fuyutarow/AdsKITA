import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

import { debug } from 'plugins/debug';

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
  const { id: adId } = useParams();

  return (
    <>
      <App />
      <div>inner</div>
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
      />
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
