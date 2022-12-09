<template>
  <base-button @click="$emit('click', $event)" content="Больше постов" class="morePosts" />
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'NewsMoreButton'
})
</script>
<style lang='scss' scoped>
@import '@/variables';
</style>
