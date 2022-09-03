<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить проект" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новый пост "Проекты"</h2>
      <span class="originError" v-if="errorMessages.origin">
      {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput :errorMessage="errorMessages.heading" v-model="formData.heading" text="Введите заголовок"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.description" v-model="formData.description" text="Введите описание"
          type="textarea" />
      </FormPartContainer>
      <FormPartContainer :name="'Фото ' + step" v-for="step in steps" :key="step">
        <CustomInput :errorMessage="errorMessages.stepPhotos" v-model="formData.stepPhotos[step - 1]" text="Добавьте фото (одно)"
          type="photo" :photoId="'step' + step" />
        <CustomInput :errorMessage="errorMessages.stepTexts" v-model="formData.stepTexts[step - 1]" text="Введите описание для фотографии"
          type="textarea" />
      </FormPartContainer>
      <button class="plusStep" type="button" @click.prevent="addStep">Добавить фото</button>
      <div class="buttons">
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
        <button class="button" type="submit" :disabled="sumbitLoading" @click.prevent="submitForm">Отправить на сервер</button>
      </div>
    </form>
  </section>
</template>
<script lang='ts'>
import Vue from 'vue'
import SidePathContainer from '../sidePathContainer.vue'
import FormPartContainer from '../formPartContainer.vue'
import CustomInput from '../customInput.vue'
import { technologiesErrorMessages, technologiesFormType } from '@/store/models/formTypes'
import SvgIcons from '../common/svgIcons.vue'
import { postAPI } from '@/store/api/postAPI'

export default Vue.extend({
  name: 'study-project-adding-form',
  components: { SidePathContainer, FormPartContainer, CustomInput, SvgIcons },
  data: function () {
    return {
      formData: {
        heading: '',
        description: '',
        stepPhotos: [''],
        stepTexts: ['']
      } as technologiesFormType,
      errorMessages: {} as technologiesErrorMessages,
      steps: [1],
      sumbitLoading: false
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('step') !== -1) this.formData.stepPhotos[+photoId[4] - 1] = value
    })
  },
  computed: {
    token () {
      return this.$store.getters.getToken
    }
  },
  methods: {
    addStep: function () {
      this.steps.push(this.steps.length + 1)
      this.formData.stepPhotos.push('')
      this.formData.stepTexts.push('')
    },
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postAPI.postStudyProjectPostData(this.formData, this.token)
      console.log(response)
      this.errorMessages = {} as technologiesErrorMessages
      if (response !== 'ok') {
        response.forEach((el: { param: string, msg: string }) => {
          const location = el.param.slice(5) as string
          this.errorMessages[location] = el.msg
        })
        console.log(this.errorMessages)
        this.$root.$emit('scroll')
        this.sumbitLoading = false
      }
      if (response === 'ok') {
        this.$root.$emit('changeForm', undefined)
        setTimeout(() => {
          this.$root.$emit('scroll')
        }, 300)
        this.sumbitLoading = false
      }
    }
  }
})
</script>
<style lang='scss'>
@import '@/variables';

.plusStep {
  width: 300px;
  height: 60px;
  margin-top: 30px;
  @include font(20px, 30px, 400);
  border: 1px solid #8BAB94;
  border-radius: 4px;
  background-color: #8BAB9444;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    background-color: #8BAB94;
    transition: 300ms;
  }
}
</style>
