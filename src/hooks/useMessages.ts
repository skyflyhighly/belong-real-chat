import { useMessagesStore } from '../stores'
import { storeToRefs } from 'pinia'

export default function useMessages() {
  const messagesStore = useMessagesStore()
  const { messages } = storeToRefs(messagesStore)
  const { getAll, send } = messagesStore

  getAll()

  return {
    messages,
    messagesStore: {
      getAll,
      send,
    },
  }
}
