<template>
  <div class="mobileAdaptiveContainer">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'adaptive-container'
})
</script>
<style lang='scss'>
@import '@/variables';
.mobileAdaptiveContainer{
  width: 1280px;
  padding-top: 100px;
}
@media (max-width: 1400px) {
  .mobileAdaptiveContainer{
    width: 100%;
    padding: 100px 50px 0;
  }
}
@media (max-width: 1000px) {
  .mobileAdaptiveContainer{
    padding-top: 50px;
  }
}
@media (max-width: 750px) {
  .mobileAdaptiveContainer{
    padding: 50px 20px 0;
  }
}
</style>
