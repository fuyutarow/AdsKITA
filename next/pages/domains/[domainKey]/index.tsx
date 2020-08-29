import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@material-ui/core/Button';
import { NextPage } from 'next';
import * as d3 from 'd3-format';

import { db } from 'plugins/firebase';
import { DomainRecordContext, DomainRecordProvider } from 'contexts/domains';
import { icons } from 'plugins/brand';
import { OGP } from 'models/ogp';
import { MetaHead } from 'headers';
import { DomainInfo, DomainPVInfo, Pvlist } from 'models';
import { debug, DebugButton } from 'plugins/debug';
import { sleep } from 'utils';
import AppFrame from 'views/AppFrame';

type Series = Array<{
  data: number[][];
}>;

const chartId = 'pvGraph';

// const ApexCharts = dynamic(() => import('apexcharts'), { ssr: false });
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const state = {
  options: {
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      // min: new Date('01 Mar 2012').getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  },
  // selection: 'one_year',
};

const DomainInfoView: React.FC<{
  domainInfo: DomainInfo
}> = ({ domainInfo }) => {
  const chartRef = useRef<typeof Chart>(null);

  const { domain } = domainInfo;
  const [pvlist, setPvlist] = useState<Pvlist>([]);
  const [series, setSeries] = useState<Series>([{ data: [] }]);
  const [chartImageURI, setChartImageURI] = useState('');

  const ys = series[0].data.map(([x, y]) => y);
  const yaxis = {
    min: 0,
    max: Math.max(...ys) * 1.2,
    labels: {
      formatter: (val: number, index: number) => d3.format('.2s')(val),
    },
  };

  // const updateDataURI = async () => {
  //   const chart = chartRef.current as any;
  //   debug('oncick');
  //   debug('chart', chart);
  //   await sleep(0.5 * 1e3);
  //   // @ts-ignore
  //   const { imgURI } = await ApexCharts.exec(chartId, 'dataURI');
  //   setChartImageURI(imgURI);
  // };

  useEffect(
    () => {
      const listener = db.collection('history').doc(domain).collection('fetchData')
        .orderBy('atFetched', 'asc')
        .onSnapshot(querySnapshot => {
          const pvinfoList = querySnapshot.docs.map(doc => {
            // debugToast('fetch');
            return doc.data() as DomainPVInfo;
          });
          setPvlist(pvinfoList);
          const series = [{
            data: pvinfoList
              .filter(pv => Boolean(pv.pageViews))
              .map(pv => {
                return [pv.atFetched.toMillis(), pv.totalVisits];
              }),
          }];
          setSeries(series);
        });
      return () => listener();
    },
    []
  );

  return (
    <div>
      <div>
        <a href={`//${domain}`}>{domain}</a>
      </div>
      <iframe {...{
        src: `//${domain}`,
      }} />
      <Chart
        {...{
          options: {
            ...state.options,
            yaxis,
            chart: {
              id: chartId,
              type: 'area',
              height: 350,
              zoom: {
                autoScaleYaxis: true,
              },
              // events: {
              //   updated: () => { updateDataURI(); },
              // },
            },
          },
          series: series,
          type: 'area',
          width: 500,
          ref: chartRef,
        }}
      />
      {/* <DebugButton children='updateDataURI' onClick={updateDataURI} /> */}
      <img {...{
        src: chartImageURI,
      }} />
    </div>
  );

};

const Page: NextPage<{
  ogp: OGP,
  domainInfo: DomainInfo | null
}> = ({ ogp, domainInfo }) => {
  const router = useRouter();
  const domainKey = router.query.domainKey as string | undefined;
  const domain = domainKey && encodeURIComponent(domainKey) || null;

  return (
    <AppFrame {...{ ogp }}>

      {domainInfo
        ? <DomainInfoView {...{ domainInfo }} />
        : <div>not found: {domain}</div>
      }
    </AppFrame>
  );
};

Page.getInitialProps = async ({ req, query }) => {
  const domainKey = query.domainKey as string | undefined;
  let domainInfo: DomainInfo | null = null;
  const domain = domainKey && encodeURIComponent(domainKey) || null;

  if (domain) {
    const doc = await db.collection('history').doc(domain).get();
    domainInfo = doc.data() as DomainInfo;
  }

  const ogp: OGP = {
    title: 'webtan | domains',
    url: `https://webtan.now.sh/domains/${domainKey}`,
    description: 'webtan | domains',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp, domainInfo };
};

export default Page;
