<template>
  <ion-content id="generic-card-detail" class="relative">
    <div class="scroll-container ion-padding fade-up-generic">
      <swiper
        :modules="modules"
        :autoplay="true"
        :keyboard="true"
        :pagination="true"
        :scrollbar="true"
        :zoom="true"
        class="card"
      >
        <swiper-slide
          v-for="(card, index) in group.cards"
          :key="index"
          :style="{
            left: index * 8 + 'px',
          }"
        >
          <card :card="card" :mask="false" />
        </swiper-slide>
      </swiper>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IonContent } from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper'

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

const modules = ref([Autoplay, Keyboard, Pagination, Scrollbar, Zoom])

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

.fade-up-generic {
  position: absolute;
  top: 10px;
  width: 100%;
  animation: fadeUpGeneric 1s;
}

@keyframes fadeUpGeneric {
  from {
    opacity: 0;
    top: 150px;
  }
  to {
    opacity: 1;
    top: 10px;
  }
}
</style>
