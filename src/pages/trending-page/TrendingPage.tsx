import React, { useState } from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';
import TrendingPost from '../../components/trending-post/TrendingPost'

const dummyData = [
  { category: "Homework", posts: [{ title: 'HW Post 1', body: "I have a question?", isCritical: true, views: 10, likes: 0 }, { title: 'HW Post 2', body: "This is a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long post", isCritical: false, views: 30, likes: 2 }] },
  { category: "Deadlines", posts: [] },
  { category: "Attendance", posts: [] }
]

function TrendingPage() {
  const [trend, setTrend] = useState('');
  const remoteSetTrend = (newTrend: string) => setTrend(newTrend)

  const renderPosts = () => {
    return dummyData
      .find(elem => elem.category === trend)?.posts
      .map(post => <TrendingPost post={post} />) || 'Undefined';
  }

  return (
    <>
        <Trendbar trend={ trend } setTrend={ remoteSetTrend } trendList={ dummyData }/>
        { renderPosts() }
    </>
  );
}

export default TrendingPage;
