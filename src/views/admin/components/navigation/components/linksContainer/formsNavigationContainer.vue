<template>
  <div class="navigationContainer">
    <NavPart v-for="item in navLinks" class="item" :content="item" :key="item.id" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavPart from './components/navPart.vue'

export default Vue.extend({
  name: 'forms-navigation',
  computed: {
    navLinks() {
      return this.$store.getters.navLinks
    },
  },
  components: { NavPart },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.navigationContainer {
  display: flex;
  flex-wrap: wrap;
}
</style>
