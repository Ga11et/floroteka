<template>
  <header class="header">
    <img src="./assets/headerPic1.jpg" alt="background picture" class="image" />
    <div class="top">
      Флоротека
      <HeaderDesktopMenu />
      <HeaderMobileMenu />
    </div>
    <HeaderLoginForm v-if="isLogin" />
    <transition name="fade">
      <HeaderContent v-if="!isLogin" />
    </transition>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import HeaderMobileMenu from './components/HeaderMobileMenu.vue'
import HeaderLoginForm from './components/HeaderLoginForm.vue'
import HeaderContent from './components/HeaderContent.vue'
import HeaderDesktopMenu from './components/HeaderDesktopMenu.vue'
export default Vue.extend({
  name: 'TheHeader',
  components: { HeaderMobileMenu, HeaderLoginForm, HeaderContent, HeaderDesktopMenu },
  mounted: function () {
    this.$root.$on('scroll', () =>
      window.scroll({ left: 0, top: this.$el.clientHeight, behavior: 'smooth' }),
    )
    this.$root.$on('dropHandler', (file: File, photoId: string) => {
      console.log(file)
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.$root.$emit('renderResult', reader.result as string, photoId, file.name)
        }
      }
    })
  },
  computed: {
    isLogin() {
      return this.$route.path === '/login'
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/animations';
.header {
  @include flex(column, center, unset);
  width: 100%;
  color: $mainWhite;
  position: relative;
  .image {
    display: block;
    width: 100%;
  }
  .top {
    @include flex(row, center, space-between);
    @include font(28px, 36px, 500);
    width: 1280px;
    padding-top: 35px;
    position: absolute;
  }
}
@media screen and (max-width: 1400px) {
  .header {
    .top {
      width: 100%;
      padding: 35px 50px;
    }
  }
}
@media screen and (max-width: 750px) {
  .header {
    .top {
      padding: 20px;
    }
    .image {
      height: 500px;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
