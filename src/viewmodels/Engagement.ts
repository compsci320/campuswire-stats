export interface EngagementViewModel {
    idToNames: Map<string, string[]>;
    idToTotalPosts: Map<string, number>;
    idToLastSeen: Map<string, string>;
}