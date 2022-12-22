<template>
  <li class="routerLinkLi">
    <router-link :to="content.en" class="routerLink" @click.native="$emit('click')">
      {{ content.ru }}
    </router-link>
  </li>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { ILink } from '../types/HeaderTypes'

export default Vue.extend({
  name: 'MobileMenuLink',
  props: {
    content: {
      type: Object as PropType<ILink>,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.routerLinkLi {
  @include font(16px, 25px, 500);
  .routerLink {
    color: black;
    text-decoration: none;
    @include font(16px, 16px, 500);

    &:hover {
      text-decoration: underline;
    }
  }
  .router-link-exact-active {
    text-decoration: underline;
  }
}
</style>
