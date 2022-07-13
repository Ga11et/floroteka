<template>
  <main class="container">
    <BeforeAfterPost v-for="post in posts" :key="post.id" :content="post" />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import BeforeAfterPost from '../components/BeforeAfterPost.vue'
import store from '@/store'

export default Vue.extend({
  name: 'before-after-container',
  components: {
    BeforeAfterPost
  },
  computed: {
    posts () {
      return store.state.beforeAfterPosts
    }
  }
})

</script>
<style lang="scss">
  .container{

  }
</style>
