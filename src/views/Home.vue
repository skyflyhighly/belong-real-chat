<template>
  <ion-content class="ion-padding">
    <div class="header">
      <ion-title size="large" class="float-left">Wallet</ion-title>

      <!-- This is a placeholder element to help with the transition -->
      <ion-button class="modal-close float-left" fill="clear">Done</ion-button>

      <ion-icon
        name="add-circle"
        slot="icon-only"
        class="float-right add-to-wallet trans"
      >
      </ion-icon>

      <!-- This is a placeholder element to help with the transition -->
      <ion-icon
        name="ellipsis-horizontal-circle-sharp"
        class="modal-more float-right"
      ></ion-icon>

      <div class="float-clear"></div>
    </div>

    <div class="card-groups">
      <div
        class="card-group trans-slow ion-activatable"
        v-for="(cardGroup, index) in cardGroups"
        :key="index"
        :style="{
          top: generateCardOffset(cardGroup, index),
        }"
      >
        <card-group :group="cardGroup"> </card-group>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonButton,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'

import CardGroup from '../components/CardGroup.vue'

interface ICardGroup {
  cards: {
    type: string
  }[]
  type: string
}

const cardGroups = [
  {
    type: 'apple-cash',
    cards: [{ type: 'apple-cash' }],
  },
  {
    type: 'debit',
    cards: [{ type: 'debit' }],
  },
  {
    type: 'pass',
    cards: [{ type: 'pass' }, { type: 'pass' }],
  },
  {
    type: 'generic',
    cards: [{ type: 'generic' }, { type: 'generic' }, { type: 'generic' }],
  },
]

function generateCardOffset(cardGroup: ICardGroup, index: number) {
  const isDebitOrCash =
    cardGroup.type === 'apple-cash' || cardGroup.type === 'debit'
  const offset = isDebitOrCash ? 0 : 230

  return `${45 * index + offset}px`
}
</script>

<style scoped>
ion-content {
  --padding-top: calc(50px + var(--ion-safe-area-top));
}

.header {
  position: relative;
}

.header .modal-close {
  pointer-events: none;
  position: absolute;
  left: 0;
  transform-origin: top left;
  opacity: 0;
  font-weight: 600;
  margin: 0;
  --color: white;
}

.header .modal-more {
  pointer-events: none;
  position: absolute;
  right: 0;
  transform-origin: top right;
  opacity: 0;
  font-size: 28px;
  margin: 0;
}

ion-title {
  position: relative;
  height: auto;
  padding: 0;
  width: 150px;
  min-width: auto;
  transform-origin: top left;
}

.add-to-wallet {
  font-size: 32px;
  margin: 8px 0;
  transform-origin: top right;
}

.add-to-wallet:active {
  opacity: 0.7;
}

.card-groups,
.pass-groups {
  position: relative;
  margin-top: 10px;
  z-index: 1;
}

.card-group {
  width: 100%;
  transform-origin: top;
  position: relative;
  display: block;
}
</style>
