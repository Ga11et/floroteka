<template>
  <FormContainer :errorMessage="errorMessages.origin" heading="Проект">
    <template #content>
      <FormPartContainer name="Основная информация">
        <base-input-text
          :errorMessage="errorMessages.heading"
          v-model="formData.heading"
          text="Введите заголовок"
        />
        <base-textarea
          :errorMessage="errorMessages.description"
          v-model="formData.description"
          text="Введите описание"
        />
      </FormPartContainer>
      <FormPartContainer :name="'Фото ' + step" v-for="step in steps" :key="step">
        <base-dropfile-container
          :errorMessage="errorMessages.stepPhotos"
          v-model="formData.stepPhotos[step - 1]"
          text="Добавьте фото (одно)"
          :photoId="'step' + step"
        />
        <base-textarea
          :errorMessage="errorMessages.stepTexts"
          v-model="formData.stepTexts[step - 1]"
          text="Введите описание для фотографии"
        />
      </FormPartContainer>
      <p class="morethenfive">
        *Если хотите добавить больше 5 этапов, то это можно сделать в меню админки
      </p>
    </template>
    <template #actions>
      <base-button
        v-if="steps.length < 5"
        type="button"
        @click.prevent="addStep"
        content="Добавить фото"
      />
      <base-svg v-if="isLoading" type="loading" class="suspense" />
      <base-button
        type="submit"
        :disabled="isLoading"
        @click.prevent="submitForm"
        content="Отправить на сервер"
      />
    </template>
  </FormContainer>
</template>
<script lang="ts">
import Vue from 'vue'
import { IProjectPostForm } from '../../types/types'
import FormContainer from './components/formContainer.vue'
import FormPartContainer from './components/formPartContainer.vue'

export default Vue.extend({
  name: 'study-project-adding-form',
  components: { FormPartContainer, FormContainer },
  data() {
    return {
      formData: {
        heading: '',
        description: '',
        stepPhotos: [''],
        stepTexts: [''],
      } as IProjectPostForm,
      steps: [1],
    }
  },
  mounted() {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('step') !== -1) this.formData.stepPhotos[+photoId[4] - 1] = value
    })
    this.$store.commit('setErrorMessages', [])
  },
  computed: {
    errorMessages() {
      return this.$store.getters.errorMessages
    },
    isLoading() {
      return this.$store.getters.adminLoading
    },
  },
  methods: {
    addStep() {
      if (this.steps.length < 5) {
        this.steps.push(this.steps.length + 1)
        this.formData.stepPhotos.push('')
        this.formData.stepTexts.push('')
      }
    },
    submitForm() {
      this.$store.dispatch('addProjectPost', this.formData)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.morethenfive {
  text-align: end;
}
</style>
