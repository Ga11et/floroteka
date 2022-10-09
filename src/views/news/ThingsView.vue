<template>
  <NewsLayout :posts="posts" name="Дела" />
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
      return store.getters.thingPosts
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
</style>
