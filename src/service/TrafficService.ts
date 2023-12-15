import { TrafficViewModel } from "../viewmodels/Traffic";
import { Post } from "../models/Post";

/** 
 Create a TrafficViewModel from an array of Post objects.
 *@param  {Post[]} posts - Campuswire posts with Post interface
 *@return {TrafficViewModel} Traffic page statistics with TrafficViewModel interface
*/ 

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

/** 
* Counts number of posts without answers.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of unanswered posts
*/

export function getUnansweredPosts(posts: Post[]): number {
    let unansweredPostsCount = 0;
    posts.forEach(post => {
        if (post.answersCount === 0) {
            unansweredPostsCount++;
        }
    });
    return unansweredPostsCount;
}

/** 
* Counts number of comments made on posts in the past 24 hours.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of comments made in past 24 hours
*/

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

/** 
* Counts number of posts made in past 24 hours.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of recently made posts
*/

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

/** 
* Counts number of posts resolved by instructors in past 24 hours.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of recently answered posts
*/

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

/** 
* Calculates the percentage change in comments compared to the previous day.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Percentage change in number of comments on posts
*/

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

/** 
* Calculates percentage change in posts compared to the previous day.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Percentage change in number of posts made
*/

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

/** 
* Calculates the percentage change in resolved posts compared to the previous day.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Percentage change in resolved posts
*/

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

/** 
* Counts number of hours since last unanswered post was made.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of hours since last post
*/

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

/** 
* Converts dates and post count into x axis and y axis data for traffic graph.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {any} JS Object with x: string[] of dates and y: number[] of number of posts made on that day
*/

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

/** 
* Counts number of posts made on each day, helper function for getTrafficGraphData
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {Map<string, number>} Map with date strings as keys and number of posts made on that date as values
*/

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

/** 
* Counts percentage of all posts resolved by instructors.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of resolved posts
*/

export function getResolvedPercentage(posts: Post[]): number {
    let resolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt !== undefined) {
            resolvedCount++;
        }
    });
    return (resolvedCount / posts.length) * 100;
}

/** 
* Calculates percentage of all posts that have not been answered by instructors yet.
* @param {Post[]} posts - Campuswire posts with Post interface
* @return {number} Number of unresolved posts
*/

export function getUnresolvedPercentage(posts: Post[]): number {
    let unresolvedCount = 0;
    posts.forEach(post => {
        if (post.modAnsweredAt === undefined) {
            unresolvedCount++;
        }
    });
    return (unresolvedCount / posts.length) * 100;
}
