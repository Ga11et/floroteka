<template>
  <GalleryLayout />
</template>
<script lang="ts">
import Vue from 'vue'
import GalleryLayout from '@/components/gallery/GalleryLayout.vue'

export default Vue.extend({
  name: 'GalleryView',
  components: { GalleryLayout }
})
</script>
<style lang="scss">
@import '@/variables';
</style>
