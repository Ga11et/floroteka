<template>
  <div class="arrow" @click="clickHandler">
    <base-svg type="arrow" />
    Назад
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'navigation-back-arrow',
  methods: {
    clickHandler() {
      this.$store.commit('setFormType', undefined)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.arrow {
  border: 1px solid $mainVeryDarkGreen;
  border-radius: 6px;
  width: fit-content;
  padding: 25px;
  margin: 20px 20px 0 0;
  transition: 600ms;
  background-color: $mainBackGreen;
  @include flex(row, center, center);

  svg {
    margin-right: 25px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 600ms;
  }
}
@media screen and (max-width: 750px) {
  .arrow {
    margin-top: 0;
  }
}
</style>
