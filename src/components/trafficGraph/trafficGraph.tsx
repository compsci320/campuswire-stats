import React from 'react';
import { AllSeriesType } from '@mui/x-charts/models';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import Box from '@mui/material/Box';



interface TrafficGraphProps {
  y: number[];
  x: string[];
  sx: React.CSSProperties;
}

export const TrafficGraph: React.FC<TrafficGraphProps> = ({ x, y, sx}) => {
    const series = [
        {
            type: 'bar',
            yAxisKey: 'eco',
            data: y,
        },
        ] as AllSeriesType[];
  return (
    
    <Card sx={sx}>
      <CardContent>
        <Stack display='flex' direction="row" width="100%" height = "100%" textAlign="left" spacing={1}>
          <Box flexGrow={1}>
            <Typography color="text.secondary" variant="overline" sx={{ mb: 0.5 }}>
              Posts Made
            </Typography>
              <BarChart
                series={[{ data: y, color:'#26c6da' }]}
                xAxis={[{ scaleType: 'band', data: x, 
                tickLabelStyle: {
                    angle: 45,
                    textAnchor: 'start',
                    fontSize: 9,
                  }, 
            }]}
                yAxis={[{
                    label: "Posts",
                }]}
                  margin={{
                    top:10,
                    left:40,
                  }}
                height={360}
                width={700}                
                />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TrafficGraph;
