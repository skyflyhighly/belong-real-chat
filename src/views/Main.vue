<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides
        :pager="true"
        :options="options"
        @ionSlideWillChange="slideWillChange"
        @ionSlideDidChange="slideDidChange"
        @swiper="setSwiperInstance"
      >
        <ion-slide
          ><div class="w-70">
            <img :src="IllustrationSlide" alt="illustration-slide" />
            <p class="text-center heading-2">
              Connect easily with your family and friends over countries
            </p>
          </div></ion-slide
        >
        <ion-slide
          ><div class="w-70">
            <img :src="IllustrationSlide" alt="illustration-slide" />
            <p class="text-center heading-2">
              Connect easily with your family and friends over countries
            </p>
          </div></ion-slide
        >
        <ion-slide
          ><div class="w-70">
            <img :src="IllustrationSlide" alt="illustration-slide" />
            <p class="text-center heading-2">
              Connect easily with your family and friends over countries
            </p>
          </div></ion-slide
        >
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { Autoplay, Keyboard, Pagination, Zoom } from 'swiper'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
} from '@ionic/vue'
import { ref } from 'vue'

import IllustrationSlide from '@/assets/Illustration.svg'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/zoom'
import '@ionic/vue/css/ionic-swiper.css'
import { SwiperModule } from 'swiper/types'

const slides = ref()
const options = ref({
  keyboard: true,
})
const setSwiperInstance = (swiper: any) => {
  slides.value = swiper
}

const slideWillChange = () => {
  console.log('Slide will change')
}

const slideDidChange = async () => {
  console.log('Slide did change')

  if (!slides.value) return
  console.table({
    isBeginning: await slides.value.isBeginning(),
    isEnd: await slides.value.isEnd(),
  })
}

const modules = ref<SwiperModule[]>([
  Autoplay,
  Keyboard,
  Pagination,
  Zoom,
  IonSlides,
])
</script>

<style scoped>
ion-slides {
  height: 100%;

  --bullet-background: rgb(var(--ion-color-primary-rgb), 0.5);
  --bullet-background-active: var(--ion-color-primary);
}
</style>
