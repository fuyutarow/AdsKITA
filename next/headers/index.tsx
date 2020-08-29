import Head from 'next/head';

import { OGP } from 'models/ogp';

export const MetaHead: React.FC<{
  ogp: OGP
}> = ({ ogp }) => {
  return (
    <Head>
      <title>{ogp.title || 'webtan'}</title>
      {/* <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" /> */}
      <link rel="icon" href="/favicon.ico" />
      <link {... {
        rel: 'canonical',
        href: ogp.url,
      }} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="webtan" />
      <meta property="og:locale" content="ja_JP" />
      <meta {...{
        property: 'og:url',
        content: ogp.url,
      }} />
      <meta {...{
        property: 'og:title',
        content: ogp.title,
      }} />
      <meta {...{
        property: 'og:description',
        content: ogp.description,
      }} />
      <meta {...{
        property: 'og:image',
        content: ogp.imageUrl,
      }} />
      <meta {...{
        property: 'twitter:image',
        content: ogp.imageUrl,
      }} />
      {ogp.twitterCard &&
        <meta {...{
          property: 'twitter:card',
          content: ogp.twitterCard,
        }} />
      }
    </Head>
  );
};
