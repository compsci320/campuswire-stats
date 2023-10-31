export interface Post {
  id: string
  categoryId: string
  author: Author
  title: string
  body: string
  anonymous?: boolean
  published: boolean
  publishedAt: string
  group: string
  number: number
  type: string
  visibility: string
  slug: string
  createdAt: string
  updatedAt: string
  answersCount?: number
  uniqueViewsCount: number
  viewsCount: number
  answeredAt?: string
  modAnsweredAt?: string
  read?: boolean
  conversation: Conversation
  comments: Comment[]
  lastEditedAt?: string
  votesCount?: number
  voted?: boolean
  likesCount?: number
  pinPosition?: number
  pollClosesAt?: string
  pollOptions?: PollOption[]
  liked?: boolean
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
  firstMessage: FirstMessage
  lastMessage: LastMessage
  lastMessageAt: string
  createdAt: string
  updatedAt: string
  post: string
  subscribers?: Subscriber[]
  messagesCount?: number
}

export interface FirstMessage {
  id: string
  uuid: string
  anonymousLevel: number
  conversation: string
  system: boolean
  createdAt: string
  updatedAt: string
  systemMessageType: string
  type: string
  metadata: Metadata
  readState: ReadState
}

export interface Metadata {}

export interface ReadState {}

export interface LastMessage {
  id: string
  uuid: string
  anonymousLevel: number
  author: Author2
  conversation: string
  system?: boolean
  createdAt: string
  updatedAt: string
  systemMessageType?: string
  type: string
  metadata: Metadata2
  readState: ReadState2
  body?: string
  mentionDirected?: boolean
  lastEditedAt?: string
}

export interface Author2 {
  id: string
  firstName: string
  lastName: string
  registered: boolean
  slug: string
  role: string
}

export interface Metadata2 {}

export interface ReadState2 {}

export interface Subscriber {
  id: string
  enabled: boolean
}

export interface Comment {
  id: string
  author: Author3
  body: string
  answer?: boolean
  metadata: Metadata3
  createdAt: string
  publishedAt: string
  endorsed: boolean
  depth: number
  parent?: string
  votesCount?: number
  anonymous?: boolean
  endorsers?: Endorser[]
  voted?: boolean
  lastEditedAt?: string
}

export interface Author3 {
  id: string
  firstName: string
  lastName: string
  registered: boolean
  slug: string
  role: string
}

export interface Metadata3 {}

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

export interface PollOption {
  id: string
  option: string
  votes: number
  voters: string[]
}
