<template>
  <div class="openedImageContainer" @click.self="$root.$emit('closeImage')">
    <div class="openedImageContent" @click.self="$root.$emit('closeImage')">
      <h4 class="heading">{{ title }}</h4>
      <img class="openedImage" :src="imageUrl" :alt="alt" />
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'opened-image',
  props: ['imageUrl', 'alt', 'title']
})
</script>
<style lang='scss' scoped>
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
  .openedImageContent{
    position: relative;
    display: flex;
    flex-direction: column;
    .openedImage{
      display: block;
      align-self: center;
      max-width: 90%;
      max-height: 90vh;
    }
    .heading{
      position: absolute;
      bottom: 20px;
      align-self: center;
      padding: 10px;
      background-color: $mainBackDarkGreen;
      border-radius: 5px;
      color: white;
    }
  }
}
</style>
