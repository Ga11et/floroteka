<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить пост Дела" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новый пост "Дела"</h2>
      <span class="originError" v-if="errorMessages.origin">
      {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput :errorMessage="errorMessages.heading" v-model="formData.heading" text="Введите заголовок"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.describtion" v-model="formData.describtion" text="Введите описание"
          type="textarea" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии" >
        <CustomInput v-for="step in steps" :key="step" :errorMessage="errorMessages.photos" v-model="formData.photos[step - 1]" text="Добавьте фото (одно)"
          type="photo" :photoId="'thingPhoto' + step" />
      </FormPartContainer>
      <button class="plusPhoto" type="button" @click.prevent="addStep">Добавить фото</button>
      <div class="buttons">
        <button class="button" type="submit" @click.prevent="submitForm">Отправить на сервер</button>
      </div>
    </form>
  </section>
</template>
<script lang='ts'>
import Vue from 'vue'
import SidePathContainer from '../sidePathContainer.vue'
import FormPartContainer from '../formPartContainer.vue'
import CustomInput from '../customInput.vue'
import { technologiesErrorMessages, thingsFormType } from '@/store/models/formTypes'
import { postThingsPostData } from '@/store/api/api'

export default Vue.extend({
  name: 'technology-adding-form',
  components: { SidePathContainer, FormPartContainer, CustomInput },
  data: function () {
    return {
      formData: {
        heading: '',
        describtion: '',
        photos: ['']
      } as thingsFormType,
      errorMessages: {} as technologiesErrorMessages,
      steps: [1]
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('thingPhoto') !== -1) this.formData.photos[+photoId[10] - 1] = value
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
      this.formData.photos.push('')
    },
    submitForm: async function () {
      console.log(this.formData)
      const response = await postThingsPostData(this.formData, this.token)
      console.log(response)
      this.errorMessages = {} as technologiesErrorMessages
      if (response !== 'ok') {
        response.forEach((el: { param: string, msg: string }) => {
          const location = el.param.slice(5) as string
          this.errorMessages[location] = el.msg
        })
        console.log(this.errorMessages)
        this.$root.$emit('scroll')
      }
    }
  }
})
</script>
<style lang='scss'>
@import '@/variables';

.plusPhoto {
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
