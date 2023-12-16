import React, { useState, useEffect } from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts';
import TrendGraphOption from '../trend-graph-option/trend-graph-option';


// Define color constants
const BAR_COLOR = "#6466e9";
const LINE_COLOR = "black";

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
// Interface for entry points in the trend page's graph
export interface TrendGraphEntry {
    title: string,
    uniqueViewsCount: number,
    likesCount: number,
    isCritical: boolean,
    publishedAt: Date,
    numComments: number
}
// Interface for the list entry point in a trend graph
export interface TrendGraphData {
    data: TrendGraphEntry[];
}
// Trend Graph Component
export function TrendGraph(trendData: TrendGraphData) {
    console.log(trendData);
    const [type, setType] = useState('');
    const remoteSetType = (newType: string) => setType(newType) as void;
    // Sort trendData by date
    trendData.data.sort(function (a, b) {
        return (b.publishedAt.getTime() - a.publishedAt.getTime()) * -1;
    });
    // Sort by trend
    let graphData: { [key: string]: TrendGraphEntry[] } = {};
    trendData.data.forEach((entry) => {
        let key = entry.publishedAt.toDateString() as string;
        if (key in graphData) {
            graphData[key].push(entry);
        } else {
            graphData[key] = [entry] as TrendGraphEntry[];
        }
    });
    // Options for the data in the graph
    let graphType = [{ type: "Posts", setType: remoteSetType }, { type: "Likes", setType: remoteSetType }, { type: "Comments", setType: remoteSetType }];
    useEffect(() => {
        setType(graphType[0].type);
    }, []);
    // Update the data in the graph from user input
    let dataList = Object.keys(graphData).map((key) => graphData[key].length) as number[];
    if (type === "Posts") {
        dataList = Object.keys(graphData).map((key) => graphData[key].length) as number[];
    } else if (type === "Likes") {
        dataList = Object.keys(graphData).map((key) => graphData[key].reduce((prev, curr) => prev + curr.likesCount, 0)) as number[];
    } else if (type === "Comments") {
        dataList = Object.keys(graphData).map((key) => graphData[key].reduce((prev, curr) => prev + curr.numComments, 0)) as number[];
    }
    let x_title = "Dates";

    const seriesData = createSeriesData(dataList);

    window.addEventListener('resize', function (event) {
        window.location.reload();
    }, true);
    // Graph Object
    return (
        <div>
            <ChartContainer
                series={seriesData}
                width={window.innerWidth - 275}
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
            </ChartContainer>
            {/* List of datas in the x-axis */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                {graphType.map((item: any) => {
                    return (
                        <div className="trendbar-graph-options" key={item.type}>
                            <TrendGraphOption name={item.type} trend={type} setTrend={item.setType} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}