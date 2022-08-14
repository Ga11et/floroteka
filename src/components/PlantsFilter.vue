<template>
  <section class="filter">
    <h2 class="heading">Каталог растений</h2>
    <div class="inputContainer">
      <input :value="filterValue" @input="inputChangeHandler" class="input" placeholder="Что вы ищете?" />
      <SvgIcons type="search" />
    </div>
    <TransitionGroup name="flipList" tag="div" class="plantsContainer">
      <Plant v-for="item in plants" :content="item" :key="item.id" />
    </TransitionGroup>
    <NotFoundthing v-if="plants.length === 0" />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Plant from '../components/Plant.vue'
import store from '@/store'
import SvgIcons from './svgIcons.vue'
import NotFoundthing from './common/notFoundthing.vue'

export default Vue.extend({
  name: 'plants-filter',
  computed: {
    plants () {
      return store.getters.filteredPlants
    },
    filterValue () {
      return store.state.plantsFilterValue
    }
  },
  mounted: async function () {
    if (this.plants.length === 0) store.dispatch('setPlants')
  },
  components: { Plant, SvgIcons, NotFoundthing },
  methods: {
    inputChangeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      store.commit('setPlantsFilterValue', target.value)
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

  .heading {
    @include font(36px, 44px, 500);
  }

  .inputContainer {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding-top: 50px - 19px;
    padding-bottom: 50px;
    width: 717px;

    .input {
      outline: none;
      border: none;
      border-bottom: 2px solid #6D6D6D;
      height: 29px + 38px;
      width: 100%;
      background-color: transparent;
      @include font(24px, 30px, 500);

      &:focus {
        border-color: black;

        &+svg {
          path {
            fill: black;
          }
        }
      }
    }

    svg {
      position: absolute;
      right: 0px;
    }
  }

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
    .inputContainer{
        width: 100%;
    }
    .plantsContainer {
      grid-template-columns: 1fr 1fr;
    }
  }
}
@media screen and (max-width: 750px) {
  .filter {
    padding: 50px 20px 0;
    .heading{
      @include font(24px, 30px, 500);
    }
    .inputContainer{
      padding: 11px 0 30px;
      .input{
        @include font(20px, 30px, 500);
      }
    }
    .plantsContainer {
      grid-template-columns: 1fr;
    }
  }
}
</style>
