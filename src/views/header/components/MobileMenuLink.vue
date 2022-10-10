<template>
  <li>
    <router-link :to="content.to" class="routerLink" @click.native="$emit('click')" >{{ content.text }}</router-link>
  </li>
</template>
<script lang='ts'>
import Vue, { PropType } from 'vue'
import { ILink } from '../types/HeaderTypes'

export default Vue.extend({
  name: 'MobileMenuLink',
  props: {
    content: {
      type: Object as PropType<ILink>,
      required: true
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.routerLink {
  color: black;
  text-decoration: none;
  @include font(20px, 35px, 500);

  &:hover {
    text-decoration: underline;
  }
}
</style>
