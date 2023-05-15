<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button @click="showModal">
          <ion-icon :icon="createOutline" size="large"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title class="heading-1">My Profile</ion-title>
    </ion-toolbar>

    <ion-content>
      <ion-grid>
        <ion-row class="my-35">
          <ion-col size="4" class="flex justify-end">
            <ion-thumbnail>
              <ion-img :src="user.src" class="profile-img"></ion-img>
            </ion-thumbnail>
          </ion-col>
          <ion-col size="7" offset="1">
            <div class="heading text-start">{{ user.name }}</div>
            <div class="id-text text-start">{{ user.id }}</div>
          </ion-col>
        </ion-row>
        <div class="flex column justify-center items-center">
          <div class="profile-info">
            <ion-label>
              <p class="profile-text">{{ user.age }} year</p>
            </ion-label>
          </div>
          <div class="flex mt-20 profile-info">
            <ion-icon :icon="earthOutline"></ion-icon>
            <ion-label class="ml-20">
              <p class="profile-text">{{ user.country }}</p>
            </ion-label>
          </div>
          <div class="flex mt-20 profile-info">
            <ion-icon :icon="briefcaseOutline"></ion-icon>
            <ion-label class="ml-20">
              <p class="profile-text">{{ user.website }}</p>
            </ion-label>
          </div>
        </div>
      </ion-grid>
      <ion-modal :is-open="isModalOpen">
        <ion-content class="ion-padding">
          <Form @submit="handleEdit" :initialValues="formData">
            <ion-item>
              <ion-buttons slot="start">
                <ion-button @click="cancel">Cancel</ion-button>
              </ion-buttons>
              <ion-title>Edit Profile</ion-title>
              <ion-buttons slot="end">
                <ion-button type="submit">Edit</ion-button>
              </ion-buttons>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Enter your name</ion-label>
              <Field name="userName" v-slot="{ field }" :rules="isRequired">
                <ion-input
                  v-bind="field"
                  type="text"
                  placeholder="Your name"
                  name="userName"
                ></ion-input>
                <ErrorMessage
                  as="div"
                  name="userName"
                  v-slot="{ message }"
                  class="error"
                >
                  <div v-if="message">{{ `Name ${message}` }}</div>
                </ErrorMessage>
              </Field>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Enter your age</ion-label>
              <Field name="userAge" v-slot="{ field }" :rules="fieldSchema">
                <ion-input
                  v-bind="field"
                  type="number"
                  placeholder="Your age"
                  name="userAge"
                ></ion-input>
                <ErrorMessage
                  as="div"
                  name="userAge"
                  v-slot="{ message }"
                  class="error"
                >
                  <div v-if="message">{{ `Age ${message}` }}</div>
                </ErrorMessage>
              </Field>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Enter your location</ion-label>
              <Field
                name="userLocation"
                v-slot="{ field }"
                :rules="fieldSchema"
              >
                <ion-input
                  v-bind="field"
                  type="text"
                  placeholder="Your Location"
                  name="userLocation"
                ></ion-input>
                <ErrorMessage
                  as="div"
                  name="userLocation"
                  v-slot="{ message }"
                  class="error"
                >
                  <div v-if="message">
                    {{ `Location ${message}` }}
                  </div>
                </ErrorMessage>
              </Field>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Enter your website</ion-label>
              <Field name="userWebsite" v-slot="{ field }" :rules="fieldSchema">
                <ion-input
                  v-bind="field"
                  type="text"
                  placeholder="Your Website"
                  name="userWebsite"
                ></ion-input>
                <ErrorMessage
                  as="div"
                  name="userWebsite"
                  v-slot="{ message }"
                  class="error"
                >
                  <div v-if="message">
                    {{ `userWebsite ${message}` }}
                  </div>
                </ErrorMessage>
              </Field>
            </ion-item>
          </Form>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonThumbnail,
  IonHeader,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
  IonModal,
} from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { createOutline, earthOutline, briefcaseOutline } from 'ionicons/icons'
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import { toFieldValidator } from '@vee-validate/zod'
import * as zod from 'zod'

import useUser from '../hooks/useUser.js'

const REQUIRED_MSG = 'should not be empty'

const fieldSchema = toFieldValidator(zod.string().nonempty(REQUIRED_MSG))

const isModalOpen = ref<boolean>(false)
const { user, userStore } = useUser()

interface NewUserType {
  userId: number
  userName: string
  userAge: number
  userSrc: string
  userLocation: string
  userWebsite: string
}

const formData = reactive<NewUserType>({
  userId: user.value.id,
  userName: user.value.name,
  userAge: user.value.age,
  userSrc: user.value.src,
  userLocation: user.value.country,
  userWebsite: user.value.website,
})

const showModal = () => {
  console.log('user: ', user)
  isModalOpen.value = true
}

const cancel = () => {
  isModalOpen.value = false
}

const handleEdit = (values: NewUserType) => {
  console.log('item: ', values)
  const item = {
    id: values.userId,
    name: values.userName,
    age: values.userAge,
    src: values.userSrc,
    country: values.userLocation,
    website: values.userWebsite,
  }
  userStore.update(item)
  Object.assign(formData, item)
  isModalOpen.value = false
}

const isRequired = (value: string) => {
  if (!value) {
    return 'is a required field'
  }
  return true
}
</script>

<style scoped>
ion-badge {
  border-radius: 100%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-md.list-inset ion-item:first-child {
  --border-width: 0 !important;
}
</style>

<style scoped>
ion-icon {
  font-size: 20px;
}
.error {
  color: red;
}
</style>
