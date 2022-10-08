<template>
  <custom-button @click="$emit('click', $event)" content="Больше постов" class="morePosts" />
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'more-posts-button'
})
</script>
<style lang='scss' scoped>
@import '@/variables';
</style>
