<template>
  <NewsPostLayout :content="content">
    <div class="onePhotoContainer">
      <base-image class="images" :image="content.images[0]" alt="Научная активность" title="Научная деятельность" />
      <div>
        <p class="paragraph" v-for="(part, index) in content.text.split('\n')" :key="index">{{ part }}</p>
      </div>
    </div>
  </NewsPostLayout>
</template>
<script lang="ts">
import { postPropsType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'
import NewsPostLayout from '../NewsPostLayout.vue'

export default defineComponent({
  name: 'ScienceActivityPostContent',
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true
    }
  },
  components: { NewsPostLayout }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.onePhotoContainer {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .paragraph {
    text-align: justify;
    padding: 5px 0;
    @include font(16px, 20px, 500);
  }
  .images {
    display: block;
    width: 100%;
  }
}
@media (max-width: 750px) {
  .onePhotoContainer {
    grid-template-columns: 1fr;
  }
}
</style>
