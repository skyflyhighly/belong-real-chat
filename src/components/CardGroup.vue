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
import { useRouter } from 'vue-router'

import Card from '../components/Card.vue'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

const router = useRouter()

const props = defineProps<IProps>()

function generateCardOffset(index: number): string {
  return `${10 * index}px`
}

function showDetail() {
  router.push(`/cards/${props.group.type}`)
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
