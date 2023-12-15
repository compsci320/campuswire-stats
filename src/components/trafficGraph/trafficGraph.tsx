// Importing React and necessary Material-UI components
import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

// Defining the interface for the component's props
interface TrafficGraphProps {
  y: number[];         // Array of numeric values for the Y-axis
  x: string[];         // Array of string values for the X-axis
  sx: React.CSSProperties; // Style object to customize the component
}

// Define the TrafficGraph component as a functional component
export const TrafficGraph: React.FC<TrafficGraphProps> = ({ x, y, sx}) => {
  return (
    // Render a Card component with custom styles (sx)
    <Card sx={sx}>
      <CardContent>
        <Stack display='flex' direction="row" width="100%" height="100%" textAlign="left" spacing={1}>
          <Box flexGrow={1}>
            {/* Title for the graph */}
            <Typography color="text.secondary" variant="overline" sx={{ mb: 0.5 }}>
              Posts Made
            </Typography>
            {/* Bar chart component from MUI X-Charts */}
            <BarChart
              // Series data for the bar chart
              series={[{ data: y, color:'#26c6da' }]}
              // Configuration for the X-axis
              xAxis={[{ 
                scaleType: 'band', 
                data: x,
                tickLabelStyle: {
                  angle: 45,
                  textAnchor: 'start',
                  fontSize: 9,
                }, 
              }]}
              // Configuration for the Y-axis
              yAxis={[{
                label: "Posts",
              }]}
              // Margin settings for the chart
              margin={{
                top: 10,
                left: 40,
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
