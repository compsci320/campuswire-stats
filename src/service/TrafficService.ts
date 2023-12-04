import {TrafficViewModel} from "../viewmodels/Traffic";
import {Post} from "../models/Post";
import { get } from "http";

export function createViewModel(posts: Post[]): TrafficViewModel {
    let unansweredPostsCount = getUnansweredPosts(posts);
    let recentCommentsCount = getRecentComments(posts);
    let recentResponseRates = []
    let recentVisitorsPoints = []
    let resolutionPercentage = 0;
    let recentPostsCount = getRecentPosts(posts);
    let recentResolvedPostsCount = getRecentResolvedPosts(posts);

    return {unansweredPostsCount: unansweredPostsCount, recentCommentsCount: recentCommentsCount, recentPostsCount: recentPostsCount, recentResolvedPostsCount: recentResolvedPostsCount, recentVisitorsPoints: [], recentResponseRates: [], resolutionPercentage: 0};
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




