<template>
  <ion-page>
    <ion-tabs
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="main" href="/main">
          <ion-icon :icon="homeOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="chats" href="/chats">
          <ion-icon :icon="chatbubbleOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/profile">
          <ion-icon :icon="personOutline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from '@ionic/vue'
import { homeOutline, chatbubbleOutline, personOutline } from 'ionicons/icons'

const beforeTabChange = () => {
  // do something before tab change
}
const afterTabChange = () => {
  // do something after tab change
}
</script>
