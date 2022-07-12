<template>
  <main class="container">
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PlantsFilter from '../components/PlantsFilter.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    PlantsFilter
  }
})
</script>
<style lang="scss">
  @import '@/variables';
  .container{
    @include flex(column, center, unset);
  }
</style>
