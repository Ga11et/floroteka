<template>
  <div class="filterTop">
    <h2 class="heading">{{ heading }}</h2>
    <button :disabled="!isLoaded" class="refreshButton" @click="refreshFunc">
      <SvgIcons class="svgRefresh" type="refresh" />
    </button>
    <div class="inputContainer">
      <slot></slot>
      <SvgIcons type="search" />
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import SvgIcons from '../svgIcons.vue'

export default Vue.extend({
  name: 'filter-part',
  props: ['heading', 'isLoaded', 'refreshFunc'],
  components: { SvgIcons }
})
</script>
<style lang='scss'>
@import '@/variables';
.filterTop{
  display: grid;
  grid-template-columns: min-content 1fr;

  .heading {
    display: inline-block;
    width: 600px;
    @include font(36px, 44px, 500);
  }

  .refreshButton{
    background-color: transparent;
    border: none;
    width: min-content;
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    justify-self: flex-end;
    align-self: flex-start;
    padding: 0;
    width: 60px;
    height: 60px;

    &:disabled{
      opacity: .5;
    }
    .svgRefresh{
      width: 100%;
      height: 100%;

      &:hover{
        cursor: pointer;
      }
    }
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
}
@media screen and (max-width: 1000px) {
  .filterTop{
    display: block;
    .refreshButton{
      display: none;
    }
    .inputContainer{
      width: 100%;
    }
  }
  .plantsContainer {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 750px) {
  .filterTop{
    .heading{
      @include font(24px, 30px, 500);
    }
    .inputContainer{
      padding: 11px 0 30px;
      .input{
        @include font(20px, 30px, 500);
      }
    }
  }
  .plantsContainer {
    grid-template-columns: 1fr;
  }
}
</style>
