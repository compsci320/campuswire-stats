import React, { useState } from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';

function TrendingPage() {
  const [trend, setTrend] = useState('');
  const remoteSetTrend = (newTrend: string) => setTrend(newTrend)

  return (
    <>
        <Trendbar trend={ trend } setTrend={ remoteSetTrend }/>
    </>
  );
}

export default TrendingPage;
