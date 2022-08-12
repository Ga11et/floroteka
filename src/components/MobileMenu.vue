<template>
  <transition name="fade">
    <div v-if="isActive" class="mobileNavContainer">
      <div class="mobileNavContainer__top">
        ФлоротекаСЛИ
        <SvgIcons type="menuAnabled" class="menuSvg black" v-on:click.native="setIsActive(false)" />
      </div>
      <transition name="fromAbove">
        <nav v-if="isNavVisible" class="mobileNav">
          <router-link @click.native="setIsActive(false, true)" class="link" to="/">Каталог</router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/news">Новости</router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/beforeafter">Было / стало
          </router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/technologies">Технологии</router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/science">Научная деятельность
          </router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/things">Дела</router-link>
          <router-link @click.native="setIsActive(false, true)" class="link" to="/galery">Галерея</router-link>
          <router-link v-if="!isAuth" @click.native="setIsActive(false, false)" class="link" to="/login">Логин</router-link>
          <router-link v-if="isAuth" @click.native="setIsActive(false, true)" class="link" to="/admin">Админская</router-link>
        </nav>
      </transition>
    </div>
    <SvgIcons v-else v-on:click.native="setIsActive(true)" type="menuDisabled" class="menuSvg" />
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgIcons from '@/components/svgIcons.vue'
import store from '@/store'

export default Vue.extend({
  name: 'mobile-menu',
  props: ['scrollHandler'],
  components: {
    SvgIcons
  },
  data: function () {
    return {
      isActive: false,
      isNavVisible: false
    }
  },
  methods: {
    setIsActive: function (value: boolean, isAction = false) {
      if (value) {
        this.isActive = value
        setTimeout(() => {
          this.isNavVisible = value
        }, 300)
      } else {
        this.isNavVisible = value
        setTimeout(() => {
          this.isActive = value
        }, 300)
      }
      if (isAction) this.scrollHandler()
    }
  },
  computed: {
    isAuth () {
      return store.state.isAuth
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.fromAbove-enter-active,
.fromAbove-leave-active {
  transition: transform 600ms;
}

.fromAbove-enter,
.fromAbove-leave-to {
  transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 800ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.menuSvg {
  width: 35px;

  path {
    fill: white;
  }

  &:hover {
    cursor: pointer;
  }
}

.black>path {
  fill: black;
}

.mobileNavContainer {
  z-index: 1000;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @include flex(column, flex-start, space-between);

  .mobileNavContainer__top {
    z-index: 1001;
    background-color: white;
    color: black;
    padding: 35px 50px;
    border-bottom: 1px solid #00000033;
    width: 100%;
    @include flex(row, center, space-between);
  }

  .mobileNav {
    @include flex(column, flex-start, space-between);
    background-color: white;
    width: 100%;
    padding: 20px 50px;

    .link {
      color: black;
      text-decoration: none;
      @include font(20px, 35px, 500);
    }

    .router-link-exact-active {
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 750px) {
  .mobileNavContainer {
    .mobileNav {
      padding: 20px;
    }

    .mobileNavContainer__top {
      padding: 20px;
    }
  }
}
</style>
