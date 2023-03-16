<template>
  <FormContainer heading="Было / Стало" :errorMessage="errorMessages.origin">
    <template #content>
      <FormPartContainer name="Основная информация">
        <base-input-text
          :errorMessage="errorMessages.heading"
          v-model="formData.heading"
          text="Введите заголовок"
          type="normal"
        />
        <base-textarea
          :errorMessage="errorMessages.description"
          v-model="formData.description"
          text="Введите описание"
        />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <base-dropfile-container
          :errorMessage="errorMessages.before"
          v-model="formData.before"
          text="Добавьте фото БЫЛО"
          photoId="before"
        />
        <base-dropfile-container
          :errorMessage="errorMessages.after"
          v-model="formData.after"
          text="Добавьте фото СТАЛО"
          photoId="after"
        />
      </FormPartContainer>
    </template>
    <template #actions>
      <base-svg v-if="sumbitLoading" type="loading" class="suspense" />
      <base-button
        type="submit"
        :disabled="sumbitLoading"
        @click.prevent="submitForm"
        content="Отправить на сервер"
      />
    </template>
  </FormContainer>
</template>
<script lang="ts">
import Vue from 'vue'
import FormPartContainer from './components/formPartContainer.vue'
import FormContainer from './components/formContainer.vue'
import { IBeforeAfterPostForm } from '../../types/types'

export default Vue.extend({
  name: 'before-after-adding-form',
  components: { FormPartContainer, FormContainer },
  data: function () {
    return {
      formData: {
        heading: '',
        description: '',
        before: '',
        after: '',
      } as IBeforeAfterPostForm,
      sumbitLoading: false,
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId === 'before') this.formData.before = value
      if (photoId === 'after') this.formData.after = value
    })
    this.$store.commit('setErrorMessages', [])
  },
  computed: {
    errorMessages() {
      return this.$store.getters.errorMessages
    },
  },
  methods: {
    submitForm: async function () {
      this.$store.dispatch('addBeforeAfterPost', this.formData)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
</style>
