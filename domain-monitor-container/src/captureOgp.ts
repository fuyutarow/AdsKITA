
const { unfurl } = require('unfurl.js');

// type Metadata = {
interface Metadata {
  title: string
  description: string
  keywords: string[]
  oEmbed?: {
    type: 'photo' | 'video' | 'link' | 'rich'
    version?: string
    title?: string
    author_name?: string
    author_url?: string
    provider_name?: string
    provider_url?: string
    cache_age?: number
    thumbnails?: [{
      url?: string
      width?: number
      height?: number
    }]
  }
  twitter_card: {
    card: string
    site?: string
    creator?: string
    creator_id?: string
    title?: string
    description?: string
    players?: {
      url: string
      stream?: string
      height?: number
      width?: number
    }[]
    apps: {
      iphone: {
        id: string
        name: string
        url: string
      }
      ipad: {
        id: string
        name: string
        url: string
      }
      googleplay: {
        id: string
        name: string
        url: string
      }
    }
    images: {
      url: string
      alt: string
    }[]
  }[]
  open_graph: {
    title: string
    type: string
    images?: {
      url: string
      secure_url?: string
      type: string
      width: number
      height: number
    }[]
    url?: string
    audio?: {
      url: string
      secure_url?: string
      type: string
    }[]
    description?: string
    determiner?: string
    locale: string
    locale_alt: string
    videos: {
      url: string
      stream?: string
      height?: number
      width?: number
      tags?: string[]
    }[]
  }[]
}

export interface OGP {
  url?: string | undefined
  favicon?: string | undefined
  siteName?: string | undefined
  title?: string | undefined
  description?: string | undefined
  imageUrl?: string | undefined
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | undefined
}

export const captureOgp = async (url: string) => {
  const result = await unfurl(url);
  const metadata = result as Metadata;
  // console.log(metadata);

  const ogp: OGP = {
    // @ts-ignore
    url: metadata.open_graph?.url,
    // @ts-ignore
    favicon: metadata?.favicon || null,
    // @ts-ignore
    siteName: metadata.open_graph?.site_name || metadata.twitter_card?.site,
    // @ts-ignore
    title: metadata.open_graph?.title || metadata.twitter_card?.title || metadata.title,
    // @ts-ignore
    description: metadata.open_graph?.description || metadata.twitter_card?.description,
    // @ts-ignore
    imageUrl: metadata.open_graph?.images[0].url || metadata.twitter_card?.images[0].url,
    // @ts-ignore
    twitterCard: metadata.twitter_card?.card,
  };
  return ogp;
};
