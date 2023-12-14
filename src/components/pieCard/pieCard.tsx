import { Card, CardContent, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

// PieCard Component: Displays a pie chart representing resolved and unresolved posts.
export const PieCard = (props: { sx: any, resolved_percentage: number, unresolved_percentage: number }) => {
    const { sx, resolved_percentage, unresolved_percentage } = props;

    return (
        <Card sx={sx}>
            <CardContent>
                {/* Stack for aligning items in a flex row */}
                <Stack display='flex' direction="row" width="100%" textAlign="left" spacing={2}>
                    <Box flexGrow={1}>
                        {/* Typography for title */}
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            Resolved Posts
                        </Typography>
                        {/* PieChart to show resolved vs unresolved posts */}
                        <PieChart
                            series={[
                                {
                                    type: 'pie',
                                    data: [
                                        { id: 'A', value: resolved_percentage, label: "Resolved Posts" },
                                        { id: 'B', value: unresolved_percentage, label: "Unresolved Posts" }
                                    ],
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
                            // Configuration for the chart legend
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'top', horizontal: 'middle' },
                                    padding: 250,
                                }
                            }}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};
