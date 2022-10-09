<template>
  <div class="openedPost">
    <PostPart v-for="item in content" :content="item" :key="item.image.id" />
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { IOpenablePart } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'
import PostPart from './PostPart.vue'

export default Vue.extend({
  name: 'OpenedPost',
  props: {
    content: {
      type: Array as PropType<IOpenablePart[]>,
      required: true
    }
  },
  components: { PostPart }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.openedPost {
  width: 100%;
}
</style>
