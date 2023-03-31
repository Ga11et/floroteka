<template>
  <NewsLayout :posts="posts" name="Новости" />
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from './components/NewsLayout.vue'

export default Vue.extend({
  name: 'news-container',
  computed: {
    posts() {
      return store.getters.filteredPosts
    },
  },
  components: { NewsLayout },
})
</script>
<style lang="scss">
@import '@/variables';
</style>
