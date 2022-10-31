<template>
  <div
    class="card-group"
    v-for="(card, index) in props.group?.cards"
    :key="index"
    :style="{
      top: generateCardOffset(index),
    }"
    @click="showDetail()"
  >
    <card :card="card" :mask="true"></card>
  </div>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, useIonRouter, createAnimation } from '@ionic/vue'

import Card from '../components/Card.vue'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

const router = useIonRouter()

const props = defineProps<IProps>()

function generateCardOffset(index: number): string {
  return `${10 * index}px`
}

const customAnimationBuilder = (baseEl?: Element, opts?: object) => {
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

function showDetail() {
  router.push(`/cards/${props.group.type}`, customAnimationBuilder)
}
</script>

<style scoped>
:host {
  display: block;
  position: relative;
}

.card-group {
  position: absolute;
  width: 100%;
}
</style>
