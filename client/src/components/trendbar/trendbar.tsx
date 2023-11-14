import React, { useState, useEffect } from 'react';
import './trendbar.css';
import TrendOption from '../trend-option/trend-option';
import mock_data from '../../mock/mock.json';

const trendingTopics = [
  { name: "Homework" },
  { name: "Projects" },
  { name: "Attendance" },
]

function Trendbar() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/app/get_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mock_data),
        });
        console.log("main");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  const options = trendingTopics.map((elem, idx) => <TrendOption key={idx} name={elem.name} />);
  return (
    <div className="trendbar">
      <div className="trendbar-title">Trending</div>
      <div className="trendbar-options">{options}</div>
    </div>
  );
}

export default Trendbar;