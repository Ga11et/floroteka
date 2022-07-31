<template>
  <div class="contentContainer">
    <h3 class="step">1 шаг</h3>
    <div class="stepContainer">
      <SuspenseImage class="images" :imageUrl="content ? content.image : ''" alt="technology" />
      <p class="paragraph">{{ content ? content.text : '' }}</p>
    </div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import SuspenseImage from '@/components/suspenseImage.vue'

export default Vue.extend({
  name: 'closed-technology',
  props: ['content'],
  components: { SuspenseImage }
})
</script>
<style lang='scss'>
@import '@/variables';
</style>
