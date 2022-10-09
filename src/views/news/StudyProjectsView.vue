<template>
  <NewsLayout :posts="posts" name="Проекты" />
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from './components/NewsLayout.vue'

export default Vue.extend({
  name: 'before-after-container',
  components: { NewsLayout },
  computed: {
    posts () {
      return store.getters.studyProjectPosts
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
</style>
