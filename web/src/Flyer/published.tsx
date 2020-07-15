import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import firebase from 'firebase';
import { db } from 'plugins/firebase';
import { debug } from 'plugins/debug';
import { isDevelopment } from 'plugins/env';
import { Flyer } from 'models';

export default () => {
  const { id: flyerId } = useParams();
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(
    () => {
      const listener = db.collection('flyers').doc(flyerId)
        .onSnapshot(doc => {
          const flyer = doc.data() as Flyer || null;
          setFlyer(flyer);
        });
      return () => listener();
    },
    [flyerId],
  );

  useEffect(
    () => {
      db.collection('flyers').doc(flyerId).collection('shards').doc('0').update({
        displayCount: firebase.firestore.FieldValue.increment(1),
      });
    },
    [flyerId],
  );

  const onClick = () => {
    if (!flyer) return;

    // parent.locationで正しいドメインで広告表示されているか判定
    debug('window', window.location);
    debug('parent', window.parent.location);
    db.collection('flyers').doc(flyerId).collection('shards').doc('0').update({
      clickCount: firebase.firestore.FieldValue.increment(1),
    });
    const href = clicked ? undefined : flyer.linkURL;
    debug(href);
    setClicked(true);
  };

  if (!flyer) return null;

  const IMG = () => (
    <img {...{
      width: 300,
      height: 250,
      src: flyer.imageURL,
    }} />
  );

  return clicked
    ? <IMG />
    : (
      <div>
        {isDevelopment &&
          <button onClick={onClick}>dbg</button>
        }
        <a href={flyer.linkURL} onClick={onClick}>
          <IMG />
        </a>
      </div >
    );
};
