<template>
  <main class="catalogContainer">
    <side-path path="Каталог" />
    <PlantsFilter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PlantsFilter from './components/PlantsFilter.vue'

export default Vue.extend({
  name: 'CatalogContainer',
  components: { PlantsFilter }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.catalogContainer {
  @include flex(column, center, unset);
}
</style>
