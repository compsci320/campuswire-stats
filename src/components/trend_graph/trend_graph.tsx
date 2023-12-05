import React, { useState, useEffect } from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts';
import TrendGraphOption from '../trend-graph-option/trend-graph-option';


// Define color constants
const BAR_COLOR = "#98C8F3";
const LINE_COLOR = "red";

// Function to create series data dynamically
const createSeriesData = (data: number[]) => {
    let prevAvg = 0;

    const barData = data;
    const lineData = data.map((activeUsers, i) => {
        prevAvg = (prevAvg * i + activeUsers) / (i + 1);
        return prevAvg;
    });

    return [
        {
            type: 'bar',
            stack: '',
            yAxisKey: 'users',
            color: BAR_COLOR,
            data: barData,
        },
        {
            type: 'line',
            yAxisKey: 'users',
            color: LINE_COLOR,
            data: lineData,
        },
    ] as AllSeriesType[];
};

export interface TrendGraphEntry {
    title: string,
    uniqueViewsCount: number,
    likesCount: number,
    isCritical: boolean,
    publishedAt: Date,
    numComments: number
}

export interface TrendGraphData {
    data: TrendGraphEntry[];
}

export function TrendGraph(trendData: TrendGraphData) {
    const [type, setType] = useState('');
    const remoteSetType = (newType: string) => setType(newType) as void;
    trendData.data.sort(function (a, b) {
        return b.publishedAt.getSeconds() - a.publishedAt.getSeconds();
    });
    let graphData: { [key: string]: number } = {};
    trendData.data.forEach((entry) => {
        let key = entry.publishedAt.toDateString() as string;
        if (key in graphData) {
            graphData[key]++;
        } else {
            graphData[key] = 1;
        }
    });
    let dataList = Object.values(graphData) as number[];
    let graphType = [{ type: "Posts", setType: remoteSetType }, { type: "Likes", setType: remoteSetType }, { type: "Comments", setType: remoteSetType }];
    useEffect(() => {
        setType(graphType[0].type);
    }, []);
    let x_title = "Dates";

    const seriesData = createSeriesData(dataList);

    return (
        <ChartContainer
            series={seriesData}
            width={1000}
            height={500}
            xAxis={[
                {
                    id: x_title,
                    data: Object.keys(graphData),
                    scaleType: 'band', // Update as needed
                },
            ]}
            yAxis={[
                {
                    id: 'users',
                    data: Object.values(graphData),
                    scaleType: 'linear', // Update as needed
                },
            ]}
        >
            <BarPlot />
            <LinePlot />
            <ChartsYAxis label={type} position="left" />
            <ChartsXAxis label={x_title} position="bottom" />
            {graphType.map((item: any) => (
                <div className="trendbar-graph-options" key={item.type}>
                    <TrendGraphOption name={item.type} trend={item.type} setTrend={item.setType} />
                </div>
            ))}
        </ChartContainer>
    );
}