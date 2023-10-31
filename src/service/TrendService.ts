import { Post } from "../models/Post";
import { PostTrendViewModel, TrendsViewModel } from "../viewmodels/Trends";
import * as fs from 'fs';
import * as path from 'path';

export function getTrendsModel(getPostData: () => Post[], postToTrends: (posts: Post[]) => TrendsViewModel): TrendsViewModel {
    return postToTrends(getPostData());
}

export function getPostData() {
    console.log(fs.readdirSync("../mock/").filter((file) => path.extname(file) === ".json"));
    return fs.readdirSync("../mock/").filter((file) => path.extname(file) === ".json").map((post) => JSON.parse(post)) as Post[];
}


export function postToTrends(posts: Post[]): PostTrendViewModel[] {
    return posts.map((post) => {
        return {
            id: post.id,
            title: post.title,
            topic: post.categoryId,
            publishedAt: post.publishedAt,
            body: post.body,
            authorName: post.author.firstName + " " + post.author.lastName,
            uniqueViewsCount: post.uniqueViewsCount,
            likesCount: post.likesCount
        }
    });
}