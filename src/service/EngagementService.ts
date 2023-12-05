import {EngagementViewModel} from "../viewmodels/Engagement";
import {Post} from "../models/Post";
import { isMinusToken } from "typescript";

export function createEngagementChartData(post_data: Post[]): {x: string[], y: number[]} {
    const userCountByDate = getUniqueUserCountByDate(post_data);
    let x_axis: string[] = [];
    let engagement_data: number[] = [];
    
    userCountByDate.forEach((value, key) => {
      x_axis.push(key);
      engagement_data.push(value);
    });
  
    return {x: x_axis, y: engagement_data};
}


// TODO: set up scraping to work in just one iteration through the posts array
export function createViewModel(posts: Post[]): EngagementViewModel {
    // map ids to names [first, last]
    let nameMap = getNameMap(posts);
    
    // get total number of comments in the day and map id -> num comments today
    let commentData = getCommentData(posts);
    
    // get total number of posts and map id -> number of posts today
    let postData = getPostData(posts);

    // get map id -> lastSeen 
    let lastSeenMap = getLastSeen(posts);

    return {nameMap: nameMap, numPostsMap: postData.map, lastSeenMap: lastSeenMap,
            numCommentsMap: commentData.map, totalComments: commentData.totalComments, totalPosts: postData.totalPosts};
}

// get number of answers for each person
function getNumAnswersMap(post_data: Post[]): Map<string, number> {
    let result = new Map();
    post_data.forEach(post => {
        if (post.answersCount && post.answersCount > 0) {
            post.comments.forEach(comment => {
                if (comment.answer) {
                    let id = comment.author.id
                    if (result.has(id)) {
                        result.set(id, result.get(id) + 1);
                    } else {
                        result.set(id, 1);
                    }
                    
                }
            });
        }
    });
    return result;
}

function getNameMap(post_data: Post[]): Map<string, string[]> {
    let result = new Map();
    post_data.forEach(post => {
        result.set(post.author.id, [post.author.firstName, post.author.lastName]);
    });
    return result;
}

// TODO: create function that returns total number of posts and comments, along with a map of id: num comments/posts 
function getCommentData(post_data: Post[]): {totalComments: number, map: Map<string, number>} {
    let result = {totalComments: 0, map: new Map()};
    
    post_data.forEach(post => {
        post.comments.forEach(comment => {
            result.totalComments++;
            let id = comment.author.id
            if (result.map.has(id)) {
                result.map.set(id, result.map.get(id) + 1);
            } else {
                result.map.set(id, 1);
            }
            
        });
    });
    
    return result;
}

function getPostData(post_data: Post[]): {totalPosts: number, map: Map<string, number>} {
    let result = {totalPosts: 0, map: new Map()};

    post_data.forEach(post => {
        result.totalPosts++;
        let id = post.author.id;
        if (result.map.has(id)) {
            result.map.set(id, result.map.get(id) + 1);
        } else {
            result.map.set(id, 1);
        }
    });

    return result;
}

function getLastSeen(post_data: Post[]): Map<string, Date> {
    let result = new Map();

    let assignDate = (id: string, newDate: Date) => {
        if (result.has(id)) {
            if (newDate > result.get(id)) {
                result.set(id, newDate)
            }
        } else {
            result.set(id, newDate);
        }
    };

    post_data.forEach(post => {
        if (post.publishedAt) {
            assignDate(post.author.id, new Date(post.publishedAt));
        }
        
        // check both comments and posts
        post.comments.forEach(comment => {
            if (post.publishedAt) {
                assignDate(comment.author.id, new Date(comment.publishedAt));
            }
        });
    })

    return result;
}

// Unique user id 
function getActiveUsersByDate(post_data: Post[]): Map<string, Set<string>> {
    let lastSeenMap = getLastSeen(post_data);
    let dateActivityMap = new Map<string, Set<string>>();

    lastSeenMap.forEach((date, userId) => {
        // Extract only the date part, excluding the time
        let dateString = date.toISOString().split('T')[0];

        if (!dateActivityMap.has(dateString)) {
            dateActivityMap.set(dateString, new Set());
        }
        dateActivityMap.get(dateString)!.add(userId);
    });

    return dateActivityMap;
}

// Unique user count by date
export function getUniqueUserCountByDate(post_data: Post[]): Map<string, number> {
    let activeUsersByDate = getActiveUsersByDate(post_data);
    let uniqueUserCountMap = new Map<string, number>();

    activeUsersByDate.forEach((users, date) => {
        uniqueUserCountMap.set(date, users.size);
    });

    return uniqueUserCountMap;
}



