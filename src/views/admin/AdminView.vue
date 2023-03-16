<template>
  <main class="adminViewContainer">
    <Navigation :active="formName" />
    <transition name="formComponentAmination" mode="out-in">
      <component :is="form"></component>
    </transition>
  </main>
</template>
<script lang="ts">
import NoFormContainer from './components/forms/noFormContainer.vue'
import Vue from 'vue'
import Navigation from './components/navigation/navigation.vue'
import { changeFormSwitch } from './servises/changeFormSwitch'

export default Vue.extend({
  name: 'admin-view',
  components: { Navigation },
  data: function () {
    return {
      form: NoFormContainer,
    }
  },
  computed: {
    formName() {
      this.form = changeFormSwitch(this.$store.getters.formType)
      return this.$store.getters.formType
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/animations';
.adminViewContainer {
  @include flex(column, center, flex-start);
}
</style>
