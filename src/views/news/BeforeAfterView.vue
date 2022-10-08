<template>
  <NewsLayout :posts="posts" name="Было / Стало" />
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from '@/components/news/NewsLayout.vue'

export default Vue.extend({
  name: 'before-after-container',
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
