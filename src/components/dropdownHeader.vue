<template>
  <div class="dropdownHeader">
    <button @click="ddHandler()" :class="['handler', { active: isActive }]">Категории
      <SvgIcon type="dropdown" />
    </button>
    <transition name="dropdownAnimation">
      <div v-if="isActive" class="container">
        <router-link class="link" @click.native="ddHandler(true)" to="/beforeafter">Было / стало</router-link>
        <router-link class="link" @click.native="ddHandler(true)" to="/technologies">Технологии</router-link>
        <router-link class="link" @click.native="ddHandler(true)" to="/science">Научная деятельность</router-link>
        <router-link class="link" @click.native="ddHandler(true)" to="/things">Дела</router-link>
        <router-link class="link" @click.native="ddHandler(true)" to="/studyProjects">Проекты обучающихся</router-link>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/common/svgIcons.vue'

export default Vue.extend({
  name: 'dropdown-header',
  props: ['scrollHandler'],
  data: function () {
    return {
      isActive: false
    }
  },
  methods: {
    ddHandler: function (isAction = false) {
      this.isActive = !this.isActive
      if (isAction) this.scrollHandler()
    }
  },
  components: {
    SvgIcon
  }
})
</script>
<style lang="scss">
@import '@/variables';

.dropdownAnimation-enter-active,
.dropdownAnimation-leave-active {
  transition: all 600ms;
}

.dropdownAnimation-enter,
.dropdownAnimation-leave-to {
  opacity: 0;
}

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
  }
}
</style>
