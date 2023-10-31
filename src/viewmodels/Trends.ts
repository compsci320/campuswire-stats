export interface TrendsViewModel {
    posts: PostTrendViewModel[];
    trendingTopics: string[];
}

export interface PostTrendViewModel {
    id: string;
    title: string;
    topic: string;
    publishedAt: string;
    body: string;
    authorName: string;
    uniqueViewsCount: number;
    likesCount: number;
}