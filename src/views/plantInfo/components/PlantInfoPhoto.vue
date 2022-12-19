<template>
  <div class="photo">
    <base-image
      v-for="image in content"
      class="image"
      :image="image"
      :alt="name"
      :key="content.indexOf(image)"
      :title="name"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IImage } from '../types/types'

export default defineComponent({
  name: 'plant-info-photo',
  props: {
    content: {
      type: Array as PropType<IImage[]>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
.photo {
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
  .image {
    display: inline-block;
    min-width: 30%;
    height: 500px;
    margin: 0 20px 20px 0;

    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(3n) {
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 1400px) {
  .photo {
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 750px) {
  .photo {
    .image {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
