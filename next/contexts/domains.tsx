import React, { createContext, useState, useEffect } from 'react';

import { db } from 'plugins/firebase';
import { debugToast } from 'plugins/debug';
import { DomainRecord, DomainInfo } from 'models';

interface DomainRecordContext {
  domainRecord: DomainRecord;
}

export const DomainRecordContext = createContext<DomainRecordContext>({
  domainRecord: {},
});

export const DomainRecordProvider: React.FC = ({ children }) => {
  const [domainRecord, setDomainRecord] = useState<DomainRecord>({});

  useEffect(
    () => {
      const listener = db.collection('history')
        .orderBy('lastFetched', 'desc')
        .limit(30)
        .onSnapshot(querySnapshot => {
          const record = Object.assign({}, domainRecord);
          querySnapshot.docs.forEach(doc => {
            const domainInfo = doc.data() as DomainInfo || null;
            record[domainInfo.domain] = domainInfo;
            debugToast(`fetch ${domainInfo.domain}`);
          });
          setDomainRecord(record);
        });
      return () => listener();
    },
    []
  );

  return (
    <DomainRecordContext.Provider value={{
      domainRecord,
    }}>
      {children}
    </DomainRecordContext.Provider>
  );

};

