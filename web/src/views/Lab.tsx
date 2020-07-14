import React, { useState, useEffect } from 'react';

export default () => {
  const iframeProps = {
    title: 'fmfm',
    width: 900,
    height: 110,
    src: 'https://katori.now.sh/burner.gif',
  };
  return (
    <>
      <div>ads</div>
      <iframe
        id="inlineFrameExample"
        {...iframeProps}
        style={{
          borderWidth: 0,
        }}
      />
    </>
  );
};
