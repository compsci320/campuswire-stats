import React, { useState, useEffect } from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';
import TrendingPost from '../../components/trending-post/TrendingPost';
import { getTrendsData } from '../../service/TrendService';
import { Box, Tab, Tabs } from '@mui/material';

function TrendingPage() {
  const [data, setData] = useState(null);
  const [trend, setTrend] = useState('');
  const remoteSetTrend = (newTrend: string) => setTrend(newTrend)

  useEffect(() => {
    console.log('Fetching data...');
    getTrendsData()
      .then(data => {
        console.log('Data received:', data);
        setData(data);
        setTrend(Object.keys(data)[0]);
      })
      .catch(err => console.error('Error:', err));

  }, []);

  const renderPosts = () => {
    if (data === null)
      return [];

    if (trend === null)
      return []

    return (data[trend] as Array<any>).map((item: any) => (
      <TrendingPost 
        key={item['id']}
        post={{
          title: item['title'] as string,
          body: item['body'] as string,
          uniqueViewsCount: item['uniqueViewsCount'] as number,
          likesCount: item['likesCount'] as number,
          isCritical: false
        }} 
      />
    )
    );
  };

  const renderOptions = () => {
    if (data === null) return [];

    let categories = Object.keys(data);

    // return (categories as Array<string>).map((item: string) => ({
    //   name: item, trend: item, setTrend: remoteSetTrend
    // }));

    return (categories as Array<string>).map((item: string) => {
      if (item !== 'Other')
        return <Tab value={item} label={item} key={item}></Tab>;
    });
  };


  return (
    <>
      {data && trend ? (
        <>
          <Trendbar />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={trend} onChange={(e, value) => remoteSetTrend(value)} aria-label="basic tabs example">
              {renderOptions()}
              <Tab value={'Other'} label={'Other'} key={'Other'}></Tab>
            </Tabs>
          </Box>
          {renderPosts()}
        </>
      ) : (
        <div className="trendbar-loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default TrendingPage;
