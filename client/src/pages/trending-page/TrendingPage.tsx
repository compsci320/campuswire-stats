import React from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';
import TrendGraph from '../../components/trend-graph/trend-graph';

function TrendingPage() {
  return (
    <>
      <Trendbar />
      <TrendGraph />
    </>
  );
}

export default TrendingPage;
