export interface User {
  _id: string
  firstName: string
  lastName: string
  avatar: string
  age: string
  profession: string
  userName: string
  password: string
  feeds: any
  inbox: Message[]
  outbox: OutboxMessage[]
  notifications: Notification[]
}

export interface Message {
  messageContent: string
  messageFrom: string
  messageSeen: boolean
  messageDate: Date
  _id: string
}

export interface OutboxMessage {
  messageContent: string
  messageTo: string
  messageDate: Date
  _id: string
}

export interface FeedType {
  feedContent: string
  feedDate: Date
  feedLikes: string[]
  private: boolean
  _id: string
}

export interface Notification {
  actionTarget: string
  actionTargetPerson: string
  actionDate: Date
  actionSeen: boolean
  _id: string
}
