import React from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const series = [
  {
    type: 'bar',
    stack: '',
    yAxisKey: 'eco',
    data: [2, 5, 3, 4, 1],
  },
  {
    type: 'bar',
    stack: '',
    yAxisKey: 'eco',
    data: [5, 6, 2, 8, 9],
  },
  {
    type: 'line',
    yAxisKey: 'pib',
    color: 'red',
    data: [1000, 1500, 3000, 5000, 10000],
  },
] as AllSeriesType[];

interface TrafficGraphProps {
  trafficData: number[];
  xTitle: string;
  xAxis: string[];
  sx: React.CSSProperties;
}

export const TrafficGraph: React.FC<TrafficGraphProps> = ({ trafficData, xTitle, xAxis, sx}) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack display='flex' direction="row" width="100%" textAlign="left" spacing={2}>
          <Box flexGrow={1}>
            <Typography color="text.secondary" variant="overline">
              Posts Made
            </Typography>
            <ChartContainer
              series={series}
              width={500}
              height={400}
              xAxis={[
                {
                  id: 'years',
                  data: xAxis,
                  scaleType: 'band',
                  valueFormatter: (value) => value.toString(),
                },
              ]}
              yAxis={[
                {
                  id: 'eco',
                  scaleType: 'linear',
                },
                {
                  id: 'pib',
                  scaleType: 'log',
                },
              ]}
            >
              <BarPlot />
              <LinePlot />
              <ChartsXAxis label="Years" position="bottom" axisId="years" />
              <ChartsYAxis label="Results" position="left" axisId="eco" />
              <ChartsYAxis label="PIB" position="right" axisId="pib" />
            </ChartContainer>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TrafficGraph;
