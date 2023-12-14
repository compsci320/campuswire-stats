import React from 'react';
import { Post } from "../../models/Post";
import './TrafficPage.css';
import { createViewModel } from '../../service/TrafficService';
import { UnansweredPostsCard } from '../../components/unansweredPostsCard/unansweredPosts';
import Paper from '@mui/material/Paper';
import { RecentPostsCard } from '../../components/recentPostsCard/recentPostsCard';
import { PieCard } from '../../components/pieCard/pieCard';
import { Typography } from '@mui/material';
import { RecentResolvedPostsCard } from '../../components/recentResolvedPostsCard/recentResolvedPostsCard';
import { RecentCommentsCard } from '../../components/recentCommentsCard/recentCommentsMade';
import { TrafficGraph } from '../../components/trafficGraph/trafficGraph';

let post_data: Post[] = require('../../mock/mock.json');
const viewModel = createViewModel(post_data);

const cardStyles = { height: '150px', backgroundColor: '#fbfbf9', border: '0.5px solid #bababa' };
const pieColorStyles = { height: '425px', width: '400px', backgroundColor: '#fbfbf9', border: '0.5px solid #bababa' }; // Adjusted size for the PieCard
const graphColorStyles = { height: '425px', width: '700px', backgroundColor: '#fbfbf9', border: '0.5px solid #bababa' }; // Adjusted size for the PieCard

function TrafficPage() {
  console.log("x", viewModel.traffic_data.x)
  console.log("y", viewModel.traffic_data.y)


  return (
    <div style={{ backgroundColor: '#f8f2ed', minHeight: '100vh', padding: '16px' }}>

      <Paper elevation={3} sx={{ padding: 2, margin: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#fbfcf8' }}>
        <div id="bigheading" style={{ marginBottom: '8px' }}>
        <TrafficBar />

        </div>
        <div id="welcome" style={{ marginBottom: '16px' }}>
          <Typography variant="h4" color='text.primary' textAlign='left'>Welcome!</Typography>
        </div>
        
        {/* Cards Row */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '16px' }}>
          <UnansweredPostsCard
            hours={viewModel.hoursSinceLastPost}
            sx={cardStyles}
            value={viewModel.unansweredPostsCount}
          />
          <RecentCommentsCard
            difference={viewModel.commentsChange}
            positive={viewModel.commentsChange > 0}
            sx={cardStyles}
            value={viewModel.recentCommentsCount}
          />
          <RecentPostsCard
            difference={viewModel.postsChange}
            positive={viewModel.postsChange > 0}
            sx={cardStyles}
            value={viewModel.recentPostsCount}
          />
          <RecentResolvedPostsCard
            difference={viewModel.resolvedPostsChange}
            positive={viewModel.resolvedPostsChange > 0}
            sx={cardStyles}
            value={viewModel.recentResolvedPostsCount}
          />
        </div>
        {/* Charts Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <PieCard sx={pieColorStyles} resolved_percentage={viewModel.resolved_percentage} unresolved_percentage={viewModel.unresolved_percentage} />
          <TrafficGraph y={viewModel.traffic_data.y} x={viewModel.traffic_data.x} sx={graphColorStyles} />
        </div>
      </Paper>
    </div>
  );
}

export default TrafficPage;
