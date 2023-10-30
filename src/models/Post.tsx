export interface Post {
    id: string
    categoryId: string
    author: Author
    title: string
    body: string
    anonymous: boolean
    published: boolean
    publishedAt: string
    group: string
    number: number
    type: string
    visibility: string
    slug: string
    createdAt: string
    updatedAt: string
    answersCount: number
    uniqueViewsCount: number
    viewsCount: number
    answeredAt: string
    modAnsweredAt: string
    read: boolean
    conversation: Conversation
    comments: Comment[]
    // only some posts have the stuff below this
    lastEditedAt: string
    votesCount: number
    voted: boolean
    likesCount?: number
    // only like 4 posts have these, probably not necessary
    // pinPosition?: number
    // pollClosesAt?: string
    // pollOptions?: PollOption[]
    // liked?: boolean
}

export interface Author {
    id: string
    firstName: string
    lastName: string
    registered: boolean
    slug: string
    role: string
}

export interface Conversation {
    id: string
    name: string
    slug: string
    photo: string
    type: string
    public: boolean
    group: string
    network: string
    firstMessage: Message
    lastMessage: Message
    lastMessageAt: string
    createdAt: string
    updatedAt: string
    post: string
    subscribers: Subscriber[]
    // only some coversations have this
    messagesCount: number
}

// first message has author while last message does not in the json
// messages have metadata and readstate attributes, but these don't contain anything so ignore them
export interface Message {
    id: string
    uuid: string
    anonymousLevel: number
    author: Author
    conversation: string
    system: boolean
    createdAt: string
    updatedAt: string
    systemMessageType: string
    type: string
}

// used in conversations
export interface Subscriber {
    id: string
    enabled: boolean
}

export interface Comment {
    id: string
    author: Author
    body: string
    answer: boolean
    createdAt: string
    publishedAt: string
    endorsed: boolean
    depth: number
    parent: string
    votesCount: number
    // stuff below here is only present in some comments
    anonymous: boolean
    endorsers: Endorser[] // only 4 endorser posts
    voted: boolean
    lastEditedAt: string
}

// not sure what here is actually useful
export interface Endorser {
    id: string
    slug: string
    firstName: string
    lastName: string
    network: string
    verified: boolean
    registered: boolean
    genus: string
    createdAt: string
    walkthrough: number
}