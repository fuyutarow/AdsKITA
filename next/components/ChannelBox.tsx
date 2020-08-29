import * as d3 from 'd3-format';
import moment from 'moment';
import React, { useState, useEffect, useContext, useRef } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TwitterIcon from '@material-ui/icons/Twitter';

import ChartAgeAndGender from './ChartAgeAndGender';
import ChartViewPercentWithCountry from './ChartViewPercentWithCountry';

import { version } from 'plugins/env';
import { logo } from 'plugins/brand';
import { humanizeJapanizeInt } from 'plugins/humanize';
import { YoutubeChannelBasic, YoutubeChannelProfileV2, YoutubeChannelAudienceV2 } from 'models/youtube';

const ChannelBox: React.FC<{
  channelBasic: YoutubeChannelBasic;
  profile: YoutubeChannelProfileV2;
  audience?: YoutubeChannelAudienceV2 | undefined;
}> = ({ channelBasic, profile, audience }) => {
  const rateUSD2JPY = 100;
  const estMonthEarningUpperYen = profile.estMonthEarning * rateUSD2JPY * 1.5;
  const estMonthEarningLowerYen = profile.estMonthEarning * rateUSD2JPY / 1.5;

  const daysPerVideo = (
    moment().diff(moment(channelBasic.publishedAt), 'days') / profile.totalVideos
  );

  const chartAgeAndGenderRef = useRef<typeof Chart>(null);
  const chartRef = useRef<typeof Chart>(null);

  const readableInt = (n: number) => {
    return humanizeJapanizeInt(parseInt(d3.format('.3r')(n)));
  };

  const styles: Record<string, React.CSSProperties> = {
    box: {
      border: 'solid 1px gray',
      padding: 5,
    },
    dt: {
      fontSize: 12,
    },
    dd: {
      textAlign: 'right',
      fontSize: 16,
    },
    button: {
      margin: 5,
      padding: '5px 10px 5px 10px',
      height: 36,
      borderRadius: 18,
      fontSize: 14,
    },
  };

  const [show, setShow] = useState(true);

  const BoxBody = () => (
    <>
      <Grid item xs={12} style={{ padding: 0 }}>
        <div style={styles.box}>
          <div>
            <img {...{
              src: channelBasic.thumbnailUrl,
              width: 36,
              style: {
                borderRadius: '50%',
                verticalAlign: 'middle',
                padding: 5,
              },
            }} />
            <span style={{
              fontSize: 14,
              verticalAlign: 'middle',
            }}>
              <a href={`https://youtube.com/channel/${channelBasic.id}`}>{channelBasic.title}</a>
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={4} style={{ padding: 0 }}>
        <div style={styles.box}>
          <div style={styles.dt}>
            チャンネル登録者数
          </div>
          <div style={styles.dd} >
            {readableInt(profile.numSubscribers)} 人
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            推定月間収益
          </div>
          <div style={styles.dd} >
            {readableInt(estMonthEarningLowerYen)} 円
          </div>
          <div style={styles.dd} >
            ~ {readableInt(estMonthEarningUpperYen)} 円
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            動画あたり再生数
          </div>
          <div style={styles.dd} >
            {readableInt(profile.totalViews / profile.totalVideos)} 回/本
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            投稿頻度
          </div>
          <div style={styles.dd} >
            <div>
              {
                `約${d3.format('.1r')(daysPerVideo)}日に1本`
              }
            </div>
            <div style={{
              fontSize: 12,
            }}>
              {
                `(1本 / ${d3.format('.2r')(daysPerVideo)}日)`
              }
            </div>
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            合計再生数
          </div>
          <div style={styles.dd} >
            {readableInt(profile.totalViews)} 回
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            合計動画数
          </div>
          <div style={styles.dd} >
            {readableInt(profile.totalVideos)} 本
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.dt}>
            登録者数ランキング
          </div>
          <div style={styles.dd} >
            {d3.format(',')(profile.areaRank)}
            <span style={{
              padding: '0 0 0 5px',
              fontSize: 12,
            }}>
              (地域)
            </span>
          </div>
          <div style={styles.dd} >
            {d3.format(',')(profile.globalRank)}
            <span style={{
              padding: '0 0 0 5px',
              fontSize: 12,
            }}>
              (世界)
            </span>
          </div>
        </div>
      </Grid>
      {/* <Grid item xs={8} style={{ padding: 0 }}>
        <div style={{
          ...styles.box,
        }}>
          <div style={styles.dt}>
            性別・年齢動向
          </div>
          {audience
            ? <ChartAgeAndGender {...{ audience, chartAgeAndGenderRef }} />
            : <div>十分にデータがありません</div>
          }

        </div>
        <div style={{
          ...styles.box,
        }}>
          <div style={styles.dt}>
            地域別動向
          </div>
          {audience
            ? <ChartViewPercentWithCountry {...{ audience, chartRef }} />
            : <div>十分にデータがありません</div>
          }
        </div>
      </Grid> */}
    </>
  );

  return (
    <div style={{
      width: 400,
      padding: 10,
      backgroundColor: '#F9F9F9',
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ padding: 0 }}>
          <div style={{
            ...styles.box,
            backgroundImage: 'linear-gradient(#F1C5D3, #C9E6FF)',
          }}>
            <div>
              <a href={`https://webtan.now.sh/youtube/${channelBasic.id}`}>
                <img {...{
                  src: logo,
                  width: 100,
                  style: {
                    padding: 5,
                    verticalAlign: 'middle',
                  },
                }} />
              </a>
              <span style={{
                fontSize: 12,
                padding: 10,
              }}>v{version}</span>
              {/* <span style={{ padding: 30 }} /> */}
              {show
                ? <Button style={styles.button} onClick={e => setShow(false)}>非表示</Button>
                : <Button style={styles.button} onClick={e => setShow(true)}>表示</Button>
              }
              <Button {...{
                variang: 'contained',
                style: {
                  ...styles.button,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#52A8E9',
                  color: '#F9F9F9',
                },
              }}>
                <TwitterIcon />シェア
              </Button>
            </div>
          </div>
        </Grid>
        {show && <BoxBody />}
      </Grid>
    </div >
  );
};

export default ChannelBox;
