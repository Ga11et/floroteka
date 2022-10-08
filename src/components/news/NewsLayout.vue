<template>
  <main class="container">
    <SidePathContainer :path="name" />
      <AdaptiveContainer>
        <FilterPart :heading="name" :isLoaded="isPostsLoaded" :refreshFunc="refreshPosts" >
          <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
        </FilterPart>
      </AdaptiveContainer>
      <SuspenseConteiner v-if="!isPostsLoaded" />
      <NotFoundthing v-else-if="posts.length === 0" />
      <PostsInOne v-for="post in posts.slice(0, page * 5)" :key="post.id" :content="post" />
      <MorePostsButton @click="pageUp" />
  </main>
</template>
<script lang='ts'>
import store from '@/store'
import { postPropsType } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'
import SidePathContainer from '../sidePathContainer.vue'
import AdaptiveContainer from '../common/adaptiveContainer.vue'
import FilterPart from '../secondary/filterPart.vue'
import SuspenseConteiner from '../SuspenseConteiner.vue'
import NotFoundthing from '../common/notFoundthing.vue'
import PostsInOne from '../PostsInOne.vue'
import MorePostsButton from './morePostsButton.vue'

export default Vue.extend({
  name: 'news-layout',
  props: {
    name: {
      type: String,
      required: true
    },
    posts: {
      type: Array as PropType<postPropsType[]>,
      required: true
    }
  },
  components: { SidePathContainer, AdaptiveContainer, FilterPart, SuspenseConteiner, NotFoundthing, PostsInOne, MorePostsButton },
  computed: {
    isPostsLoaded () {
      return store.getters.postsLoaded
    },
    filterValue () {
      return store.getters.postsFilterValue
    }
  },
  data () {
    return {
      page: 1
    }
  },
  mounted: async function () {
    if (!this.isPostsLoaded) {
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
    },
    pageUp () {
      this.page += 1
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
  .container{
    @include flex(column, center, unset);
    position: relative;
  }
</style>
