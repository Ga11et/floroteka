<template>
  <div id="app" :class="{ 'disabledScroll': disabledScroll }">
    <OpenedImage v-if="isImageOpened" :imageUrl="imageUrl" :alt="alt" :title="title" />
    <Header />
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
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
import OpenedImage from './components/openedImage.vue'
import store from './store'

export default Vue.extend({
  name: 'app',
  components: { Header, Footer, OpenedImage },
  data: function () {
    return {
      isImageOpened: false,
      imageUrl: '',
      alt: '',
      title: '',
      disabledScroll: false
    }
  },
  mounted: function () {
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
