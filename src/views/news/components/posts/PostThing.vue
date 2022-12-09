<template>
  <NewsPostLayout :content="content">
    <div class="threePhotosContainer">
      <h3>Фотографии:</h3>
      <div :class="['photos', { three: content.images.length === 3 }]">
        <base-image v-for="photo in content.images" :image="photo" :key="photo.id" :alt="content.heading" :title="content.heading" />
      </div>
    </div>
  </NewsPostLayout>
</template>
<script lang="ts">
import { postPropsType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'
import NewsPostLayout from '../NewsPostLayout.vue'

export default defineComponent({
  name: 'before-after-post',
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true
    }
  },
  components: { NewsPostLayout }
})
</script>
<style lang="scss">
@import '@/variables';
.threePhotosContainer {
  width: 100%;

  .photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 500px;
    grid-gap: 10px;

    img {
      display: block;
      width: 100%;
    }
  }

  h3 {
    @include font(24px, 30px, 500);
    padding-bottom: 10px;
  }

  .three {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width: 1200px) {
  .threePhotosContainer {
    .photos {
      grid-template-columns: 1fr 1fr;
    }
  }
}
@media (max-width: 750px) {
  .threePhotosContainer {
    .photos {
      grid-template-columns: 1fr;
    }
  }
}
</style>
