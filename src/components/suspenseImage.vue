<template>
  <div class="suspenseImage" :title="title ? title : ''">
    <img class="image" :src="imageUrl.small" :alt="alt" @load="loaded" @click="$root.$emit('openImage', imageUrl.full, alt, title)" />
    <span class="image span" v-if="!isLoaded"></span>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'suspense-image',
  props: ['imageUrl', 'alt', 'title'],
  data: function () {
    return {
      isLoaded: false
    }
  },
  methods: {
    loaded: function () {
      this.isLoaded = true
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.suspenseImage{
  position: relative;
  .image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover{
      cursor: pointer;
    }
  }

  .span {
    background-color: grey;
    position: absolute;
    top: 0;
    z-index: 5;
  }
}
</style>
