<template>
  <div class="suspenseImage" :title="title ? title : ''">
    <img
      class="image"
      :src="image.small"
      :alt="alt"
      @load="loaded"
      @click="$root.$emit('openImage', image.full, alt, title)"
    />
    <span class="image span" v-if="!isLoaded"></span>
  </div>
</template>
<script lang="ts">
import { imageType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'base-image',
  props: {
    image: {
      type: Object as PropType<imageType>,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      isLoaded: false,
    }
  },
  methods: {
    loaded: function () {
      this.isLoaded = true
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.suspenseImage {
  position: relative;
  .image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
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
