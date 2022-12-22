<template>
  <router-link class="link" @click.native="notAction ? null : $root.$emit('scroll')" :to="to">
    {{ text }}
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'header-router-link',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    notAction: Boolean,
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
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
</style>
