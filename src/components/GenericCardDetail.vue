<template>
  <ion-content>
    <div class="scroll-container ion-padding">
      <div
        class="card"
        v-for="(card, index) in group.cards"
        :key="index"
        :style="{
          left: index * 8 + 'px',
        }"
      >
        <card :card="card" mask="false"> </card>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent } from '@ionic/vue'
import Card from '../components/Card.vue'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

const props = defineProps<IProps>()
</script>

<style scoped>
.scroll-container {
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.scroll-container .card {
  position: relative;
  width: 100%;
  display: inline-block;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
