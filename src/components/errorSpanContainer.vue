<template>
  <div class="errorSpanContainer">
    <span class="errorSpan">
      {{ message }}
    </span>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'error-span-container',
  props: ['message']
})
</script>
<style lang='scss'>
@import '@/variables';

.errorSpanContainer {
  width: 380px;
  position: absolute;
  top: 40px;
  left: -400px;
  @include flex(row, flex-start, flex-end);

  .errorSpan {
    @include flex(row, center, center);
    border-radius: 10px;
    background-color: $mainRed;
    padding: 10px 20px;
    min-height: 50px;
    min-width: 200px;
  }
}

@media screen and (max-width: 1000px) {
  .errorSpanContainer {
    width: 280px;
    left: -300px;
    top: 30px;
  }
}

@media screen and (max-width: 750px) {
  .errorSpanContainer {
    position: static;
    width: 100%;
    margin-top: 10px;

    .errorSpan {
      width: 100%;
    }
  }
}
</style>
