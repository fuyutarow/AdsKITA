import React, { createContext, useState, useEffect } from 'react';

import { db } from 'plugins/firebase';
import { debugToast } from 'plugins/debug';
import { YoutubeChannelBasicRecord, YoutubeChannelBasic } from 'models/youtube';

interface YoutubeChannelRecordContext {
  channelRecord: YoutubeChannelBasicRecord;

}

export const YoutubeChannelRecordContext = createContext<YoutubeChannelRecordContext>({
  channelRecord: {},
});

export const YoutubeChannelRecordProvider: React.FC = ({ children }) => {
  const [channelRecord, setChannelRecord] = useState<YoutubeChannelBasicRecord>({});

  useEffect(
    () => {
      const listener = db.collection('stage')
        .doc('youtube')
        .collection('channelBasics')
        .orderBy('updatedAt', 'desc')
        .limit(10)
        .onSnapshot(querySnapshot => {
          const record = Object.assign({}, channelRecord);
          querySnapshot.docs.forEach(doc => {
            const channel = doc.data() as YoutubeChannelBasic;
            record[channel.id] = channel;
            debugToast(`fetch ${channel.id}`);
          });
          setChannelRecord(record);
        });
      return () => listener();
    },
    []
  );

  return (
    <YoutubeChannelRecordContext.Provider value={{
      channelRecord,
    }}>
      {children}
    </YoutubeChannelRecordContext.Provider>
  );

};

