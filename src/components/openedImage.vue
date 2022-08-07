<template>
  <div class="openedImageContainer" @click.self="$root.$emit('closeImage')">
    <img class="openedImage" :src="imageUrl" :alt="alt" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'opened-image',
  props: ['imageUrl', 'alt']
})
</script>
<style lang='scss'>
@import '@/variables';
.openedImageContainer{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $mainBackDarkGreen;
  z-index: 99;
  @include flex(row, center, center);
  .openedImage{
    max-width: 80%;
    max-height: 80%;
  }
}
</style>
