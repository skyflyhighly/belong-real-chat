import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import { getMessages, sendMessage } from '../service/api'

import { MessageType } from '../types'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<MessageType[]>([])

  function getAll() {
    if (!localStorage.getItem('messages')) {
      messages.value = getMessages()
      localStorage.setItem('messages', JSON.stringify(messages.value))
    } else {
      messages.value = JSON.parse(localStorage.messages.value)
    }
  }

  function send(item: MessageType) {
    messages.value = [...messages.value, item]
    localStorage.setItem('messages', JSON.stringify(messages.value))
  }

  return { messages, getAll, send }
})
