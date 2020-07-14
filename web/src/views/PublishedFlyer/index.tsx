import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { db } from 'plugins/firebase';
import { Flyer } from 'models';

export default () => {
  const { id: flyerId } = useParams();
  const [flyer, setFlyer] = useState<Flyer | null>(null);

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

  return flyer
    ? (
      <img {...{
        width: 300,
        height: 250,
        src: flyer.imageURL,
      }} />
    )
    : null;
};
