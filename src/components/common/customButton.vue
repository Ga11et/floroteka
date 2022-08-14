<template>
  <button @click="onclick" class="customButton">
    {{ content }}
  </button>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'delete-button',
  props: ['content', 'onclick']
})
</script>
<style lang='scss'>
@import '@/variables';
.customButton{
  background-color: $mainDarkGreen;
  border: none;
  border-radius: 5px;
  @include font(18px, 30px, 500);
  padding: 15px 35px;
  background-color: $mainRed;
  transition: 400ms;

  &:hover {
    cursor: pointer;
    background-color: $secondaryRed;
    transition: 400ms;
  }
}

@media screen and (max-width: 750px) {
  .customButton{
    width: 100%;
  }
}
</style>
