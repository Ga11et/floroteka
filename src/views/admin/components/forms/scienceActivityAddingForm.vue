<template>
  <FormContainer heading="Науч. деятельность" :errorMessage="errorMessages.origin">
    <template #content>
      <FormPartContainer name="Основная информация">
        <base-input-text
          :errorMessage="errorMessages.heading"
          v-model="formData.heading"
          text="Введите название поста"
        />
        <base-textarea
          :errorMessage="errorMessages.description"
          v-model="formData.description"
          text="Введите описание"
        />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <base-dropfile-container
          :errorMessage="errorMessages.img"
          v-model="formData.img"
          text="Добавьте фото (одно)"
          photoId="scienceActivity"
        />
      </FormPartContainer>
    </template>
    <template #actions>
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
import { IScienceActivityPostForm } from '../../types/types'
import FormContainer from './components/formContainer.vue'
import FormPartContainer from './components/formPartContainer.vue'

export default Vue.extend({
  name: 'science-activity-adding-form',
  components: { FormContainer, FormPartContainer },
  data() {
    return {
      formData: {} as IScienceActivityPostForm,
    }
  },
  computed: {
    errorMessages() {
      return this.$store.getters.errorMessages
    },
    isLoading() {
      return this.$store.getters.adminLoading
    },
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('scienceActivity') !== -1) this.formData.img = value
    })
    this.$store.commit('setErrorMessages', [])
  },
  methods: {
    submitForm: async function () {
      this.$store.dispatch('addScienceActivityPost', this.formData)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
</style>
