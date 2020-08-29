import * as d3 from 'd3-format';

import React, { useState, useEffect, useContext, useRef } from 'react';
import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { YoutubeChannelProfile, YoutubeChannelAudienceV2 } from 'models/youtube';

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
    // title: {
    //   text: 'チャンネル登録数',
    // },
    labels: {
      formatter: (val: any) => `${
        d3.format('.2r')(val)
      }%`,
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: any) => `${
        d3.format('.2r')(val)
      }%`,
    },
  },
};

const ChartAgeAndGender: React.FC<{
  audience: YoutubeChannelAudienceV2;
  chartRef?: React.RefObject<typeof Chart> | undefined;
}> = ({ audience, chartRef }) => {
  const volume = {
    male: audience.ageAndGenderWithViewPercent
      .filter(x => x.gender === 'male')
      .map(x => x.value)
      .reduce((a, b) => a + b, 0) / 10
    ,
    female:
      audience.ageAndGenderWithViewPercent
        .filter(x => x.gender === 'female')
        .map(x => x.value)
        .reduce((a, b) => a + b, 0) / 10,
  };

  return (
    <div>
      <div>
        男女比 {d3.format('.1r')(volume.male)} : {d3.format('.1r')(volume.female)}
      </div>

      <Chart
        {...{
          options,
          series: [{
            name: '女性',
            data: audience.ageAndGenderWithViewPercent
              .filter(x => x.gender === 'female')
              .sort((a, b) => {
                const nameA = a.age.toUpperCase();
                const nameB = b.age.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                else if (nameA > nameB) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map(x => x.value),
          }, {
            name: '男性',
            data: audience.ageAndGenderWithViewPercent
              .filter(x => x.gender === 'male')
              .sort((a, b) => {
                const nameA = a.age.toUpperCase();
                const nameB = b.age.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                else if (nameA > nameB) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map(x => x.value),
          }],
          type: 'bar',
          height: 200,
          width: '100%',
          ref: chartRef,
        }}
      />
    </div>
  );
};

export default ChartAgeAndGender;
