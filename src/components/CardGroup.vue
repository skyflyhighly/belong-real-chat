<template>
  <div
    class="card-wrapper"
    v-for="(card, index) in group?.cards"
    :key="index"
    :style="{
      top: `${gap * index}px`,
    }"
    @click="showDetail"
  >
    <card :card="card" :id="`card-${card.type}`" :mask="true"></card>
  </div>
</template>

<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue'

import {
  createGenericEnterAnimation,
  createTransactionEnterAnimation,
} from '../animations/enter'

import Card from '../components/Card.vue'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
  gap: number
}

const router = useIonRouter()

const props = defineProps<IProps>()
const { group, gap } = props

const isTransactionCard = () =>
  props.group.type === 'debit' || props.group.type === 'apple-cash'

const createEnterAnimation = isTransactionCard()
  ? createTransactionEnterAnimation
  : createGenericEnterAnimation

const presentingEl = document.querySelector('#app-home') as HTMLElement

const showDetail = (e: MouseEvent) => {
  router.push(`/cards/${props.group.type}`, (baseEl, opts) =>
    createEnterAnimation(baseEl, opts, presentingEl, e.target)
  )
}
</script>

<style scoped>
:host {
  display: block;
  position: relative;
}

.card-wrapper {
  position: absolute;
  width: 100%;
}
</style>
