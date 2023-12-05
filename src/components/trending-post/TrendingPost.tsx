import React from 'react';
import './TrendingPost.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface TrendingPageProps {
  post: {
    title: string,
    body: string,
    uniqueViewsCount: number,
    likesCount: number,
    isCritical: boolean
  }
}

function TrendingPost(props: TrendingPageProps) {
  return (
    <div className={!props.post.isCritical ? "post-default" : "post-critical"}>
      <div className="post-header">
        {props.post.title}
        {!props.post.isCritical ? <></> : <PriorityHighIcon sx={{ paddingBottom: 0, paddingLeft: 0 }} />}
        {
          !props.post.isCritical ? <></> :
            <>
              <div style={{ flex: 1 }}></div>
              <div style={{ fontSize: 'small', fontWeight: 400 }}>{"(Posted X days ago)"}</div>
            </>
        }
      </div>
      <div className="post-body">
        {props.post.body}
      </div>
      <div className="post-footer">
        <ThumbUpAltIcon sx={{ paddingRight: 0.8 }} /> 
        { !props.post.likesCount || props.post.likesCount === 0 ? 0 : props.post.likesCount } Likes
        <VisibilityIcon sx={{ paddingLeft: 3, paddingRight: 0.8 }} /> 
        { !props.post.uniqueViewsCount || props.post.uniqueViewsCount === 0 ? 0 : props.post.uniqueViewsCount } Views
      </div>
    </div>
  );
}

export default TrendingPost;