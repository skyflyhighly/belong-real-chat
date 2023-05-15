import { defineStore } from 'pinia'

import { getUser } from '../Service/api'

import { UserType } from '../types'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {} as UserType,
  }),
  actions: {
    async getAll() {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.user)
      } else {
        this.user = getUser()
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    async update(item: UserType) {
      this.user = item
      localStorage.setItem('user', JSON.stringify(this.user))
    },
  },
})
