import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { routes } from 'router';
import { db } from 'plugins/firebase';
import { PublishedFlyer } from 'models';

export default () => {
  const history = useHistory();
  const { id: pubId } = useParams();
  const [flyer, setFlyer] = useState<PublishedFlyer | null>(null);
  const [clicked, setClicked] = useState(false);

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

  const IMG = () => flyer
    ? (
      <img {...{
        width: 300,
        height: 250,
        src: flyer.imageURL,
      }} />
    )
    : null;

  const onClick = () => {
    if (!flyer) return;
    if (clicked) return;

    setClicked(true);

    // // parent.locationで正しいドメインで広告表示されているか判定
    // if (window.parent.location.hostname !== flyer.targetDoamin) return;

    // db.collection('pubs').doc(pubId).collection('shards').doc('0').update({
    //   clickCount: firebase.firestore.FieldValue.increment(1),
    // });
    const href = flyer?.linkURL || null;
    if (href) {
      history.push({
        pathname: routes.redirect.path,
        state: { toURL: href },
      });
    }
  };

  return (
    <div onClick={onClick}>
      <IMG />
    </div>
  );
};
