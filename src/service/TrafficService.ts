import {TrafficViewModel} from "../viewmodels/Traffic";
import {Post} from "../models/Post";
import { get } from "http";
import { resolve } from "path";

export function createViewModel(posts: Post[]): TrafficViewModel {
    let unansweredPostsCount = getUnansweredPosts(posts);
    let recentCommentsCount = getRecentComments(posts);
    let recentResponseRates = []
    let recentVisitorsPoints = []
    let resolutionPercentage = 0;
    let recentPostsCount = getRecentPosts(posts);
    let recentResolvedPostsCount = getRecentResolvedPosts(posts);
    let commentsChange = getCommentsChange(posts);
    let postsChange = getPostsChange(posts);
    let resolvedPostsChange = getResolvedPostsChange(posts);
    let hoursSinceLastPost = getHoursSinceLastPost(posts);
    let traffic_data = getTrafficGraphData(posts);
    let resolved_percentage = getResolvedPercentage(posts);
    let unresolved_percentage = getUnresolvedPercentage(posts);

    return {resolved_percentage, unresolved_percentage, traffic_data: traffic_data, hoursSinceLastPost: hoursSinceLastPost, resolvedPostsChange: resolvedPostsChange, postsChange: postsChange, commentsChange: commentsChange, unansweredPostsCount: unansweredPostsCount, recentCommentsCount: recentCommentsCount, recentPostsCount: recentPostsCount, recentResolvedPostsCount: recentResolvedPostsCount, recentVisitorsPoints: [], recentResponseRates: [], resolutionPercentage: 0};
}

export function getUnansweredPosts(posts: Post[]): number {
    let unansweredPostsCount = 0;
    posts.forEach(post => {
        if (post.answersCount === 0) {
            unansweredPostsCount++;
        }
    });
    return unansweredPostsCount;
}

export function getRecentComments(posts: Post[]): number {
    let recentCommentsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    posts.forEach(post => {
        post.comments.forEach(comment => {
            let commentDate = new Date(comment.publishedAt);
            if (commentDate > oneDayAgo) {
                recentCommentsCount++;
            }
        });
    });

    return recentCommentsCount;
}

export function getRecentPosts(posts: Post[]): number {
    let recentPostsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    posts.forEach(post => {
        let postDate = new Date(post.publishedAt);
        if (postDate > oneDayAgo) {
            recentPostsCount++;
        }
    });

    return recentPostsCount;
}

export function getRecentResolvedPosts(posts: Post[]): number {
    let recentResolvedPostsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    posts.forEach(post => {
        if (post.modAnsweredAt !== undefined) {
            let postDate = new Date(post.modAnsweredAt);
            if (postDate > oneDayAgo) {
                recentResolvedPostsCount++;
            }
        }
    });

    return recentResolvedPostsCount;
}

export function getCommentsChange(posts: Post[]): number {
    let commentsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

    posts.forEach(post => {
        post.comments.forEach(comment => {
            let commentDate = new Date(comment.publishedAt);
            if (commentDate > twoDaysAgo && commentDate < oneDayAgo) {
                commentsYesterday++;
            }
        });
    });
    return ((getRecentComments(posts) - commentsYesterday) / commentsYesterday) * 100;
}

export function getPostsChange(posts: Post[]): number {
    let postsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

    posts.forEach(post => {
        let postDate = new Date(post.publishedAt);
        if (postDate > twoDaysAgo && postDate < oneDayAgo) {
            postsYesterday++;
        }
    });
    return ((getRecentPosts(posts) - postsYesterday) / postsYesterday) * 100;
}


export function getResolvedPostsChange(posts: Post[]): number {
    let postsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

    posts.forEach(post => {
        if (post.modAnsweredAt !== undefined) {
            let resolvedDate = new Date(post.modAnsweredAt);
            if (resolvedDate > twoDaysAgo && resolvedDate < oneDayAgo) {
                postsYesterday++;
            }
        }
    });
    return ((getRecentResolvedPosts(posts) - postsYesterday) / postsYesterday) * 100;
}

export function getHoursSinceLastPost(posts: Post[]): number {
    let hoursSinceLastPost = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].answersCount === 0) {
            let lastPostDate = new Date(posts[i].publishedAt);
            hoursSinceLastPost = Math.floor((Date.now() - lastPostDate.getTime()) / 1000 / 60 / 60);
        }
        return hoursSinceLastPost;
    };

    return hoursSinceLastPost;
}

export function getTrafficGraphData(posts: Post[]): any {
    let postCountByDate = getPostCountByDate(posts);
    let x_axis: string[] = [];
    let traffic_data: number[] = [];

    postCountByDate.forEach((value, key) => {
        x_axis.push(key);
        traffic_data.push(value);
    });

    return {x: x_axis, y: traffic_data};
}

export function getPostCountByDate(posts: Post[]): Map<string, number> {
    let result = new Map();
    posts.forEach(post => {
        let date = new Date(post.publishedAt);
        let dateString = date.toISOString().split('T')[0];
        if (result.has(dateString)) {
            result.set(dateString, result.get(dateString) + 1);
        } else {
            result.set(dateString, 1);
        }
    });
    return result;
}

export function getResolvedPercentage(posts: Post[]): number {
    let resolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt !== undefined) {
            resolvedCount++;
        }
    });
    return (resolvedCount / posts.length) * 100;
}

export function getUnresolvedPercentage(posts: Post[]): number {
    let unresolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt === undefined) {
            unresolvedCount++;
        }
    });
    return (unresolvedCount / posts.length) * 100;
}