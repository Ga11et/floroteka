<template>
  <div class="suspenseConteiner">
    <SvgIcons type="loading" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgIcons from './svgIcons.vue'

export default Vue.extend({
  name: 'suspense-conteiner',
  components: {
    SvgIcons
  }
})
</script>
<style lang="scss">
  .suspenseConteiner{
    width: 1280px;
    margin: 50px 0 500px;
  }
  @media screen and (max-width: 1400px) {
    .suspenseConteiner{
      width: 100%;
      margin-left: 50px;
    }
  }
  @media screen and (max-width: 750px) {
    .suspenseConteiner{
      margin-left: 20px;
    }
  }
</style>
