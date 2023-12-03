import {TrafficViewModel} from "../viewmodels/Traffic";
import {Post} from "../models/Post";

export function createViewModel(posts: Post[]): TrafficViewModel {
    console.log("create model posts: " + posts);
    let unansweredPostsCount = getUnansweredPosts(posts);
    let recentResponseRates = []
    let recentVisitorsPoints = []
    let resolutionPercentage = 0;

    return {unansweredPostsCount: unansweredPostsCount, recentVisitorsPoints: [], recentResponseRates: [], resolutionPercentage: 0};
}

export function getUnansweredPosts(posts: Post[]): number {
    let unansweredPostsCount = 0;
    posts.forEach(post => {
//        console.log("get answered post: " + post);
        if (post.answersCount === 0) {
            unansweredPostsCount++;
        }
    });
    console.log("Unanswered posts count: " + unansweredPostsCount);
    return unansweredPostsCount;
}





