<template>
  <main class="container">
    <SidePathContainer path="Дела" />
    <SuspenseConteiner v-if="!isPostsLoaded" />
    <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
    <NotFoundthing v-if="posts.length === 0" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'
import NotFoundthing from '@/components/common/notFoundthing.vue'

export default Vue.extend({
  name: 'before-after-container',
  components: { PostsInOne, SuspenseConteiner, SidePathContainer, NotFoundthing },
  computed: {
    posts () {
      return store.getters.thingPosts
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
