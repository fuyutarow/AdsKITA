import React, { useState, useEffect, useContext, useRef } from 'react';
import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { YoutubeChannelProfile, YoutubeChannelAudienceV2 } from 'models/youtube';
import { debug } from 'plugins/debug';
import { countryCodebook } from 'plugins/countryCode';

const options = {
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  colors: ['#FF68B3', '#01BEFC'],
  xaxis: {
    categories: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  },
  yaxis: {
    title: {
      text: 'チャンネル登録数',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: any) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};

const ChartViewPercentWithCountry: React.FC<{
  audience: YoutubeChannelAudienceV2;
  chartRef?: React.RefObject<typeof Chart> | undefined;
}> = ({ audience, chartRef }) => {

  const viewPercentWithCountry = audience.viewPercentWithCountry.sort(
    (a, b) => {
      return b.value - a.value;
    }
  );

  return (
    <Chart
      {...{
        options: {
          labels: viewPercentWithCountry.map(x => countryCodebook[x.countryCode]),
        },
        series: viewPercentWithCountry.map(x => x.value),
        type: 'donut',
        width: '100%',
        ref: chartRef,
      }}
    />
  );
};

export default ChartViewPercentWithCountry;
