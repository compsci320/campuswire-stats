export interface TrafficViewModel {
    unansweredPostsCount: number,
    recentVisitorsPoints: {x: number, y: number}[],
    recentResponseRates: {x: number, y: number}[],
    resolutionPercentage: number;
    recentCommentsCount: number;
    recentPostsCount: number;
    recentResolvedPostsCount: number;
}

