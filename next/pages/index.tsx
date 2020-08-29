import { NextPage } from 'next';

// import Link, { Url } from 'next/link';
import { OGP } from 'models/ogp';
import { logo, logo2, icons, brandColors } from 'plugins/brand';
import AppFrame from 'views/AppFrame';

const Page: NextPage<{
  ogp: OGP
}> = ({ ogp }) => {

  return (
    <AppFrame {...{ ogp }}>
      welcome, webtan
    </AppFrame>
  );
};

Page.getInitialProps = async ({ req }) => {
  const ogp: OGP = {
    title: 'webtan',
    url: 'https://webtan.now.sh',
    description: 'webtan',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp };
};

export default Page;
