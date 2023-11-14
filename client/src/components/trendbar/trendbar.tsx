import React, { useState, useEffect } from 'react';
import './trendbar.css';
import TrendOption from '../trend-option/trend-option';
import mock_data from '../../mock/mock.json';

function Trendbar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/${mock_data}`).then(res => res.json()).then(data => { setData(data); console.log(data); }).catch(err => console.error(err));

  });
  if (data === null) {
    return <p>Loading...</p>;
  }
  let wordList = data["words"] as string[];
  const options = wordList.map((elem, idx) => <TrendOption key={idx} name={elem} />);
  return (
    <div className="trendbar">
      <div className="trendbar-title">Trending</div>
      <div className="trendbar-options">{options}</div>
    </div>
  );
}

export default Trendbar;