<template>
  <transition name="fadeSlow" component="div" >
    <div v-if="isActive" class="mobileNavContainer">
      <div class="mobileNavContainer__top">
        ФлоротекаСЛИ
        <SvgIcons type="menuAnabled" class="menuSvg black" @click.native="setIsActive(false)" />
      </div>
      <transition name="fromAbove">
        <nav v-if="isNavVisible" class="mobileNav">
          <router-link
            v-for="link in links"
            :key="link.id"
            class="link"
            :to="link.to"
            @click.native="setIsActive(false, true)">{{ link.text }}</router-link>
          <router-link v-if="!isAuth" @click.native="setIsActive(false, false)" class="link" to="/login">Логин</router-link>
          <router-link v-else @click.native="setIsActive(false, true)" class="link" to="/admin">Админская</router-link>
        </nav>
      </transition>
    </div>
    <SvgIcons v-else v-on:click.native="setIsActive(true)" type="menuDisabled" class="menuSvg" />
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import SvgIcons from '@/components/common/svgIcons.vue'
import store from '@/store'

export default Vue.extend({
  name: 'HeaderMobileMenu',
  components: { SvgIcons },
  data: function () {
    return {
      isActive: false,
      isNavVisible: false,
      links: [
        { to: '/', text: 'Каталог', id: '1' },
        { to: '/news', text: 'Новости', id: '2' },
        { to: '/beforeafter', text: 'Было / стало', id: '3' },
        { to: '/technologies', text: 'Технологии', id: '4' },
        { to: '/science', text: 'Научная деятельность', id: '5' },
        { to: '/things', text: 'Дела', id: '6' },
        { to: '/studyProjects', text: 'Проекты', id: '7' },
        { to: '/galery', text: 'Галерея', id: '8' }
      ]
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
      if (isAction) this.$emit('scroll')
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
@import '@/animations';
.menuSvg {
  display: none;
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
  display: none;

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
@media (max-width: 1000px) {
  .mobileNavContainer {
    display: flex;
  }
  .menuSvg{
      display: flex;
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
