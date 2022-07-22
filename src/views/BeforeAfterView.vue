<template>
  <main class="container">
    <SuspenseConteiner v-if="!isPostsLoaded" />
    <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'

export default Vue.extend({
  name: 'before-after-container',
  components: {
    PostsInOne,
    SuspenseConteiner
  },
  computed: {
    posts () {
      return store.getters.beforeAfterPosts
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
  .container{
    @include flex(column, center, unset);
    .suspense{
      width: 1280px;
    }
  }
</style>
