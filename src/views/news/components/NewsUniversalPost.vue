<template>
  <PostBeforeAfter
    v-if="content.type === 'beforeAfter' && content.shouldShow === true"
    :content="content"
  />
  <PostScienceActivity
    v-else-if="content.type === 'scienceActivity' && content.shouldShow === true"
    :content="content"
  />
  <PostTechnologies
    v-else-if="content.type === 'technologies' && content.shouldShow === true"
    :content="content"
  />
  <PostThing
    v-else-if="content.type === 'things' && content.shouldShow === true"
    :content="content"
  />
  <PostProject
    v-else-if="content.type === 'studyProject' && content.shouldShow === true"
    :content="content"
  />
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { postPropsType } from '@/store/models/appTypes'
import PostThing from './posts/PostThing.vue'
import PostBeforeAfter from './posts/PostBeforeAfter.vue'
import PostScienceActivity from './posts/PostScienceActivity.vue'
import PostTechnologies from './posts/PostTechnologies.vue'
import PostProject from './posts/PostProject.vue'

export default Vue.extend({
  name: 'NewsUniversalPost',
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true,
    },
  },
  components: { PostThing, PostBeforeAfter, PostScienceActivity, PostTechnologies, PostProject },
})
</script>
<style lang="scss"></style>
