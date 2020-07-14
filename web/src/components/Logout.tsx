import React from 'react';

import { auth } from 'plugins/firebase';

export default () => {

  return (
    <div>
      <button onClick={() => auth.signOut()}>logout</button>
    </div>
  );
};
