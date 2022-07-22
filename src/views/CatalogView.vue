<template>
  <main class="container">
    <SuspenseConteiner v-if="!isPlantsLoaded" />
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PlantsFilter from '../components/PlantsFilter.vue'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import store from '@/store'

export default Vue.extend({
  name: 'HomeView',
  components: {
    PlantsFilter,
    SuspenseConteiner
  },
  computed: {
    isPlantsLoaded () {
      return store.state.plantsLoaded
    }
  }
})
</script>
<style lang="scss">
  @import '@/variables';
  .container{
    @include flex(column, center, unset);
  }
</style>
