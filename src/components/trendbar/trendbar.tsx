import React, { useState, useEffect } from 'react';
import './trendbar.css';
import TrendOption from '../trend-option/trend-option';
import MovingIcon from '@mui/icons-material/Moving';
import mock_data from '../../mock/mock.json';

interface TrendbarProps {
  trend: string;
  setTrend: (newTrend: string) => void;
  trendList: any[]
}

function Trendbar(props: TrendbarProps) {
  const [data, setData] = useState(null);

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

    props.setTrend(props.trendList[0].category);
  }, []);
  console.log(data);

  const options = props.trendList.map(topic => (
    <TrendOption 
      name={topic.category} 
      trend={props.trend} 
      setTrend={props.setTrend}
    />
  ));

  return (
    <div className="trendbar shadow border-b border-gray-300 mb-8">
      <div className="trendbar-title">Trending</div>
      <MovingIcon sx={{ fontSize: 35 }} className="text-indigo-500"/>
      {/* <div className="trendbar-options">{options}</div> */}
    </div>
  );
}

export default Trendbar;