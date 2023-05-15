<template>
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      class="send-message"
      :fill="isSendMessageHover ? '#0C5EDA' : '#5B687B'"
      @mouseover="isSendMessageHover = true"
      @mouseout="isSendMessageHover = false"
    >
      <path
        d="M17.4167 1.58334L11.875 17.4167L8.70833 10.2917L1.58333 7.12501L17.4167 1.58334Z"
        stroke="#5B687B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  currentColor: String,
})

const isSendMessageHover = ref<Boolean>(!!props.currentColor)
</script>
