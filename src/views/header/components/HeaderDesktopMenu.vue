<template>
  <nav class="headerDesktopMenu">
    <router-link class="link" @click.native="$emit('scroll')" to="/">Каталог</router-link>
    <router-link class="link" @click.native="$emit('scroll')" to="/news">Новости</router-link>
    <HeaderDesktopMenuDropdown :scrollHandler="$emit('scroll')" />
    <router-link class="link" @click.native="$emit('scroll')" to="/galery">Галерея</router-link>
    <router-link v-if="!isAuth" class="link" to="/login">Логин</router-link>
    <router-link v-if="isAuth" class="link" @click.native="$emit('scroll')" to="/admin">Админская</router-link>
  </nav>
</template>
<script lang='ts'>
import Vue from 'vue'
import HeaderDesktopMenuDropdown from './HeaderDesktopMenuDropdown.vue'

export default Vue.extend({
  name: 'HeaderDesktopMenu',
  components: { HeaderDesktopMenuDropdown },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.headerDesktopMenu {
  @include flex(row, center, space-between);
  width: 55%;
  .link {
    @include font(16px, 19px, 500);
    color: inherit;
    text-decoration: none;
    padding: 5px 20px;

    &:hover {
      text-decoration: underline;
    }
  }
  .router-link-exact-active {
    text-decoration: underline;
  }
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
