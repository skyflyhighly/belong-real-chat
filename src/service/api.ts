import User from '../mock/User.json'
import Rooms from '../mock/Rooms.json'
import Messages from '../mock/Messages.json'

import { MessageType } from '../types'

const getUser = () => {
  return User.user
}

const getRooms = () => {
  return Rooms.rooms
}

const getMessages = () => {
  return Messages.messages
}

const sendMessage = (item: MessageType) => {
  Messages.messages.push(item)
}

export { getUser, getRooms, getMessages, sendMessage }
