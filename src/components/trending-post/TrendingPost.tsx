import React from 'react';
import './TrendingPost.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface TrendingPageProps {
  post: {
    title: string,
    body: string,
    views: number,
    likes: number,
    isCritical: boolean
  }
}

function TrendingPost(props: TrendingPageProps) {
  return (
    <div className={ !props.post.isCritical ? "post-default" : "post-critical bg-indigo-500 text-white" }>
      <div className="post-header">
        {props.post.title}
        { !props.post.isCritical ? <></> : <PriorityHighIcon sx={{ paddingBottom: 0, paddingLeft: 0 }} /> }
        {
          !props.post.isCritical ? <></> :
          <>
            <div style={{ flex: 1 }}></div>
            <div style={{ fontSize: 'small', fontWeight: 400 }}>{"(Posted X days ago)"}</div>
          </>
        }
      </div>
      <div className="post-body">
        { props.post.body }
      </div>
      <div className="post-footer">
        <ThumbUpAltIcon sx={{ paddingRight: 0.8 }}/> {props.post.likes} Likes
        <VisibilityIcon sx={{ paddingLeft: 3, paddingRight: 0.8}}/> {props.post.views} Views
      </div>
    </div>
  );
}

export default TrendingPost;