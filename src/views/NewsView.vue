<template>
  <main class="container">
    <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import { fetchAllPostsData } from '@/store/api/api'

export default Vue.extend({
  name: 'news-container',
  components: {
    PostsInOne
  },
  computed: {
    posts () {
      return store.state.allPosts
    }
  },
  mounted: async function () {
    if (!store.state.postsLoaded) {
      const data = await fetchAllPostsData()
      store.commit('setAllPosts', data)
    }
  }
})

</script>
<style lang="scss">
</style>
