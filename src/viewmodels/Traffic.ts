export interface TrafficViewModel {
    unansweredPostsCount: number,
    peopleOnlineCount: number,
    recentVisitorsPoints: {x: number, y: number}[],
    recentResponseRates: {x: number, y: number}[],
    resolutionPercentage: number;
}

