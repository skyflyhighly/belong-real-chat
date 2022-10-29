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
        <card :card="card" :mask="false" />
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, createAnimation } from '@ionic/vue'
import { onMounted } from '@vue/runtime-core'

import Card from '../components/Card.vue'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

onMounted(() => {
  const animation = createAnimation()
    .addElement(document.querySelector('.card'))
    .easing('ease-out')
    .duration(500)
    .keyframes([
      { offset: 0, opacity: '0', transform: 'scale(0)' },
      { offset: 1, opacity: '0.99', transform: 'scale(1)' },
    ])

  animation.play()
})

const props = defineProps<IProps>()

// const animation = createAnimation()
//   .addElement(document.querySelector('.card')!)
//   .easing('ease-out')
//   .duration(500)

// const enterAnimation = () => {
//   const wrapperAnimation = createAnimation()
//     .addElement(document.querySelector('.scroll-container')!)
//     .keyframes([
//       { offset: 0, opacity: '0', transform: 'scale(0)' },
//       { offset: 1, opacity: '0.99', transform: 'scale(1)' },
//     ])

//   return createAnimation()
//     .addElement(document.querySelector('.scroll-container')!)
//     .easing('ease-out')
//     .duration(500)
//     .addAnimation([wrapperAnimation])
// }

// const leaveAnimation = (baseEl: HTMLElement) => {
//   return enterAnimation(baseEl).direction('reverse')
// }
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
