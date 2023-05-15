export interface RoomType {
  id: number
  name: string
  src: string
  message: string
  time: string
  unViewed: number
}

export interface MessageType {
  id: number
  userId: number
  img: string
  avatar: string
  message: string
  time: string
  roomId: number
}

export interface UserType {
  id: number
  name: string
  age: number
  src: string
  country: string
  website: string
}
