<template>
  <div
    class="card-item"
    v-for="(card, index) in props.group?.cards"
    :key="index"
    :style="{
      top: generateCardOffset(index),
    }"
  >
    <card :card="card"></card>
  </div>
</template>

<script lang="ts" setup>
import Card from '../components/Card.vue'

interface Props {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

const props = defineProps<Props>()

function generateCardOffset(index: number): string {
  return `${10 * index}px`
}
</script>

<style scoped>
:host {
  display: block;
  position: relative;
}

.card-item {
  position: absolute;
  width: 100%;
}
</style>
