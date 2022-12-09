<template>
  <div id="app" :class="{ 'disabledScroll': disabledScroll }">
    <OpenedImage v-if="isImageOpened" :imageUrl="imageUrl" :alt="alt" :title="title" />
    <TheHeader />
    <transition name="fadeFast" mode="out-in" apear>
      <GoUpButton v-if="needButton" />
    </transition>
    <transition name="fadeFast" mode="out-in" apear>
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<style lang="scss">
@import '@/variables';
@import '@/animations';
* {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $mainBackGreen;

}
</style>
<script lang="ts">
import Vue from 'vue'
import Footer from './views/Footer.vue'
import OpenedImage from './components/openedImage.vue'
import store from './store'
import GoUpButton from './components/common/goUpButton.vue'
import TheHeader from './views/header/TheHeader.vue'

export default Vue.extend({
  name: 'app',
  components: { Footer, OpenedImage, GoUpButton, TheHeader },
  data: function () {
    return {
      isImageOpened: false,
      imageUrl: '',
      alt: '',
      title: '',
      disabledScroll: false,
      needButton: false
    }
  },
  mounted: function () {
    document.onscroll = () => {
      const fromTop = this.$el.getBoundingClientRect().top
      if (this.needButton === false && fromTop < -1000) this.needButton = true
      if (this.needButton === true && fromTop > -1000) this.needButton = false
    }
    this.$root.$on('openImage', (url: string, alt: string, title: string) => {
      this.imageUrl = url
      this.alt = alt
      this.isImageOpened = true
      this.title = title
    })
    this.$root.$on('closeImage', () => {
      this.imageUrl = ''
      this.alt = ''
      this.isImageOpened = false
      this.title = ''
    })
    this.$root.$on('disableScroll', () => {
      this.disabledScroll = true
    })
    this.$root.$on('ableScroll', () => {
      this.disabledScroll = false
    })
    store.dispatch('getRefresh')
  }
})
</script>
