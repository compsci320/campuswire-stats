import React from 'react';
import { Post } from "../../models/Post";
import './TrafficPage.css';
import { createViewModel } from '../../service/TrafficService';
import { UnansweredPostsCard } from '../../components/unansweredPostsCard/unansweredPosts';
import Paper from '@mui/material/Paper';
import { RecentPostsCard } from '../../components/recentPostsCard/recentPostsCard';
import { PieCard } from '../../components/pieCard/pieCard';
import { Typography } from '@mui/material';

let post_data: Post[] = require('../../mock/mock.json');
const viewModel = createViewModel(post_data);

const cardStyles = { height: '150px', backgroundColor: '#fbfbf9', border: '0.5px solid #bababa' };
const pieColorStyles = { height: '350px', width: '350px', backgroundColor: '#fbfbf9', border: '0.5px solid #bababa' }; // Adjusted size for the PieCard

function TrafficPage() {
  return (
    <div style={{ backgroundColor: '#f8f2ed', minHeight: '100vh', padding: '16px' }}>
      <Paper elevation={3} sx={{ padding: 2, margin: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#fbfcf8' }}>
        <div id="bigheading" style={{ marginBottom: '8px' }}>
          <Typography variant="h2" color='text.primary' textAlign='center'>Current Traffic</Typography>
        </div>
        <div id="welcome" style={{ marginBottom: '8px' }}>
          <Typography variant="h4" color='text.primary' textAlign='left'>Welcome!</Typography>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <UnansweredPostsCard 
              difference={12}
              positive={true}
              sx={cardStyles}
              value={viewModel.unansweredPostsCount}
            />
            <RecentPostsCard 
              difference={12}
              positive={true}
              sx={cardStyles}
              value="24"
            />
            <PieCard sx={pieColorStyles} />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default TrafficPage;
