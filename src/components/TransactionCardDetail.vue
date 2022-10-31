<template>
  <ion-content id="transaction-card-detail" class="ion-padding">
    <div class="card-wrapper">
      <card :card="getCard()" :mask="false" @click="goBack()"></card>
    </div>

    <div class="transactions-list">
      <ion-list-header>
        <ion-label>Latest Transactions</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item v-for="(transaction, index) in transactions" :key="index">
          <div class="float-left transaction-info">
            <div class="vendor">{{ transaction.vendor }}</div>
            <div class="location" v-if="transaction.location">
              {{ transaction.location }}
            </div>
            <div class="date">{{ transaction.date }}</div>
          </div>

          <div class="float-right transaction-detail">
            <div class="price">{{ transaction.price }}</div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>

          <div class="float-clear"></div>
        </ion-item>
      </ion-list>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonIcon,
  IonItem,
  IonContent,
  IonList,
  IonListHeader,
  IonButtons,
  IonButton,
  IonLabel,
  useIonRouter,
  createAnimation,
} from '@ionic/vue'

import Card from './Card.vue'
import { transactions } from '../constants'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

const props = defineProps<IProps>()
const router = useIonRouter()

function getCard() {
  return props.group.cards[0]
}

const customAnimationBuilder = (baseEl: Element, opts?: object) => {
  const customAnimation = createAnimation()
    .addElement(baseEl as Element)
    .easing('ease-out')
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '0.5' },
      { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
      { offset: 1, transform: 'scale(1)', opacity: '0.5' },
    ])

  return customAnimation
}

function goBack() {
  router.push('/home', customAnimationBuilder)
}
</script>

<style scoped>
ion-header ion-toolbar {
  --border-width: 0px;
  --background: black;
}

ion-content {
  --padding-bottom: 20px;
}

ion-list-header,
ion-list {
  padding: 0;
  margin: 0 !important;
}

ion-list-header {
  font-size: 22px;
  color: white;
}

ion-list {
  border-radius: 10px !important;
}

ion-item {
  --padding-start: 12px;
  --padding-top: 6px;
  --padding-bottom: 10px;
}

ion-item .transaction-info {
  width: 100%;
}

ion-item .vendor {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

ion-item .location,
ion-item .date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 20px;
}

ion-item .transaction-detail {
  align-items: center;
  display: flex;
  margin-top: -36px;
}

ion-item .transaction-detail .price {
  font-size: 16px;
}

ion-item .transaction-detail ion-icon {
  color: rgba(255, 255, 255, 0.3);
  margin-left: 8px;
  font-size: 20px;
}
</style>
