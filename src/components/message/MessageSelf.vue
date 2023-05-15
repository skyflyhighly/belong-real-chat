<template>
  <div class="flex row-reverse items-end mx-20 mb-20">
    <div>
      <ion-thumbnail class="ml-10">
        <ion-img :src="props.avatar" class="round-full"></ion-img>
      </ion-thumbnail>
    </div>
    <div class="message-panel-myself max-w-70 min-w-50">
      <div v-if="props.img">
        <ion-img :src="props.img" class="round-5"></ion-img>
      </div>
      <div v-else></div>
      <p class="message myself w-70">
        {{ props.message }}
      </p>
      <p class="time-myself">
        {{ props.time }}
      </p>
      <ion-img :src="VectorBack" alt="vector" class="vector-myself" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonImg, IonThumbnail } from '@ionic/vue'
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import VectorBack from '@/assets/VectorBack.svg'

const props = defineProps<{
  img?: string
  message?: string
  avatar?: string
  time?: string
}>()
</script>
