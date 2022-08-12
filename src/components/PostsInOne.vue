<template>
  <BeforeAfterPost v-if="content.type === 'beforeAfter'" :content="content" />
  <ScienceActivityPost v-else-if="content.type === 'scienceActivity'" :content="content" />
  <TechnologiesPost v-else-if="content.type === 'technologies'" :content="content" />
  <ThingPost v-else-if="content.type === 'things'" :content="content" />
  <StudyProjectPost v-else-if="content.type === 'studyProject'" :content="content" />
</template>
<script lang="ts">
import Vue from 'vue'
import BeforeAfterPost from '@/components/postsType/BeforeAfterPost.vue'
import ScienceActivityPost from '@/components/postsType/ScienceActivityPost.vue'
import TechnologiesPost from './postsType/TechnologiesPost.vue'
import ThingPost from './postsType/ThingPost.vue'
import StudyProjectPost from './postsType/StudyProjectPost.vue'

export default Vue.extend({
  name: 'posts-in-one',
  props: ['content'],
  components: { BeforeAfterPost, ScienceActivityPost, TechnologiesPost, ThingPost, StudyProjectPost }
})
</script>
<style lang="scss">
</style>
