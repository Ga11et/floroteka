<template>
  <main class="container">
    <SidePathContainer path="Каталог" />
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PlantsFilter from '../components/PlantsFilter.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'

export default Vue.extend({
  name: 'HomeView',
  components: { PlantsFilter, SidePathContainer }
})
</script>
<style lang="scss">
  @import '@/variables';
  .container{
    @include flex(column, center, unset);
  }
</style>
