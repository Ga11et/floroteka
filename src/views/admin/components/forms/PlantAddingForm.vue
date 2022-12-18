<template>
  <FormContainer heading="Растение" :errorMessage="errorMessages.origin">
    <template #content>
      <FormPartContainer name="Основная информация">
        <base-input-text
          :errorMessage="errorMessages.name"
          v-model="plantFormData.name"
          text="Введите имя растения"
        />
        <base-input-text
          :errorMessage="errorMessages.latin"
          v-model="plantFormData.latin"
          text="Введите латинское имя растения"
        />
        <base-textarea
          :errorMessage="errorMessages.description"
          v-model="plantFormData.description"
          text="Введите описание"
        />
      </FormPartContainer>
      <FormPartContainer name="Дополнительная информация">
        <base-input-text
          :errorMessage="errorMessages.date"
          v-model="plantFormData.date"
          text="Введите дату посадки"
        />
        <base-input-text
          :errorMessage="errorMessages.family"
          v-model="plantFormData.family"
          text="Введите царство"
          type="normal"
        />
        <base-input-text
          :errorMessage="errorMessages.from"
          v-model="plantFormData.from"
          text="Введите откуда привезено"
        />
        <base-input-text
          :errorMessage="errorMessages.livingPlace"
          v-model="plantFormData.livingPlace"
          text="Введите районирование"
        />
      </FormPartContainer>
      <FormPartContainer name="Информация для базы">
        <base-checkbox-input
          v-model="plantFormData.having"
          text="Доступность для приобретения"
          label="Присутствует"
        />
        <base-select v-model="plantFormData.type" text="Выберете тип для фильтрации" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <base-dropfile-container
          v-for="step in steps"
          :key="step"
          :errorMessage="errorMessages.img"
          v-model="plantFormData.img[step - 1]"
          text="Добавьте фото (одно)"
          :photoId="'plant' + step"
        />
      </FormPartContainer>
    </template>
    <template #actions>
      <base-button
        v-if="steps.length !== 3"
        type="button"
        @click.prevent="addStep"
        content="Добавить этап"
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
import { IPlantForm, PlantType } from '../../types/types'
import FormContainer from './components/formContainer.vue'
import FormPartContainer from './components/formPartContainer.vue'

export default Vue.extend({
  name: 'plant-adding-form',
  data: function () {
    return {
      plantFormData: {
        name: '',
        latin: '',
        description: '',
        img: [],
        date: '',
        family: '',
        from: '',
        livingPlace: '',
        having: false,
        type: 'Деревья' as PlantType,
      } as IPlantForm,
      steps: [1],
    }
  },
  components: { FormContainer, FormPartContainer },
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
      if (photoId.indexOf('plant') !== -1) this.plantFormData.img[+photoId[5] - 1] = value
    })
    this.$store.commit('setErrorMessages', [])
  },
  methods: {
    addStep() {
      this.steps.push(this.steps.length + 1)
      this.plantFormData.img.push('')
    },
    submitForm() {
      this.$store.dispatch('addPlant', this.plantFormData)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/app';
</style>
