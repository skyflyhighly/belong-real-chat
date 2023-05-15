import { storeToRefs } from 'pinia'
import { useRoomsStore } from '../stores'

export default function useRooms() {
  const roomsStore = useRoomsStore()
  const { rooms } = storeToRefs(roomsStore)

  roomsStore.getAll()

  return {
    rooms,
    roomsStore,
  }
}
