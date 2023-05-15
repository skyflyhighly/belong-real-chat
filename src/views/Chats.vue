<template>
  <ion-page>
    <ion-toolbar>
      <ion-title class="heading-1">Chats</ion-title>
    </ion-toolbar>

    <ion-content>
      <ion-list :inset="true">
        <RecycleScroller
          class="scroller"
          :items="rooms"
          :item-size="76"
          key-field="id"
        >
          <template #default="{ item }">
            <ion-item v-on:click="handleClick(item.id)">
              <ion-thumbnail class="mr-20">
                <ion-img :src="item.src" class="round-10"></ion-img>
              </ion-thumbnail>
              <ion-grid>
                <ion-row>
                  <ion-col size="8">
                    <ion-label class="room-title">{{ item.name }}</ion-label>
                  </ion-col>
                  <ion-col size="4" class="flex justify-end">
                    <ion-label class="time-text">{{ item.time }}</ion-label>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="8">
                    <ion-label class="room-message">{{
                      item.message
                    }}</ion-label>
                  </ion-col>
                  <ion-col size="4" class="flex justify-end">
                    <ion-badge v-if="item.unViewed > 0">{{
                      item.unViewed
                    }}</ion-badge>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
} from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { RecycleScroller } from 'vue3-virtual-scroller'

import useRooms from '../hooks/useRooms'
const { rooms } = useRooms()

const router = useRouter()

const handleClick = (id: number) => {
  router.push(`/chats/${id}`)
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
</style>
