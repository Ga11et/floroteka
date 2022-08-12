<template>
  <div class="openedTechnology">
    <div class="contentContainer" v-for="item in content" :key="item.text.slice(3, 10)">
      <h3 class="step">{{ item.step }} шаг</h3>
      <div class="stepContainer">
        <SuspenseImage class="images" :imageUrl="item.image" alt="technology" />
        <p class="paragraph">{{ item.text }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import SuspenseImage from '@/components/suspenseImage.vue'

export default Vue.extend({
  name: 'opened-technology',
  props: ['content'],
  components: { SuspenseImage }
})
</script>
<style lang='scss'>
@import '@/variables';
</style>
