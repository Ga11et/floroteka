<template>
  <button @click="onclick" class="deleteButton">
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
.deleteButton{
  background-color: $mainDarkGreen;
  border: none;
  border-radius: 5px;
  @include font(18px, 30px, 500);
  padding: 15px 35px;
  background-color: $mainRed;
  position: absolute;
  transition: 400ms;

  &:hover {
    cursor: pointer;
    background-color: $secondaryRed;
    transition: 400ms;
  }
}

@media screen and (max-width: 750px) {
  .deleteButton{
    position: relative;
    width: 100%;
  }
}
</style>
