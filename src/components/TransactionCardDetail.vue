<template>
  <ion-content id="transaction-card-detail" class="ion-padding relative">
    <div class="card-wrapper">
      <card
        :card="getCard()"
        :mask="false"
        @click="goBack"
        :id="getCard().type"
      ></card>
    </div>

    <div class="transactions-list">
      <ion-list-header>
        <ion-label>Latest Transactions</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item
          class="bg-transaction"
          v-for="(transaction, index) in transactions"
          :key="index"
        >
          <div class="float-left transaction-info">
            <div class="vendor">{{ transaction.vendor }}</div>
            <div class="location" v-if="transaction.location">
              {{ transaction.location }}
            </div>
            <div class="date">{{ transaction.date }}</div>
          </div>

          <div class="float-right transaction-detail">
            <div class="price">{{ transaction.price }}</div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>

          <div class="float-clear"></div>
        </ion-item>
      </ion-list>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import {
  IonIcon,
  IonItem,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  useIonRouter,
} from '@ionic/vue'

import Card from './Card.vue'
import { cardGroups, transactions } from '../constants'
import { useRoute } from 'vue-router'
import {
  createGenericLeaveAnimation,
  createTransactionLeaveAnimation,
} from '../animations/leave'

interface IProps {
  group: {
    type: string
    cards: {
      type: string
    }[]
  }
}

interface ICardGroup {
  cards: {
    type: string
  }[]
  type: string
}

const props = defineProps<IProps>()
const router = useIonRouter()
const route = useRoute()

function getCard() {
  return props.group.cards[0]
}

const selectedCardGroup: ICardGroup[] = cardGroups.filter(
  (cardGroup, index) => cardGroup.type === route.params.id
)

const isTransactionCard = () =>
  selectedCardGroup[0].type === 'debit' ||
  selectedCardGroup[0].type === 'apple-cash'

const createLeaveAnimation = isTransactionCard()
  ? createTransactionLeaveAnimation
  : createGenericLeaveAnimation

const presentingEl = document.querySelector('#app-home') as HTMLElement
function goBack() {
  router.push('/home', (baseEl, opts) =>
    createLeaveAnimation(
      baseEl,
      opts,
      presentingEl,
      baseEl.querySelector(`#${selectedCardGroup[0].type} .card`) as HTMLElement
    )
  )
}
</script>

<style scoped>
ion-header ion-toolbar {
  --border-width: 0px;
  --background: black;
}

ion-content {
  --padding-bottom: 20px;
}

ion-list-header,
ion-list {
  padding: 0;
  margin: 0 !important;
}

ion-list-header {
  font-size: 22px;
  color: white;
}

ion-list {
  border-radius: 10px !important;
}

ion-item {
  --padding-start: 12px;
  --padding-top: 6px;
}

ion-item .transaction-info {
  width: 100%;
  padding-bottom: 10px;
  padding-left: 10px;
}

ion-item .vendor {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

ion-item .location,
ion-item .date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 20px;
}

ion-item .transaction-detail {
  align-items: center;
  display: flex;
  margin-top: -36px;
}

ion-item .transaction-detail .price {
  font-size: 16px;
}

ion-item .transaction-detail ion-icon {
  color: rgba(255, 255, 255, 0.3);
  margin-left: 8px;
  font-size: 20px;
}

.bg-transaction::part(native) {
  background-color: #1a1a1a;
  padding-left: 0px;
}

.transactions-list {
  position: absolute;
  width: calc(100% - 32px);
  top: 270px;
}
</style>
