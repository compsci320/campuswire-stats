import React, { useState, useEffect } from 'react';
import './trendbar.css';
import TrendOption from '../trend-option/trend-option';
import mock_data from '../../mock/mock.json';

function Trendbar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    fetch('http://localhost:5001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mock_data)
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
  let wordList = data["words"] as string[];
  const options = wordList.map((elem, idx) => <TrendOption key={idx} name={elem} />);
  return (
    <div className="trendbar">
      <div className="trendbar-title">Trending </div>
      <div className="trendbar-options">{options}</div>
    </div>
  );
}

export default Trendbar;