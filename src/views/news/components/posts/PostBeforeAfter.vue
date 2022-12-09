<template>
  <NewsPostLayout :content="content">
    <div class="beforeAfterContainer">
      <div class="before">
        <h3>Было</h3>
        <base-image :image="content.before" alt="Было" title="Было" />
      </div>
      <div class="after">
        <h3>Стало</h3>
        <base-image :image="content.after" alt="Стало" title="Стало" />
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
<style lang="scss" scoped>
@import '@/variables';
.beforeAfterContainer {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .before, .after {
    h3 {
      @include font(24px, 30px, 500);
      padding-bottom: 10px;
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
@media (max-width: 750px) {
  .beforeAfterContainer {
    grid-template-columns: 1fr;
    .before, .after {
      h3 {
        @include font(20px, 30px, 500);
      }
    }
  }
}
</style>
