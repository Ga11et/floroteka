<template>
  <p class="description">
    {{ plantInfo.description }}
  </p>
</template>
<script lang="ts">
import { IPlant } from '../../../types/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'plant-info-content-description',
  props: {
    plantInfo: {
      type: Object as PropType<IPlant>,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.description {
  padding: 20px 0;
  @include font(16px, 20px, 500);
  text-align: justify;
}
</style>
