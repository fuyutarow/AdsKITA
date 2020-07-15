import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { routes } from 'router';
import { db } from 'plugins/firebase';
import { PublishedFlyer } from 'models';

export default () => {
  const history = useHistory();
  const [flyer, setFlyer] = useState<PublishedFlyer | null>(null);
  useEffect(
    () => {
      const pubId = '1d48c11c-f786-4bb0-a50f-32b0df68e4f0';
      const listener = db.collection('pubs').doc(pubId)
        .onSnapshot(doc => {
          const pubed = doc.data() as PublishedFlyer || null;
          setFlyer(pubed);
        });
      return () => listener();
    },
    [],
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

  return (
    <>
      <button onClick={() => {
        history.push({
          pathname: routes.redirect.path,
          state: {
            toURL: 'https://note.com/matching_ryman/n/n1c851332f935',
          },
        });
      }}>redirect</button>
      <button onClick={() => {
        history.push('/lab/link');
      }}>to link</button>
      <div onClick={e => {
        const href = flyer?.linkURL || null;
        if (href) {
          history.push({
            pathname: routes.redirect.path,
            state: {
              toURL: href,
            },
          });
        }
      }}>
        <IMG />
      </div>
    </>
  );
};
