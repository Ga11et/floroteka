<template>
  <FormContainer heading="Дела" :errorMessage="errorMessages.origin">
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
      <FormPartContainer name="Фотографии">
        <base-dropfile-container
          v-for="step in steps"
          :key="step"
          :errorMessage="errorMessages.photos"
          v-model="formData.photos[step - 1]"
          text="Добавьте фото (одно)"
          :photoId="'thingPhoto' + step"
        />
      </FormPartContainer>
    </template>
    <template #actions>
      <base-button
        v-if="steps.length < 3"
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
import FormContainer from './components/formContainer.vue'
import FormPartContainer from './components/formPartContainer.vue'
import { IThingsPostForm } from '../../types/types'

export default Vue.extend({
  name: 'technology-adding-form',
  components: { FormContainer, FormPartContainer },
  data: function () {
    return {
      formData: {
        heading: '',
        description: '',
        photos: [''],
      } as IThingsPostForm,
      steps: [1],
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('thingPhoto') !== -1) this.formData.photos[+photoId[10] - 1] = value
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
    addStep: function () {
      if (this.steps.length < 3) {
        this.steps.push(this.steps.length + 1)
        this.formData.photos.push('')
      }
    },
    submitForm: async function () {
      this.$store.dispatch('addThingsPost', this.formData)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
</style>
