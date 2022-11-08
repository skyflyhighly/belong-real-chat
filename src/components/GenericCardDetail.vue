<template>
  <ion-content id="generic-card-detail">
    <div class="scroll-container ion-padding">
      <div
        class="card-wrapper"
        v-for="(card, index) in props.group.cards"
        :key="index"
        :style="{
          left: index * 8 + 'px',
        }"
      >
        <card :id="card.type" :card="card" :mask="false" />
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent } from '@ionic/vue'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/zoom'
import '@ionic/vue/css/ionic-swiper.css'

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

.scroll-container .card-wrapper {
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
