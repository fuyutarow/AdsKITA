import * as d3 from 'd3-format';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { NextPage } from 'next';

import { icons } from 'plugins/brand';
import { obtainChannelAudienceV2, obtainChannelBasic, obtainChannelProfileV2 } from 'functions';
import { YoutubeChannelAudienceV2, YoutubeChannelBasic, YoutubeChannelProfileV2 } from 'models/youtube';
import * as config from 'plugins/config';
import { countryCodebook } from 'plugins/countryCode';
import { DebugButton, debug, debugToast } from 'plugins/debug';
import { db } from 'plugins/firebase';
import { humanizeJapanizeInt } from 'plugins/humanize';
import { OGP } from 'models/ogp';
import AppFrame from 'views/AppFrame';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChannelInfo {
  channelBasic: YoutubeChannelBasic | null
}

const ChannelProfileView: React.FC<{
  profile: YoutubeChannelProfileV2;
  audience?: YoutubeChannelAudienceV2 | undefined;
}> = ({ profile, audience }) => {
  const rateUSD2JPY = 100;
  const estMonthEarningUpperYen = profile.estMonthEarning * rateUSD2JPY * 1.5;
  const estMonthEarningLowerYen = profile.estMonthEarning * rateUSD2JPY / 1.5;
  const chartAgeAndGenderRef = useRef<typeof Chart>(null);
  const chartRef = useRef<typeof Chart>(null);

  const readableInt = (n: number) => {
    return humanizeJapanizeInt(parseInt(d3.format('.3r')(n)));
  };

  debug(audience);

  const styles = {
    box: {
      border: 'solid 1px gray',
      padding: 5,
      // padding: '5px 0 5px 0',
    },
    dt: {
      fontSize: 12,
    },
  };

  return (
    <div>
      <dl>
        <dt>動画一本あたりの平均再生回数</dt>
        <dd>{readableInt(profile.totalViews / profile.totalVideos)} 回</dd>
      </dl>
      <dl>
        <dt>合計動画数</dt>
        <dd>{readableInt(profile.totalVideos)} 本</dd>
      </dl>
      <dl>
        <dt>合計再生回数</dt>
        <dd>{readableInt(profile.totalViews)} 回</dd>
      </dl>
      <dl>
        <dt>推定月間収益</dt>
        <dd>{readableInt(estMonthEarningLowerYen)} 円 - {readableInt(estMonthEarningUpperYen)} 円</dd>
      </dl>
      <dl>
        <dt>チャンネル登録者数</dt>
        <dd>{readableInt(profile.numSubscribers)} 人</dd>
      </dl>
      <dl>
        <dt>世界登録者ランキング</dt>
        <dd>{profile.globalRank}</dd>
      </dl>
      <dl>
        <dt>国別登録者ランキング</dt>
        <dd>{profile.areaRank}</dd>
      </dl>
      {/* {
        audience && (
          <>
            <ChartAgeAndGender {...{ audience, chartAgeAndGenderRef }} />
            <ChartViewPercentWithCountry {...{ audience, chartRef }} />
          </>
        )
      } */}
    </div>
  );
};

