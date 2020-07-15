import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { db } from 'plugins/firebase';
import { routes } from 'router';
import { PublishedFlyer } from 'models';

const getHostname = (href: string): string | null => {
  try {
    const url = new URL(href);
    return url.hostname;
  } catch (e) {
    return null;
  }
};

export default () => {
  const history = useHistory();
  const { id: pubId } = useParams();
  const [flyer, setFlyer] = useState<PublishedFlyer | null>(null);
  const [clicked, setClicked] = useState(false);
  const [hostname, setHostname] = useState<string | null>(null);

  useEffect(
    () => {
      const listener = db.collection('pubs').doc(pubId)
        .onSnapshot(doc => {
          const pubed = doc.data() as PublishedFlyer || null;
          setFlyer(pubed);
        });
      return () => listener();
    },
    [pubId],
  );

  // 表示回数カウンタ
  useEffect(
    () => {
      if (!flyer) return;

      // CORSを回避して親ウィンドウのロケーションを取得する方法
      const hereHref = (window.location !== window.parent.location)
        ? document.referrer
        : document.location.href;
      const hereHostname = getHostname(hereHref);
      setHostname(hereHostname);

      if (hereHostname && hereHostname !== flyer.targetDoamin) return;

      db.collection('pubs').doc(flyer.id).collection('shards').doc('0').update({
        displayCount: firebase.firestore.FieldValue.increment(1),
      });
    },
    [flyer],
  );

  const onClick = () => {
    if (!flyer) return;
    if (clicked) return;

    setClicked(true);

    if (hostname && hostname === flyer.targetDoamin) {
      // クリック回数カウンタ
      db.collection('pubs').doc(pubId).collection('shards').doc('0').update({
        clickCount: firebase.firestore.FieldValue.increment(1),
      });
    }

    const toHref = flyer?.linkURL || null;
    if (toHref) {
      history.push({
        pathname: routes.redirect.path,
        state: { toURL: toHref },
      });
    }
  };

  const IMG = () => flyer
    ? (
      <img {...{
        width: 300,
        height: 250,
        src: flyer.imageURL,
      }} />
    )
    : null;

  return (
    <div onClick={onClick}>
      <IMG />
    </div>
  );
};
