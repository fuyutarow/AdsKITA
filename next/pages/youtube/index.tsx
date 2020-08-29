import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { NextPage } from 'next';

import { YoutubeChannelRecordContext, YoutubeChannelRecordProvider } from 'contexts/youtubeChannels';
import { YoutubeChannelBasic } from 'models/youtube';
import { icons } from 'plugins/brand';
import { OGP } from 'models/ogp';
import AppFrame from 'views/AppFrame';

const YoutubeChannelRecordView = () => {
  const router = useRouter();
  const { channelId } = router.query;
  const channelRecord = useContext(YoutubeChannelRecordContext).channelRecord;

  return (

    <div>
      <h2>
        Youtube
      </h2>
      {
        Object.values(channelRecord)
          .filter((x): x is YoutubeChannelBasic => Boolean(x))
          .map(channel => {
            return (
              <Button key={channel.id} onClick={e => {
                router.push({
                  pathname: `/youtube/${channel.id}`,
                  query: { from: 'list' },
                });
              }}>
                {channel.title}
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

      <YoutubeChannelRecordProvider>
        <YoutubeChannelRecordView />
      </YoutubeChannelRecordProvider>

    </AppFrame>
  );
};

Page.getInitialProps = async ({ req }) => {
  const ogp: OGP = {
    title: 'webtan | Youtube',
    url: 'https://webtan.now.sh/youtube',
    description: 'webtan | Youtube',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp };
};

export default Page;
