import { defineStore } from 'pinia'

import { getRooms } from '../Service/api'

export const useRoomsStore = defineStore({
  id: 'rooms',
  state: () => ({
    rooms: [
      {
        id: 0,
        name: 'Minsk',
        src: 'https://i.pravatar.cc/300?img=1',
        message: 'Bob says Hi',
        time: '13:02',
        unViewed: 2,
      },
    ],
  }),
  actions: {
    async getAll() {
      this.rooms = getRooms()
    },
  },
})
