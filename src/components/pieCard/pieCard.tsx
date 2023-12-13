import { Card, CardContent, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

  
export const PieCard = (props: { sx: any, resolved_percentage: number, unresolved_percentage: number}) => {
    const { sx, resolved_percentage, unresolved_percentage } = props;
    return (
        <Card sx={sx}>
            <CardContent>
                <Stack display='flex' direction="row" width="100%" textAlign="left" spacing={2}>
                    <Box flexGrow={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            Resolved Posts
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    type: 'pie',
                                    data: [{ id: 'A', value: resolved_percentage, label: "Resolved"}, { id: 'B', value: unresolved_percentage, label: "Unresolved"}],
                                    innerRadius: 25,
                                    outerRadius: 100,
                                    paddingAngle: 2,
                                    cornerRadius: 0,
                                    startAngle: 0,
                                    endAngle: 360,
                                    cx: 150,
                                    cy: 100,
                                }
                            ]}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};
