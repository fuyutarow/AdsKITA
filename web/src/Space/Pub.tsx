import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { db } from 'plugins/firebase';
import { useQuery } from 'plugins/router';
import { pickFromArray } from 'plugins/dice';
import { debug, DebugButton, debugToast } from 'plugins/debug';
import { routes } from 'router';
import { PubPlan, DomainSpace } from 'models';

export default () => {
  const history = useHistory();

  const { spaceId } = useParams();
  const domain = decodeURIComponent(spaceId);
  const query = useQuery();
  const key = query.get('key');

  const [domainSpace, setDomainSpace] = useState<DomainSpace | null>(null);

  // fetch /users/:id/domains on init
  useEffect(
    () => {
      if (!key) return;
      const listener = db.collection('users').doc(key).collection('domains').doc(domain)
        .onSnapshot(doc => {
          const space = doc.data() as DomainSpace;
          setDomainSpace(space);
          debugToast('fetch [/users/domains]');
        });
      return () => listener();
    },
    [domain, key],
  );

  // redirect pub at random
  useEffect(
    () => {
      debug(domainSpace);
      if (!domainSpace) return;
      const pubPlanList = Object.values(domainSpace.pubPlanRecord).filter((x): x is PubPlan => Boolean(x));
      const pubPlan = pickFromArray(pubPlanList, 'rate');
      if (!pubPlan) return;
      history.push(routes.pubs.path.replace(':id', pubPlan.pubId));
    },
    [domainSpace, history],
  );

  return null;
};
