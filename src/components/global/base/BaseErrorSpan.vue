<template>
  <div class="baseErrorSpan">
    <span class="span">
      {{ message }}
    </span>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'base-error-span',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/variables';
.baseErrorSpan {
  width: 380px;
  position: absolute;
  top: 40px;
  left: -400px;
  @include flex(row, flex-start, flex-end);
  .span {
    @include flex(row, center, center);
    border-radius: 4px;
    background-color: $mainRed;
    padding: 10px 20px;
    min-height: 50px;
    min-width: 200px;
  }
}
@media screen and (max-width: 1000px) {
  .baseErrorSpan {
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
    margin-top: 15px;
    .span{
      width: 100%;
    }
  }
}
@media screen and (max-width: 750px) {
  .baseErrorSpan {
    position: static;
    width: 100%;
    margin-top: 10px;
    .span {
      width: 100%;
    }
  }
}
</style>
