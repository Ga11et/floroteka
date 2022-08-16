<template>
  <section class="filter">
    <FilterPart heading="Каталог растений" :isLoaded="isPlantsLoaded" :refreshFunc="refreshPlants" >
      <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
    </FilterPart>
    <SuspenseConteiner v-if="!isPlantsLoaded" />
    <NotFoundthing v-else-if="plants.length === 0" />
    <TransitionGroup name="flipList" tag="div" class="plantsContainer">
      <Plant v-for="item in plants" :content="item" :key="item.id" />
    </TransitionGroup>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Plant from '../components/Plant.vue'
import store from '@/store'
import NotFoundthing from './common/notFoundthing.vue'
import SuspenseConteiner from './SuspenseConteiner.vue'
import FilterPart from './secondary/filterPart.vue'

export default Vue.extend({
  name: 'plants-filter',
  computed: {
    plants () {
      return store.getters.filteredPlants
    },
    filterValue () {
      return store.state.plantsFilterValue
    },
    isPlantsLoaded () {
      return store.state.plantsLoaded
    }
  },
  mounted: async function () {
    if (this.plants.length === 0) store.dispatch('setPlants')
  },
  components: { Plant, NotFoundthing, SuspenseConteiner, FilterPart },
  methods: {
    inputChangeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      store.commit('setPlantsFilterValue', target.value)
    },
    refreshPlants () {
      store.dispatch('setPlants')
    }
  }
})
</script>
<style lang="scss">
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
