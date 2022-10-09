<template>
  <div class="oneTechnology">
    <h3 class="step">{{ content.step }} {{ content.stepWord }}</h3>
    <div class="stepContainer">
      <base-image class="images" :image="content.image" alt="technology" title="Технология" />
      <p class="paragraph">{{ content.text }}</p>
    </div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { IOpenablePart } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'ClosedPost',
  props: {
    content: {
      type: Object as PropType<IOpenablePart>,
      required: true
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.oneTechnology {
  width: 100%;
  padding-bottom: 20px;

  &:last-child {
    padding-bottom: 0
  }
  .step {
    @include font(20px, 30px, 700);
  }
  .stepContainer {
    display: grid;
    grid-template-columns: 40% 1fr;
    grid-gap: 20px;
    .paragraph {
      text-align: justify;
      width: 100%;
      padding: 0;
      @include font(16px, 20px, 500);
    }
    .images {
      display: block;
      width: 100%;
      height: 350px;
    }
  }
}
@media (max-width: 1000px) {
  .oneTechnology {
    .stepContainer {
      grid-template-columns: 50% 1fr;
    }
  }
}
@media (max-width: 750px) {
  .oneTechnology {
    .stepContainer {
      grid-template-columns: 1fr;
    }
  }
}
</style>
