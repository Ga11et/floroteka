<template>
  <BeforeAfterPost v-if="content.type === 'beforeAfter'" :content="content" />
  <ScienceActivityPost v-else-if="content.type === 'scienceActivity'" :content="content" />
</template>
<script lang="ts">
import Vue from 'vue'
import BeforeAfterPost from '@/components/postsType/BeforeAfterPost.vue'
import ScienceActivityPost from '@/components/postsType/ScienceActivityPost.vue'

export default Vue.extend({
  name: 'posts-in-one',
  props: ['content'],
  components: {
    BeforeAfterPost,
    ScienceActivityPost
  }
})
</script>
<style lang="scss">
</style>
