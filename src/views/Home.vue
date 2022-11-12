<template>
  <ion-page id="app-home">
    <ion-content class="ion-padding" ref="demo" v-wheel="wheelHandler">
      <div class="header">
        <ion-title size="large" class="float-left">Wallet</ion-title>
        <ion-button
          class="transform-top-left text-white pointer-events-none absolute left-0 opacity-0 font-semibold m-0 float-left"
          fill="clear"
          >Done</ion-button
        >

        <ion-icon
          name="add-circle"
          slot="icon-only"
          class="float-right add-to-wallet trans text-[32px] my-2 mx-0"
        >
        </ion-icon>
        <ion-icon
          name="ellipsis-horizontal-circle-sharp"
          class="pointer-events-none absolute right-0 transform-top-left opacity-0 text-[28px] m-0 float-right"
        ></ion-icon>
        <div class="float-clear"></div>
      </div>

      <div class="card-groups relative mt-[10px]">
        <div
          class="card-group w-full relative block trans-slow"
          v-for="(cardGroup, index) in cardGroups"
          :key="index"
          :style="{
            top: generateCardOffset(cardGroup, index),
          }"
        >
          <card-group :gap="gap" :group="cardGroup" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  IonContent,
  IonButton,
  IonPage,
  IonTitle,
  IonIcon,
  createAnimation,
} from '@ionic/vue'

import CardGroup from '../components/CardGroup.vue'

import { cardGroups } from '../constants'

interface ICardGroup {
  cards: {
    type: string
  }[]
  type: string
}

function generateCardOffset(cardGroup: ICardGroup, index: number) {
  const isDebitOrCash =
    cardGroup.type === 'apple-cash' || cardGroup.type === 'debit'
  const offset = isDebitOrCash ? 0 : 230

  return `${(space.value + gap.value) * index + offset}px`
}

const demo = ref()
const space = ref(35)
const gap = ref(10)
const isWheeling = ref(false)
const prevY = ref<null | number>(0)
const timer = ref<NodeJS.Timer | null>(null)
const step = ref(0.5)

type wheelHandlerProps = {
  movement: [x: number, y: number]
  wheeling: any
}

const wheelHandler = ({ movement: [x, y], wheeling }: wheelHandlerProps) => {
  isWheeling.value = wheeling

  if (isWheeling.value) {
    if (timer.value) {
      clearInterval(timer.value)
      step.value = 0.2
    }
    if (prevY.value !== null) {
      const delta = (y - prevY.value) / 15.0
      gap.value = Math.max(7, Math.min(50, gap.value + delta))
    }
    prevY.value = y
  } else {
    timer.value = setInterval(() => {
      if (gap.value === 10) {
        clearInterval(timer.value as NodeJS.Timer)
        step.value = 0.2
      } else {
        if (gap.value > 10) {
          gap.value = Math.max(gap.value - step.value, 10)
        } else if (gap.value < 10) {
          gap.value = Math.min(gap.value + step.value, 10)
        }
        step.value += 0.2
      }
    }, 10)
    prevY.value = null
  }
}
</script>

<style scoped>
ion-content {
  --padding-top: calc(50px + var(--ion-safe-area-top));
}

.header {
  position: relative;
}

.header .transform-top-left {
  transform-origin: top left;
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
  transform-origin: top right;
}

.add-to-wallet:active {
  opacity: 0.7;
}

.card-groups {
  z-index: 1;
}

.card-group {
  transform-origin: top;
}
</style>
