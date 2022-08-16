<template>
  <main class="container">
      <SidePathContainer path="Новости" />
      <AdaptiveContainer>
        <FilterPart heading="Новости" :isLoaded="isPostsLoaded" :refreshFunc="refreshPosts" >
          <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
        </FilterPart>
      </AdaptiveContainer>
      <SuspenseConteiner v-if="!isPostsLoaded" />
      <NotFoundthing v-else-if="posts.length === 0" />
      <PostsInOne v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PostsInOne from '../components/PostsInOne.vue'
import store from '@/store'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'
import NotFoundthing from '@/components/common/notFoundthing.vue'
import FilterPart from '../components/secondary/filterPart.vue'
import AdaptiveContainer from '@/components/common/adaptiveContainer.vue'

export default Vue.extend({
  name: 'news-container',
  components: { PostsInOne, SuspenseConteiner, SidePathContainer, NotFoundthing, FilterPart, AdaptiveContainer },
  computed: {
    posts () {
      return store.getters.filteredPosts
    },
    isPostsLoaded () {
      return store.state.postsLoaded
    },
    filterValue () {
      return store.state.postsFilterValue
    }
  },
  mounted: async function () {
    if (!store.state.postsLoaded) {
      store.dispatch('setPosts')
    }
    store.commit('setPostsFilterValue', '')
  },
  methods: {
    refreshPosts () {
      store.dispatch('setPosts')
    },
    inputChangeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      store.commit('setPostsFilterValue', target.value)
    }
  }
})

</script>
<style lang="scss">
  @import '@/variables';
  .container{
    @include flex(column, center, unset);
    position: relative;
  }
</style>
