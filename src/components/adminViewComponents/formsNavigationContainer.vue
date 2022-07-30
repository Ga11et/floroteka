<template>
  <div class="navigationContainer">
    <NavPart v-for="item in navParts" class="item" :content="item" :key="item" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import NavPart from './navPart.vue'

export default Vue.extend({
  name: 'forms-navigation',
  data: function () {
    return {
      navParts: ['Было / Стало', 'Технологии', 'Научная деятельность', 'Дела', 'Растения']
    }
  },
  components: { NavPart }
})
</script>
<style lang='scss'>
@import '@/variables';
</style>
