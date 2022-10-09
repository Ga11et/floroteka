<template>
  <section class="filter">
    <filter-text heading="Каталог растений" :isLoaded="isPlantsLoaded" :refreshFunc="refreshPlants" >
      <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
    </filter-text>
    <base-loading v-if="!isPlantsLoaded" />
    <found-nothing-placeholder v-else-if="plants.length === 0" />
    <TransitionGroup name="flipList" tag="div" class="plantsContainer">
      <CatalogPlant v-for="item in plants" :content="item" :key="item.id" />
    </TransitionGroup>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import CatalogPlant from './CatalogPlant.vue'

export default Vue.extend({
  name: 'PlantsFilter',
  computed: {
    plants () {
      return this.$store.getters.filteredPlants
    },
    filterValue () {
      return this.$store.getters.plantsFilterValue
    },
    isPlantsLoaded () {
      return this.$store.getters.plantsLoaded
    }
  },
  mounted: async function () {
    if (this.plants.length === 0) this.$store.dispatch('setPlants')
  },
  components: { CatalogPlant },
  methods: {
    inputChangeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$store.commit('setPlantsFilterValue', target.value)
    },
    refreshPlants () {
      this.$store.dispatch('setPlants')
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.flipList-move {
  transition: transform 1s;
}
.filter {
  width: 1280px;
  padding: 100px 0 0;
  align-self: center;
  position: relative;
  .plantsContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 500px;
    grid-gap: 20px;
  }
}
@media screen and (max-width: 1400px) {
  .filter {
    width: 100%;
    padding: 100px 50px;
  }
}
@media screen and (max-width: 1000px) {
  .filter {
    padding: 50px 50px 0;
    .plantsContainer {
      grid-template-columns: 1fr 1fr;
    }
  }
}
@media screen and (max-width: 750px) {
  .filter {
    padding: 50px 20px 0;
    .plantsContainer {
      grid-template-columns: 1fr;
    }
  }
}
</style>
