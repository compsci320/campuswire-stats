import React, { useState } from 'react';
import './TrendingPage.css';
import Trendbar from '../../components/trendbar/trendbar';
import TrendingPost from '../../components/trending-post/TrendingPost'

const dummyData = [
  { name: "Homework", posts: [{ title: 'HW Post 1' }, { title: 'HW Post 2' }] },
  { name: "Deadlines", posts: [] },
  { name: "Attendance", posts: [] }
]

function TrendingPage() {
  const [trend, setTrend] = useState('');
  const remoteSetTrend = (newTrend: string) => setTrend(newTrend)

  const renderPosts = () => {
    return dummyData.find(elem => elem.name === trend)?.posts.map(post => <p>{ post.title }</p>) || 'Undefined';
  }

  return (
    <>
        <Trendbar trend={ trend } setTrend={ remoteSetTrend } trendList={ dummyData }/>
        { renderPosts() }
    </>
  );
}

export default TrendingPage;
