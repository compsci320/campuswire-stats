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
    else {
        let wordList = Object.keys(data);
        let wordValues = Object.values(data);
        let wordGraph = wordList.map(elem => wordValues.length);
        return (
            <div className="trend-graph" >
                <LineChart
                    xAxis={[{ data: wordList }]}
                    series={[
                        {
                            data: wordGraph,
                        },
                    ]}
                    width={1000}
                    height={600}
                />
            </div>
        );
    }
}

export default TrendGraph;