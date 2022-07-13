<template>
    <section class="filter">
        <h2 class="heading">Попробуем найти что то конкретное?</h2>
        <div class="inputContainer">
            <input v-model="filterValue" class="input" placeholder="Что вы ищете?"
            />
            <SvgIcons />
        </div>
        <div class="plantsContainer">
            <Plant v-for="item in plants" :content="item" :key="item.id" />
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgIcons from '@/components/svgIcons.vue'
import Plant from '../components/Plant.vue'
import store from '@/store'

export default Vue.extend({
  name: 'plants-filter',
  data: function () {
    return {
      filterValue: ''
    }
  },
  computed: {
    plants () {
      return store.state.plants
    }
  },
  components: {
    SvgIcons,
    Plant
  }
})
</script>
<style lang="scss">
@import '@/variables';

.filter {
    width: 1280px;
    padding: 100px 0;
    align-self: center;

    .heading {
        @include font(36px, 44px, 500);
    }

    .inputContainer {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding-top: 50px - 19px;
        padding-bottom: 50px;
        .input {
            outline: none;
            border: none;
            border-bottom: 2px solid #6D6D6D;
            height: 29px + 38px;
            width: 717px;
            background-color: transparent;
            @include font(24px, 30px, 500);
            &:focus{
                border-color: black;
                &+svg{
                    path{
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
    .plantsContainer{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
    }
}
</style>
