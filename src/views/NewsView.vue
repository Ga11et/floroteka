<template>
  <main class="container">
      <SvgIcons v-if="!isPostsLoaded" type="loading" />
      <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import { fetchAllPostsData } from '@/store/api/api'
import SvgIcons from '@/components/svgIcons.vue'

export default Vue.extend({
  name: 'news-container',
  components: {
    PostsInOne,
    SvgIcons
  },
  computed: {
    posts () {
      return store.state.allPosts
    },
    isPostsLoaded () {
      return store.state.postsLoaded
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
  @import '@/variables';
  .container{
    @include flex(column, center, unset);
  }
</style>
