<template>
  <form class="catalogAdditionalFilter">
    <h3 v-if="$props.title" class="heading">{{ title }}</h3>
    <slot></slot>
  </form>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'CatalogAdditionalFilter',
  props: {
    title: String
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.catalogAdditionalFilter {
  padding: 20px;
  border: 1px solid $mainGreen;
  border-radius: 4px;
  background-color: $mainBackGreenTight;
  margin-bottom: 20px;

  .heading{
    @include font(24px, 34px, 500);
    padding-bottom: 20px;
  }
}
</style>
