<template>
  <div class="item">
    <h3 class="heading">{{ heading }}:</h3>
    <p class="text">{{ text }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'plant-info-content-description',
  props: {
    heading: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.item {
  @include flex(row, flex-start, flex-start);
  padding-bottom: 20px;
  .heading {
    @include font(24px, 30px, 500);
    padding-right: 20px;
  }
  .text {
    @include font(24px, 30px, 400);
  }
}
</style>
