import { TrafficViewModel } from "../viewmodels/Traffic";
import { Post } from "../models/Post";

// Function to create a TrafficViewModel from an array of Post objects.
export function createViewModel(posts: Post[]): TrafficViewModel {
    // Calculate various statistics and metrics from the posts.
    let unansweredPostsCount = getUnansweredPosts(posts);
    let recentCommentsCount = getRecentComments(posts);
    let recentPostsCount = getRecentPosts(posts);
    let recentResolvedPostsCount = getRecentResolvedPosts(posts);
    let commentsChange = getCommentsChange(posts);
    let postsChange = getPostsChange(posts);
    let resolvedPostsChange = getResolvedPostsChange(posts);
    let hoursSinceLastPost = getHoursSinceLastPost(posts);
    let traffic_data = getTrafficGraphData(posts);
    let resolved_percentage = getResolvedPercentage(posts);
    let unresolved_percentage = getUnresolvedPercentage(posts);

    // Return the assembled TrafficViewModel object.
    return {
        resolved_percentage, 
        unresolved_percentage, 
        traffic_data: traffic_data, 
        hoursSinceLastPost: hoursSinceLastPost, 
        resolvedPostsChange: resolvedPostsChange, 
        postsChange: postsChange, 
        commentsChange: commentsChange, 
        unansweredPostsCount: unansweredPostsCount, 
        recentCommentsCount: recentCommentsCount, 
        recentPostsCount: recentPostsCount, 
        recentResolvedPostsCount: recentResolvedPostsCount, 
    };
}

// Calculate the number of posts without answers.
export function getUnansweredPosts(posts: Post[]): number {
    let unansweredPostsCount = 0;
    posts.forEach(post => {
        if (post.answersCount === 0) {
            unansweredPostsCount++;
        }
    });
    return unansweredPostsCount;
}

// Calculate the number of comments in the last 24 hours.
export function getRecentComments(posts: Post[]): number {
    let recentCommentsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

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

// Calculate the number of posts in the last 24 hours.
export function getRecentPosts(posts: Post[]): number {
    let recentPostsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    posts.forEach(post => {
        let postDate = new Date(post.publishedAt);
        if (postDate > oneDayAgo) {
            recentPostsCount++;
        }
    });

    return recentPostsCount;
}

// Calculate the number of resolved posts in the last 24 hours.
export function getRecentResolvedPosts(posts: Post[]): number {
    let recentResolvedPostsCount = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

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

// Calculate the percentage change in comments compared to the previous day.
export function getCommentsChange(posts: Post[]): number {
    let commentsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

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

// Calculate the percentage change in posts compared to the previous day.
export function getPostsChange(posts: Post[]): number {
    let postsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    posts.forEach(post => {
        let postDate = new Date(post.publishedAt);
        if (postDate > twoDaysAgo && postDate < oneDayAgo) {
            postsYesterday++;
        }
    });
    return ((getRecentPosts(posts) - postsYesterday) / postsYesterday) * 100;
}

// Calculate the percentage change in resolved posts compared to the previous day.
export function getResolvedPostsChange(posts: Post[]): number {
    let postsYesterday = 0;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

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

// Calculate the hours since the last unanswered post.
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

// Generate data for a traffic graph based on post counts by date.
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

// Calculate post counts grouped by date.
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

// Calculate the percentage of posts that have been resolved.
export function getResolvedPercentage(posts: Post[]): number {
    let resolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt !== undefined) {
            resolvedCount++;
        }
    });
    return (resolvedCount / posts.length) * 100;
}

// Calculate the percentage of posts that remain unresolved.
export function getUnresolvedPercentage(posts: Post[]): number {
    let unresolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt === undefined) {
            unresolvedCount++;
        }
    });
    return (unresolvedCount / posts.length) * 100;
}
