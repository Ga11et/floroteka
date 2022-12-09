<template>
  <div class="suspenseConteiner">
    <base-svg type="loading" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'base-loading'
}
</script>
<style lang="scss" scoped>
.suspenseConteiner{
  width: 1280px;
  padding: 50px 0 500px;
}
@media screen and (max-width: 1400px) {
  .suspenseConteiner{
    width: 100%;
    padding-left: 50px;
  }
}
@media screen and (max-width: 750px) {
  .suspenseConteiner{
    padding-left: 20px;
  }
}
</style>
