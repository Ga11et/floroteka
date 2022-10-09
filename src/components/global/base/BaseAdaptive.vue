<template>
  <div class="baseAdaptive">
    <slot></slot>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'base-adaptive'
}
</script>
<style lang='scss' scoped>
@import '@/variables';
.baseAdaptive{
  width: 1280px;
  padding-top: 100px;
}
@media (max-width: 1400px) {
  .baseAdaptive{
    width: 100%;
    padding: 100px 50px 0;
  }
}
@media (max-width: 1000px) {
  .baseAdaptive{
    padding-top: 50px;
  }
}
@media (max-width: 750px) {
  .baseAdaptive{
    padding: 50px 20px 0;
  }
}
</style>
