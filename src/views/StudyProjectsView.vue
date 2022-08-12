<template>
  <main class="container">
    <SidePathContainer path="Проекты обучающихся" />
    <SuspenseConteiner v-if="!isPostsLoaded" />
    <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'

export default Vue.extend({
  name: 'before-after-container',
  components: { PostsInOne, SuspenseConteiner, SidePathContainer },
  computed: {
    posts () {
      return store.getters.studyProjectPosts
    },
    isPostsLoaded () {
      return store.state.postsLoaded
    }
  },
  mounted: async function () {
    if (!store.state.postsLoaded) {
      store.dispatch('setPosts')
    }
  }
})

</script>
<style lang="scss">
@import '@/variables';
</style>
