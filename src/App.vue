<template>
  <starport-carrier>
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </starport-carrier>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { StarportCarrier } from 'vue-starport'
</script>
