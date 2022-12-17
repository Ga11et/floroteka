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
import Navigation from './components/navigation.vue'
import { FormType } from './types/types'
import { changeFormSwitch } from './servises/changeFormSwitch'

export default Vue.extend({
  name: 'admin-view',
  components: { Navigation },
  data: function () {
    return {
      form: NoFormContainer,
      formName: undefined as FormType,
    }
  },
  methods: {
    changeForm: function (value: FormType) {
      this.formName = value
      this.form = changeFormSwitch(value)
    },
  },
  mounted: function () {
    this.$root.$on('changeForm', (value: FormType) => {
      this.changeForm(value)
    })
  },
})
</script>
<style lang="scss">
@import '@/variables';
@import '@/animations';
.adminViewContainer {
  @include flex(column, center, flex-start);
}
</style>
