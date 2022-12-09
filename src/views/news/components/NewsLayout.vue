<template>
  <main class="container">
    <side-path :path="name" />
    <base-adaptive>
      <filter-text :heading="name" :isLoaded="isPostsLoaded" @refresh="refreshPosts" >
        <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
      </filter-text>
    </base-adaptive>
    <base-loading v-if="!isPostsLoaded" />
    <found-nothing-placeholder v-else-if="posts.length === 0" />
    <NewsUniversalPost v-for="post in posts.slice(0, page * 5)" :key="post.id" :content="post" />
    <NewsMoreButton v-if="posts.slice(0, page * 5).length % 5 === 0" @click="pageUp" />
  </main>
</template>
<script lang='ts'>
import store from '@/store'
import { postPropsType } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'
import NewsUniversalPost from './NewsUniversalPost.vue'
import NewsMoreButton from './NewsMoreButton.vue'

export default Vue.extend({
  name: 'NewsLayout',
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
  components: { NewsUniversalPost, NewsMoreButton },
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
