
export interface Comment {
  id?: number,
  postId?: number,
  userId: number,
  content: string,
  user?: User
}

export interface Message {
  id: number,
  content: string,
  createdAt: string,
  senderId: number,
  receiverId: number,
  sender?: User,
  receiver?: User
}

export interface Post {
  id?: number,
  createdAt: string,
  animalTypeId: number,
  userId: number,
  content: string,
  user?: User,
  animalType?: AnimalType,
  comments?: Comment[],
}
export interface AnimalType {
  id: number,
  value: string
}
export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  blocked: boolean,
  admin: boolean,
  imageUrl?: string,
  posts?: Post[]
}

export interface LoginUser {
  email: string,
  password: string
}
export interface RegisterUser {
  firstName: string,
  lastName: string,
  email: string,
  imageUrl?: string,
  password: string
}

export interface Page<T> {
  content: T[],
  totalElements: number,
  size: number,
  page: number
}
export interface MonthlyStatistics {
  month: number,
  year: number,
  value: number
}

export interface HourlyStatistics {
  hour: number,
  value: number
}