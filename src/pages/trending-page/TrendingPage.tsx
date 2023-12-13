import React, { useState, useEffect } from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';
import TrendingPost from '../../components/trending-post/TrendingPost';
import { getTrendsData } from '../../service/TrendService';
import { TrendGraph } from '../../components/trend_graph/trend_graph';
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
        if (data === null || trend === null)
            return [];

    return (data[trend] as Array<any>).map((item: any) => (
      <TrendingPost post={{
        title: item['title'] as string,
        body: item['body'] as string,
        uniqueViewsCount: item['uniqueViewsCount'] as number,
        likesCount: item['likesCount'] ? item['likesCount'] : 0 as number,
        isCritical: item['answersCount'] ? true : false,
        publishedAt: new Date(item["publishedAt"])
      }} />
    )
    );
  };

    const renderGraphData = () => {
        if (data === null || trend === null)
            return [];

      return (data[trend] as Array<any>).map((item: any) => (
        {
          title: item['title'] as string,
          uniqueViewsCount: item['uniqueViewsCount'] as number,
          likesCount: item['likesCount'] ? item['likesCount'] : 0 as number,
          isCritical: ((item['answersCount']) as number) === 0,
          publishedAt: new Date(item["publishedAt"]),
          numComments: item['comments'] ? item['comments'].length : 0 as number
        })
      );
    }

    const renderOptions = () => {
        if (data === null) return [];

        let categories = Object.keys(data);

        return (categories as Array<string>).map((item: string) => (
            <Tab value={item} label={item} key={item}></Tab>
        ));

    };


    return (
        <>
          <Trendbar />
          <div style = {{
            display: 'flex',
            flex: 1
          }}>
            <Box>
              <Tabs value={trend} onChange={(e, value) => remoteSetTrend(value)} aria-label="basic tabs example">
                {renderOptions()}
              </Tabs>
            </Box>
          </div>
          <TrendGraph data={renderGraphData()} />
          <div style={{ height: 40 }}></div>
          {renderPosts()}
            {data && trend ? (
                <>
                    <Trendbar />
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={trend} onChange={(e, value) => remoteSetTrend(value)} aria-label="basic tabs example">
                            {renderOptions()}
                        </Tabs>
                    </Box>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TrendGraph data={renderGraphData()} />
                    </div>
                    {renderPosts()}
                </>
            ) : (
                <div className="centered">
                    <div className="trendbar-loading">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default TrendingPage;