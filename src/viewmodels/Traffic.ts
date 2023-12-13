export interface TrafficViewModel {
    unansweredPostsCount: number,
    recentVisitorsPoints: {x: number, y: number}[],
    recentResponseRates: {x: number, y: number}[],
    resolutionPercentage: number;
    recentCommentsCount: number;
    recentPostsCount: number;
    recentResolvedPostsCount: number;
    commentsChange: number;
    postsChange: number;
    resolvedPostsChange: number;
    hoursSinceLastPost: number;
    traffic_data: any;
    resolved_percentage: number;
    unresolved_percentage: number;
}

