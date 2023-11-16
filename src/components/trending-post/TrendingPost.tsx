import React from 'react';
import './TrendingPost.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface TrendingPageProps {
  title: string,
  isCritical: boolean
}

function TrendingPost(props: TrendingPageProps) {
  return (
    <div className={ props.isCritical ? "post-critical" : "post-default"}>
      <AccountCircleIcon />
    </div>
  );
}

export default TrendingPost;