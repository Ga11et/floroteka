<template>
  <div class="formPartContainer">
    <h3 class="containerName">{{ name }}</h3>
    <div class="form">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'form-part-container',
  props: ['name']
})
</script>
<style lang="scss">
@import "@/variables";

.formPartContainer {
  display: grid;
  grid-template-columns: 400px 1fr;
  border-bottom: 1px solid $mainVeryDarkGreen;
  padding: 20px 0;

  .containerName {
    @include font(20px, 30px, 700);
  }
}
@media screen and (max-width: 1000px) {
  .formPartContainer{
    grid-template-columns: 300px 1fr;
    .containerName{
      font-size: 16px;
    }
  }
}
@media screen and (max-width: 750px) {
  .formPartContainer{
    grid-template-columns: 1fr;
    padding: 10px 0;
  }
}
</style>
