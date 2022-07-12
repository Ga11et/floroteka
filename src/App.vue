<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(168, 192, 175, 0.3);

}
</style>
<script lang="ts">
import Vue from 'vue'
import Header from './views/Header.vue'
export default Vue.extend({
  name: 'app',
  components: {
    Header
  }
})
</script>
