<template>
  <NewsLayout :posts="posts" name="Научная деятельность" />
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from '@/components/news/NewsLayout.vue'

export default Vue.extend({
  name: 'science-activity-container',
  components: { NewsLayout },
  computed: {
    posts () {
      return store.getters.sciensePosts
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
</style>
