<template>
  <div class="dropdownHeader">
    <button @click="linkClickHandler(false)" :class="['handler', { active: isActive }]">
      {{ text }}
      <base-svg class="svg" type="dropdown" />
    </button>
    <transition name="fade">
      <div v-if="isActive" class="container">
        <router-link
          v-for="link in content"
          :key="link.id"
          :to="link.en"
          class="link"
          @click.native="linkClickHandler(true)"
          >{{ link.ru }}</router-link
        >
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { ILink } from '../types/HeaderTypes'

export default Vue.extend({
  name: 'HeaderDesktopMenuDropdown',
  data: function () {
    return {
      isActive: false,
    }
  },
  props: {
    content: {
      type: Array as PropType<ILink[]>,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    linkClickHandler(isAction: boolean) {
      this.isActive = !this.isActive
      if (isAction) this.$root.$emit('scroll')
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/animations';
.dropdownHeader {
  position: relative;
  .handler {
    @include flex(row, center, space-between);
    @include font(16px, 20px, 500);
    padding: 20px 10px 20px 20px;
    height: 27px;
    border: none;
    background-color: transparent;
    color: white;
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: 20px;
    transition: 300ms;
    .svg {
      width: 30px;
      padding: 0 7px;
      stroke: white;
    }

    &:hover {
      cursor: pointer;
      border-color: white;
      transition: 300ms;
    }
  }
  .active {
    border-color: white;
    svg {
      transform: rotate(180deg);
    }
  }
  .container {
    position: absolute;
    top: 50px;
    @include flex(column, flex-start, flex-start);
    width: max-content;
    z-index: 2;
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
}
</style>