const Main: React.FC<{
  channelInfo: ChannelInfo
}> = ({ channelInfo }) => {
  const router = useRouter();
  const channelId = router.query.channelId as string | undefined;

  const [channelBasic, setChannelBasic] = useState<YoutubeChannelBasic | null>(null);
  const [channelProfile, setChannelProfile] = useState<YoutubeChannelProfileV2 | null>(null);
  const [channelAudience, setChannelAudience] = useState<YoutubeChannelAudienceV2 | null>(null);

  // initialize
  useEffect(
    () => {
      if (channelInfo) {
        const { channelBasic } = channelInfo;
        setChannelBasic(channelBasic);
      }
    },
    []
  );

  useEffect(
    () => {
      if (!channelId) return;
      const listener = db.collection('stage').doc('youtube').collection('channelBasics').doc(channelId)
        .onSnapshot(doc => {
          const channelBasic = doc.data() as YoutubeChannelBasic || null;
          if (channelBasic) {
            setChannelBasic(channelBasic);

            const isOutdated = moment().diff(moment(channelBasic.updatedAt), 'days') > config.daysToUpdateChannelBasic;
            if (isOutdated) {
              obtainChannelBasic(channelId);
            }
          } else {
            obtainChannelBasic(channelId);
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

            const isOutdated = moment().diff(moment(channelProfile.updatedAt), 'hours') > config.hoursToUpdateChannelProfile;
            if (isOutdated) {
              obtainChannelBasic(channelId);
            }
          } else {
            obtainChannelProfileV2(channelId);
          }
        });
      return () => listener();
    },
    [channelId]
  );

  useEffect(
    () => {
      if (!channelId) return;
      if (!channelProfile) return;
      const listener = db.collection('stage').doc('youtube').collection('channelAudiencesV2').doc(channelId)
        .collection('series')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(querySnapshot => {
          const docs = querySnapshot.docs;
          if (docs.length) {
            const channelAudience = docs[0].data() as YoutubeChannelAudienceV2;
            setChannelAudience(channelAudience);
          } else if (channelProfile.globalRank < config.enoughGlobalRank) {
            obtainChannelAudienceV2(channelId);
          }
        });
      return () => listener();
    },
    [channelId, channelProfile]
  );

  const channelURL = `https://youtube.com/channel/${channelId}`;

  const BasicView: React.FC<{
    channel: YoutubeChannelBasic;
  }> = ({ channel }) => {

    const country = countryCodebook[channel.countryCode];

    const ProfileView: React.FC<{
      profile: YoutubeChannelProfileV2;
    }> = ({ profile }) => {

      const daysPerVideo = moment().diff(
        moment(channel.publishedAt), 'days'
      )
        / profile.totalVideos;

      return (
        <>
          <dl>
            <dt>投稿頻度</dt>
            <dd>
              <span>
                {
                  `約${d3.format('.1r')(daysPerVideo)}日に1本`
                }
              </span>
              <span style={{
                padding: 5,
                fontSize: 12,
              }}>
                {
                  `(1本 / ${d3.format('.2r')(daysPerVideo)}日)`
                }
              </span>
            </dd>
          </dl>
        </>
      );
    };

    return (
      <div>
        <dl>
          <dt>チャンネル名</dt>
          <dd style={{
            verticalAlign: 'middle',
          }}>
            <img {...{
              src: channel.thumbnailUrl,
              width: 36,
              style: {
                borderRadius: '50%',
                verticalAlign: 'middle',
                padding: 5,
              },
            }} />
            <span style={{
            }}>
              <a href={`https://youtube.com/channel/${channel.id}`}>{channel.title}</a>
            </span>
          </dd>
        </dl>
        <dl>
          <dt>チャンネルID</dt>
          <dd>
            <a href={`https://youtube.com/channel/${channel.id}`}>{channel.id}</a>
          </dd>
        </dl>
        <dl>
          <dt>カスタムURL</dt>
          <dd>
            {
              channel.customUrl
                ? <a href={`https://youtube.com/c/${channel.customUrl}`}>{channel.customUrl}</a>
                : <span>なし</span>
            }
          </dd>
        </dl>
        <dl>
          <dt>概要</dt>
          <dd>
            {channel.description}
          </dd>
        </dl>
        <dl>
          <dt>チャンネル登録日</dt>
          <dd>{moment(channel.publishedAt).format('YYYY-MM-DD')}</dd>
        </dl>
        <dl>
          <dt>地域</dt>
          <dd>{country}</dd>
        </dl>
        {channelProfile && <ProfileView {...{ profile: channelProfile }} />}
        <dl>
          <dt>データ更新日</dt>
          <dd>{moment(channel.updatedAt).format('YYYY-MM-DD')}</dd>
        </dl>
      </div>
    );
  };

  const NotFoundChannel = () => {
    return (
      <div>
        {/* <DebugButton children={'obtain channel basic'} onClick={obtainChannelBasic} /> */}
        <div>not found</div>
      </div>
    );
  };

  const title = `webtan | ${channelBasic?.title}`;
  const currentURL = `https://webtan.now.sh/youtube/${channelId}`;
  return (
    <div>
      {
        channelBasic
          ? <BasicView {...{ channel: channelBasic }} />
          : <NotFoundChannel />
      }
      {
        channelProfile && <ChannelProfileView {...{
          profile: channelProfile,
          audience: channelAudience ? channelAudience : undefined,
        }} />
      }
      {
        channelProfile && channelProfile.globalRank < 2 * 1e6
          ? <div>go</div>
          : <div>チャンネル登録者の性別・年齢別・地域別に関するデータが十分にありません</div>
      }
    </div>
  );
};

const Page: NextPage<{
  ogp: OGP;
  channelInfo: ChannelInfo;
}> = ({ ogp, channelInfo }) => {
  return (
    <AppFrame {...{ ogp }}>

      <Main {...{ channelInfo }} />

    </AppFrame>
  );
};

Page.getInitialProps = async ({ query }) => {
  const channelId = query.channelId as string | undefined;
  let channelBasic: YoutubeChannelBasic | null = null;

  if (channelId) {
    const doc = await db.collection('stage').doc('youtube').collection('channelBasics').doc(channelId).get();
    channelBasic = doc.data() as YoutubeChannelBasic;
  }

  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();

  const ogp: OGP = {
    title: `webtan | ${channelBasic?.title}`,
    url: 'https://webtan.now.sh/youtube',
    description: `webtan | ${channelBasic?.title}`,
    imageUrl: channelBasic?.thumbnailUrl || icons[512],
  };

  return {
    ogp,
    channelInfo: {
      channelBasic,
    },
  };
};

export default Page;
