<template>
  <ion-page>
    <ion-toolbar class="mb-20 round-10">
      <div class="flex m-20">
        <div class="flex items-center mr-20" v-on:click="router.push('/chats')">
          <ion-icon :icon="arrowBack" size="large" class="primary"></ion-icon>
        </div>
        <div>
          <ion-thumbnail class="mr-10">
            <ion-img
              :src="rooms[parseInt(roomId[0])].src"
              class="round-10"
            ></ion-img>
          </ion-thumbnail>
        </div>
        <div>
          <ion-label>
            <h2 class="room-title">{{ rooms[parseInt(roomId[0])].name }}</h2>
            <p>
              Last Message at
              {{
                items[items.length - 1]
                  ? items[items.length - 1].time
                  : rooms[parseInt(roomId[0])].time
              }}
            </p>
          </ion-label>
        </div>
      </div>
    </ion-toolbar>
    <div class="shade"></div>

    <ion-content>
      <div ref="chat">
        <div v-for="message in items" :key="message.id">
          <Message
            v-if="message.userId !== user.id"
            :img="message.img"
            :message="message.message"
            :avatar="message.avatar"
            :time="message.time"
          ></Message>
          <MessageSelf
            v-if="message.userId === user.id"
            :img="message.img"
            :message="message.message"
            :avatar="message.avatar"
            :time="message.time"
          ></MessageSelf>
        </div>
        <div class="h-100"></div>
      </div>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        threshold="10px"
        id="infinite-scroll"
        position="top"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading messages..."
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
    <div class="send-message"></div>
    <ion-item class="mt-20">
      <ion-input
        placeholder="Type your message..."
        v-model="text"
        @keyup.enter="handleSendMessage"
      >
      </ion-input>
      <div v-on:click="handleSendMessage" className="text-dark-gray send-icon">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4167 1.58334L11.875 17.4167L8.70833 10.2917L1.58333 7.12501L17.4167 1.58334Z"
            stroke="#5B687B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </ion-item>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonIcon,
  IonInput,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonItem,
} from '@ionic/vue'
import { ref, onMounted, onUpdated } from 'vue'
import { arrowBack, sendOutline } from 'ionicons/icons'
import { useRouter, useRoute } from 'vue-router'
import { MessageType } from '../../types'

import Message from '@/components/message/Message.vue'
import MessageSelf from '@/components/message/MessageSelf.vue'

import useMessages from '../../hooks/useMessages.js'
import useRooms from '../../hooks/useRooms.js'
import useUser from '../../hooks/useUser.js'

import SendIcon from '../../assets/SendIcon.svg'

const text = ref<string>('')
const sectionMessageCount = 20
const currentColor = ref<string>('')

const router = useRouter()
const route = useRoute()

const { messages, messagesStore } = useMessages()
const { rooms } = useRooms()
const { user } = useUser()

const roomId = route.params.id
const roomMessages = ref<MessageType[]>([])

const isDisabled = ref(false)
const items = ref<MessageType[]>([])
const chat = ref<HTMLElement | null>(null)

onMounted(() => {
  for (let i = 0; i < messages.value.length; i++) {
    if (messages.value[i].roomId == parseInt(roomId[0])) {
      roomMessages.value.push(messages.value[i])
    }
  }
  pushData()
  console.log('items: ', localStorage.messages)
})

const pushData = () => {
  const max = roomMessages.value.length - items.value.length
  const min =
    roomMessages.value.length - items.value.length > sectionMessageCount
      ? roomMessages.value.length - items.value.length - sectionMessageCount
      : 0
  for (let i = max - 1; i >= min; i--) {
    items.value.unshift(roomMessages.value[i])
  }
}

const loadData = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => {
    pushData()
    ev.target.complete()
    if (items.value.length >= roomMessages.value.length) {
      ev.target.disabled = true
    }
  }, 500)
}

const handleSendMessage = () => {
  const item = {
    id: 12,
    userId: user.value.id,
    img: '',
    avatar: user.value.src,
    message: '',
    time:
      new Date().getUTCHours().toString() +
      ':' +
      new Date().getUTCMinutes().toString(),
    roomId: parseInt(roomId[0]),
  }
  if (text.value.length > 0) {
    item.message = text.value
    messagesStore.send(item)
    items.value.push(item)
    text.value = ''
    if (chat.value) {
      chat.value.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }
  return
}
</script>

<style scoped>
ion-badge {
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-md.list-inset ion-item:first-child {
  --border-width: 0 !important;
}

.scroller {
  height: 100%;
}

.send-message {
  transition: fill 0.4s ease;
}

.send-icon:hover {
  color: #06152b;
}
</style>
