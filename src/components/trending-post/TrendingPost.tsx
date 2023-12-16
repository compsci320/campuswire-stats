import React from 'react';
import './TrendingPost.css';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
// Interface for the list of posts in the trend page
interface TrendingPageProps {
  post: {
    title: string,
    body: string,
    uniqueViewsCount: number,
    likesCount: number,
    publishedAt: Date,
    isCritical: boolean
  }
}
// Component for the posts in the trend page
function TrendingPost(props: TrendingPageProps) {
  // Find the date of the post
  let presentDate = new Date();
  let diff = presentDate.getTime() - props.post.publishedAt.getTime();
  let days = Math.floor(diff / (1000 * 3600 * 24));
  return (
    // Decides whether the post is critical
    < div className={!props.post.isCritical ? "post-default" : "post-critical"
    }>
      <div className="post-header">
        {props.post.title}
        {!props.post.isCritical ? <></> : <PriorityHighIcon sx={{ paddingBottom: 0, paddingLeft: 0 }} />}
        {
          !props.post.isCritical ?
            <>
              <div style={{ flex: 1 }}></div>
              <div style={{ fontSize: 'small', fontWeight: 400 }}>Posted {days} days ago</div>
            </>
            :
            <>
              <div style={{ flex: 1 }}></div>
              <div style={{ fontSize: 'small', fontWeight: 400 }}>No replies for {days} days</div>
            </>
        }
      </div>
      <div className="post-body">
        {props.post.body}
      </div>
      <div className="post-footer">
        <ThumbUpAltIcon sx={{ paddingRight: 0.8 }} /> {props.post.likesCount} Likes
        <VisibilityIcon sx={{ paddingLeft: 3, paddingRight: 0.8 }} /> {props.post.uniqueViewsCount} Views
      </div>
    </div >
  );
}

export default TrendingPost;