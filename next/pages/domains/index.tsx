import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { NextPage } from 'next';

import { DomainRecordContext, DomainRecordProvider } from 'contexts/domains';
import { icons } from 'plugins/brand';
import { OGP } from 'models/ogp';
import { MetaHead } from 'headers';
import { DomainInfo } from 'models';
import AppFrame from 'views/AppFrame';

const DomainRecordView = () => {
  const router = useRouter();
  const domainRecord = useContext(DomainRecordContext).domainRecord;

  return (
    <div>
      {
        Object.values(domainRecord)
          .filter((x): x is DomainInfo => Boolean(x))
          .map(domainInfo => {
            const { domain } = domainInfo;
            const domainKey = decodeURIComponent(domain);
            return (
              <Button key={domain} onClick={e => {
                router.push({
                  pathname: `/domains/${domainKey}`,
                  query: { from: 'list' },
                });
              }}>
                {domain}
              </Button>
            );
          })
      }
    </div>
  );
};

const Page: NextPage<{
  ogp: OGP
}> = ({ ogp }) => {
  return (
    <AppFrame {...{ ogp }}>

      <DomainRecordProvider>
        <DomainRecordView />
      </DomainRecordProvider>
    </AppFrame>
  );
};

Page.getInitialProps = async ({ req }) => {
  const ogp: OGP = {
    title: 'webtan | domains',
    url: 'https://webtan.now.sh/domains',
    description: 'webtan | domains',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp };
};

export default Page;
