<template>
  <div class="flex items-end mx-20 mb-20">
    <div>
      <ion-thumbnail class="mr-10">
        <ion-img :src="props.avatar" class="round-full"></ion-img>
      </ion-thumbnail>
    </div>
    <div class="message-panel w-70">
      <div v-if="props.img">
        <ion-img :src="props.img" class="round-5"></ion-img>
      </div>
      <div v-else></div>
      <p class="message w-70">
        {{ props.message }}
      </p>
      <p class="time">
        {{ props.time }}
      </p>
      <ion-img :src="Vector" alt="vector" class="vector" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonImg, IonThumbnail } from '@ionic/vue'
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Vector from '@/assets/Vector.svg'

const props = defineProps<{
  img?: string
  message?: string
  avatar?: string
  time?: string
}>()
</script>
