import React from 'react';
import './trendbar.css';
import TrendOption from '../trend-option/trend-option';

const trendingTopics = [
  { name: "Homework" },
  { name: "Projects" },
  { name: "Attendance" },
]

function Trendbar() {
    const options = trendingTopics.map((elem) => <TrendOption name={elem.name} />);

    return (
      <div className="trendbar">
        <div className="trendbar-title">Trending</div>
        <div className="trendbar-options">{ options }</div>
      </div>    
    );
  }
  
export default Trendbar;