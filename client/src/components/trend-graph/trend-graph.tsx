import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import './trend-graph.css';
import json_data from '../../mock/mock.json';

function TrendGraph() {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log('Fetching data...');
        fetch('http://localhost:5001/get_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_data)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Data received:', data);
                setData(data);
            })
            .catch(err => console.error('Error:', err));

    }, []);
    if (data === null) {
        return (
            <div className="trendbar-loading">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="trend-graph" >
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    );
}

export default TrendGraph;