<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
:root,
:root[mode='md'],
:root[mode='ios'] {
  --ion-font-family: 'Roboto';
  font-family: var(--ion-font-family) !important;
}
</style>
