import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext, useRef } from 'react';

import { YoutubeChannelBasic, YoutubeChannelProfileV2, YoutubeChannelAudienceV2 } from 'models/youtube';
import { db } from 'plugins/firebase';
import ChannelProfileBox from './ChannelBox';

export default () => {
  const router = useRouter();
  const channelId = router.query.channelId as string | undefined;

  const [channelBasic, setChannelBasic] = useState<YoutubeChannelBasic | null>(null);
  const [channelProfile, setChannelProfile] = useState<YoutubeChannelProfileV2 | null>(null);
  const [channelAudience, setChannelAudience] = useState<YoutubeChannelAudienceV2 | null>(null);

  useEffect(
    () => {
      if (!channelId) return;
      const listener = db.collection('stage').doc('youtube').collection('channelBasics').doc(channelId)
        .onSnapshot(doc => {
          const channelBasic = doc.data() as YoutubeChannelBasic || null;
          if (channelBasic) {
            setChannelBasic(channelBasic);
          }
        });
      return () => listener();
    },
    [channelId]
  );

  useEffect(
    () => {
      if (!channelId) return;
      const listener = db.collection('stage').doc('youtube').collection('channelProfilesV2').doc(channelId)
        .collection('series')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(querySnapshot => {
          const docs = querySnapshot.docs;
          if (docs.length) {
            const channelProfile = docs[0].data() as YoutubeChannelProfileV2;
            setChannelProfile(channelProfile);
          }
        });
      return () => listener();
    },
    [channelId]
  );

  useEffect(
    () => {
      if (!channelId) return;
      const listener = db.collection('stage').doc('youtube').collection('channelAudiencesV2').doc(channelId)
        .collection('series')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(querySnapshot => {
          const docs = querySnapshot.docs;
          if (docs.length) {
            const channelAudience = docs[0].data() as YoutubeChannelAudienceV2;
            setChannelAudience(channelAudience);
          }
        });
      return () => listener();
    },
    [channelId]
  );

  return channelBasic && channelProfile
    ? <ChannelProfileBox {...{
      channelBasic,
      profile: channelProfile,
      audience: channelAudience ? channelAudience : undefined,
    }} />
    : <div>no</div>;
};
