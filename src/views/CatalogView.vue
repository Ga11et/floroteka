<template>
  <main class="container">
    <SvgIcons v-if="!isPlantsLoaded" type="loading" />
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import store from '@/store'
import Vue from 'vue'
import PlantsFilter from '../components/PlantsFilter.vue'
import SvgIcons from '@/components/svgIcons.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    PlantsFilter,
    SvgIcons
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
