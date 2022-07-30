<template>
  <div class="navigationContainer">
    <NavPart v-for="item in navParts" class="item" :content="item" :key="item.en" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import NavPart from './navPart.vue'

export default Vue.extend({
  name: 'forms-navigation',
  data: function () {
    return {
      navParts: [
        { rus: 'Было / Стало', en: 'beforeAfterPostForm' },
        { rus: 'Технологии', en: 'technologiesForm' },
        { rus: 'Научная деятельность', en: 'scienceForm' },
        { rus: 'Дела', en: 'thingsForm' },
        { rus: 'Растения', en: 'plantsForm' }
      ]
    }
  },
  components: { NavPart }
})
</script>
<style lang='scss'>
@import '@/variables';
</style>
