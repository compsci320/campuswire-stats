// Interface for the TrafficViewModel which holds various statistics related to traffic and engagement.
export interface TrafficViewModel {
    unansweredPostsCount: number, // The number of posts that have not received any answers.
    recentCommentsCount: number; // The count of comments made in recent times (typically the last 24 hours).
    recentPostsCount: number; // The number of posts created in a recent timeframe (e.g., last 24 hours).
    recentResolvedPostsCount: number; // The count of posts that were resolved or answered recently.
    commentsChange: number; // The percentage change in the number of comments compared to the previous time period.
    postsChange: number; // The percentage change in the number of posts compared to the previous time period.
    resolvedPostsChange: number; // The percentage change in the number of resolved posts compared to the previous time period.
    hoursSinceLastPost: number; // The number of hours that have elapsed since the last post was made.
    traffic_data: any; // Data related to traffic, usually including metrics like visit counts or engagement over time.
    resolved_percentage: number; // The percentage of posts that have been resolved or answered.
    unresolved_percentage: number; // The percentage of posts that remain unresolved or unanswered.
}
