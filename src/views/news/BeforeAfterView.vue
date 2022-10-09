<template>
  <NewsLayout :posts="posts" name="Было / Стало" />
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from './components/NewsLayout.vue'

export default Vue.extend({
  name: 'BeforeAfterView',
  computed: {
    posts () {
      return store.getters.beforeAfterPosts
    }
  },
  components: { NewsLayout }
})
</script>
<style lang="scss">
@import '@/variables';
</style>
