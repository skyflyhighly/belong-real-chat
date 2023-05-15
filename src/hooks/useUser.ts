import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores'

export default function useMessages() {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  userStore.getAll()

  return {
    user,
    userStore,
  }
}
