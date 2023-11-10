import * as React from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

let series_template = [
    {
      type: 'bar',
      stack: '',
      yAxisKey: 'users',
      color: "#98C8F3",
      data: [2, 5, 3, 4, 1],
    },
    {
      type: 'line',
      yAxisKey: 'users',
      color: '#2CA6FF',
      data: [1, 2, 3, 4, 5],
    },
  ] as AllSeriesType[];
  
// TODO: add toggle button component to make graph more interactive
export function EngagementGraph({engagement_data, x_title, x_axis}: {engagement_data: number[], x_title: string, x_axis: number[]}) {
  series_template[0].data = engagement_data;
  
  // Create average value at each point
  let prevAvg = 0;
  series_template[1].data = engagement_data.map((activeUsers, i) => {
    prevAvg = (prevAvg * i + activeUsers) / (i + 1)
    return prevAvg;
  })
  
  return (
    <ChartContainer
      series={series_template}
      width={500}
      height={400}
      xAxis={[
        {
          id: x_title,
          data: x_axis,
          scaleType: 'band',
          valueFormatter: (value) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: 'users',
          scaleType: 'linear',
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsXAxis label={x_title} position="bottom" axisId={x_title} />
      <ChartsYAxis label="Number of Users" position="left" axisId="users" />
    </ChartContainer>
  );
}