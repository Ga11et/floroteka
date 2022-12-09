<template>
  <div class="dropdownHeader">
    <button @click="linkClickHandler(false)" :class="['handler', { active: isActive }]">Категории
      <base-svg type="dropdown" />
    </button>
    <transition name="fade">
      <div v-if="isActive" class="container">
        <router-link
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          class="link"
          @click.native="linkClickHandler(true)"
        >{{ link.text }}</router-link>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderDesktopMenuDropdown',
  data: function () {
    return {
      isActive: false,
      links: [
        { to: '/beforeafter', text: 'Было / стало', id: '1' },
        { to: '/technologies', text: 'Технологии', id: '2' },
        { to: '/science', text: 'Научная деятельность', id: '3' },
        { to: '/things', text: 'Дела', id: '4' },
        { to: '/studyProjects', text: 'Проекты', id: '5' }
      ]
    }
  },
  methods: {
    linkClickHandler (isAction: boolean) {
      this.isActive = !this.isActive
      if (isAction) this.$emit('scroll')
    }
  }
})
</script>
<style lang="scss">
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

    svg {
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
  .active{
    border-color: white;
    svg{
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
