<template>
  <nav class="headerDesktopMenu">
    <template v-for="link in nav">
      <DesctopMenuLink v-if="!link.children" :text="link.ru" :to="link.en" />
      <HeaderDesktopMenuDropdown
        v-else
        :content="link.children"
        :text="link.ru"
        @scroll="$root.$emit('scroll')"
      />
    </template>
    <DesctopMenuLink v-if="!isAuth" text="Логин" to="/login" :not-action="true" />
    <DesctopMenuLink v-if="isAuth" text="Админская" to="/admin" />
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import HeaderDesktopMenuDropdown from './HeaderDesktopMenuDropdown.vue'
import DesctopMenuLink from './DesctopMenuLink.vue'

export default Vue.extend({
  name: 'HeaderDesktopMenu',
  components: { HeaderDesktopMenuDropdown, DesctopMenuLink },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth
    },
    nav() {
      return this.$store.getters.getHeaderNav
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.headerDesktopMenu {
  @include flex(row, center, space-between);
  width: 55%;
}
@media screen and (max-width: 1200px) {
  .headerDesktopMenu {
    width: 70%;
  }
}
@media screen and (max-width: 1000px) {
  .headerDesktopMenu {
    display: none;
  }
}
</style>
