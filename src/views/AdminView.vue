<template>
  <main class="adminViewContainer">
    <Navigation :active="formName" />
    <transition name="formComponentAmination" mode="out-in">
      <component :is="form"></component>
    </transition>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import PlantAddingForm from '@/components/forms/PlantAddingForm.vue'
import BeforeAfrerPostForm from '@/components/forms/beforeAfterAddingForm.vue'
import TechnologiesPostForm from '@/components/forms/technologyAddingForm.vue'
import Navigation from '@/components/adminViewComponents/navigation.vue'
import { FormType } from '@/store/models'
import noFormContainerVue from '@/components/forms/noFormContainer.vue'

export default Vue.extend({
  name: 'admin-view',
  components: { Navigation },
  data: function () {
    return {
      form: noFormContainerVue,
      formName: undefined as FormType
    }
  },
  methods: {
    changeForm: function (value: FormType) {
      this.formName = value
      console.log(value)
      switch (value) {
        case 'plantForm':
          this.form = PlantAddingForm
          break
        case 'beforeAfterPostForm':
          this.form = BeforeAfrerPostForm
          break
        case 'technologiesForm':
          this.form = TechnologiesPostForm
          break
        case undefined:
          this.form = noFormContainerVue
          break
        default:
          this.form = PlantAddingForm
          break
      }
    }
  },
  mounted: function () {
    this.$root.$on('changeForm', (value: FormType) => {
      this.changeForm(value)
    })
  }
})
</script>
<style lang="scss">
@import '@/variables';
.formComponentAmination-enter-active,
.formComponentAmination-leave-active {
  transition: opacity 600ms;
}

.formComponentAmination-enter,
.formComponentAmination-leave-to {
  opacity: 0;
}
.adminViewContainer{
  @include flex(column, center, flex-start);
}
</style>
