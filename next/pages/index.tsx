import { NextPage } from 'next';

// import Link, { Url } from 'next/link';
import { OGP } from 'models/ogp';
import { logo, icons, brandColors } from 'plugins/brand';
import AppFrame from 'views/AppFrame';

const Page: NextPage<{
  ogp: OGP
}> = ({ ogp }) => {

  return (
    <AppFrame {...{ ogp }}>
      welcome, AdsKITA
    </AppFrame>
  );
};

Page.getInitialProps = async ({ req }) => {
  const ogp: OGP = {
    title: 'AdsKITA',
    url: 'https://adskita.now.sh',
    description: 'AdsKITA',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp };
};

export default Page;
