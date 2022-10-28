<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-button class="done" @click="goBack()">Done</ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-icon
            name="ellipsis-horizontal-circle-sharp"
            class="more"
          ></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <transaction-card-detail
      v-if="isTransactionCard()"
      :group="selectedCardGroup[0]"
    />
    <generic-card-detail v-else :group="selectedCardGroup[0]" />
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonButtons,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonIcon,
} from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router'

import GenericCardDetail from '../components/GenericCardDetail.vue'
import TransactionCardDetail from '../components/TransactionCardDetail.vue'
import { cardGroups } from '../constants'

interface ICardGroup {
  cards: {
    type: string
  }[]
  type: string
}

const router = useRouter()
const route = useRoute()

function goBack() {
  router.push('/home')
}

const selectedCardGroup: ICardGroup[] = cardGroups.filter(
  (cardGroup, index) => cardGroup.type === route.params.id
)

const isTransactionCard = () =>
  selectedCardGroup[0].type === 'debit' ||
  selectedCardGroup[0].type === 'apple-cash'
</script>

<style scoped>
ion-header ion-toolbar {
  --border-width: 0px;
  --background: black;
}

ion-header .done {
  font-weight: 600;
  --color: white;
  --opacity: 1;
}

ion-header .more {
  font-size: 28px;
}
</style>
