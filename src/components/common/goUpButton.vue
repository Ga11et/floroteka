<template>
  <button class="goBackButton" @click="clickHandler">
    <SvgIcons type="dropdown" class="svg" />
  </button>
</template>
<script lang='ts'>
import Vue from 'vue'
import SvgIcons from './svgIcons.vue'

export default Vue.extend({
  name: 'go-up-button',
  methods: {
    clickHandler () {
      this.$root.$emit('scroll')
    }
  },
  components: { SvgIcons }
})
</script>
<style lang='scss' scoped>
@import '@/variables';

.goBackButton {
  position: fixed;
  bottom: 100px;
  right: 50px;
  background-color: $mainGreen;
  width: 80px;
  height: 80px;
  @include flex(row, center, center);
  border-radius: 50%;
  border: none;
  z-index: 100;
  transition: 300ms;

  &:hover{
    cursor: pointer;
    background-color: $mainGreenHover;
    transition: 300ms;
  }

  .svg {
    stroke: white;
    transform: rotateZ(180deg);
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 750px) {
  .goBackButton{
    right: 20px;
  }
}
</style>
