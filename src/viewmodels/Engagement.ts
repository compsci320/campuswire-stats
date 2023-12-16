// Interface to hold data correlated to the analytics about user engagement
export interface EngagementViewModel {
    nameMap: Map<string, string[]>;
    numPostsMap: Map<string, number>;
    lastSeenMap: Map<string, Date>;
    numCommentsMap: Map<string, number>;
    totalComments: number;
    totalPosts: number;
}