<template>
  <div class="top">
    <div class="headings">
      <h2 class="name">{{ plantInfo.name }}</h2>
      <h2 class="latinName">{{ plantInfo.latin }}</h2>
    </div>
    <div class="spans"></div>
  </div>
</template>
<script lang="ts">
import { IPlant } from '../../../types/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'plant-info-content-top',
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
.top {
  @include flex(row, center, space-between);
  .headings {
    .name {
      @include font(36px, 44px, 500);
    }
    .latinName {
      @include font(24px, 30px, 400);
      color: #000b;
    }
  }
}
.description {
  padding: 20px 0;
  @include font(16px, 20px, 500);
  text-align: justify;
}
</style>
