<template>
  <main class="container">
    <SidePathContainer path="Каталог" />
    <SuspenseConteiner v-if="!isPlantsLoaded" />
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PlantsFilter from '../components/PlantsFilter.vue'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import store from '@/store'
import SidePathContainer from '@/components/sidePathContainer.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    PlantsFilter,
    SuspenseConteiner,
    SidePathContainer
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
