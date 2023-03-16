<template>
  <transition name="fadeSlow" component="div">
    <div v-if="isActive" class="mobileNavContainer">
      <div class="mobileNavContainer__top">
        Флоротека
        <base-svg type="menuAnabled" class="menuSvg black" @click.native="setIsActive(false)" />
      </div>
      <transition name="fromAbove">
        <ul v-if="isNavVisible" class="mobileNav">
          <template v-for="link in nav">
            <MobileMenuLink
              v-if="!link.children"
              :content="link"
              @click.native="setIsActive(false, true)"
              :key="link.id"
            />
            <ul v-else class="deepNav">
              <MobileMenuLink
                v-for="item in link.children"
                :content="item"
                @click="setIsActive(false, true)"
                :key="item.id"
              />
            </ul>
          </template>
          <MobileMenuLink
            v-if="!isAuth"
            @click.native="setIsActive(false, false)"
            :content="{ id: '1', en: '/login', ru: 'Логин' }"
          />
          <MobileMenuLink
            v-else
            @click.native="setIsActive(false, true)"
            :content="{ id: '1', en: '/admin', ru: 'Админская' }"
          />
        </ul>
      </transition>
    </div>
    <base-svg v-else @click.native="setIsActive(true)" type="menuDisabled" class="menuSvg" />
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import MobileMenuLink from './MobileMenuLink.vue'

export default Vue.extend({
  name: 'HeaderMobileMenu',
  components: { MobileMenuLink },
  data: function () {
    return {
      isActive: false,
      isNavVisible: false,
    }
  },
  methods: {
    setIsActive: function (value: boolean, isAction = false) {
      if (value) {
        this.isActive = value
        setTimeout(() => (this.isNavVisible = value), 300)
      } else {
        this.isNavVisible = value
        setTimeout(() => (this.isActive = value), 300)
      }
      if (isAction) this.$root.$emit('scroll')
    },
  },
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
@import '@/animations';
.menuSvg {
  display: none;
  width: 35px;
  fill: white;

  &:hover {
    cursor: pointer;
  }
}
.black {
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
    .deepNav {
      padding-left: 20px;
    }
  }
}
@media (max-width: 1000px) {
  .mobileNavContainer {
    display: flex;
  }
  .menuSvg {
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
