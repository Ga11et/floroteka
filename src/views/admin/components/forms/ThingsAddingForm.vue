<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить пост Дела" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новый пост "Дела"</h2>
      <span class="originError" v-if="errorMessages.origin">
        {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput
          :errorMessage="errorMessages.heading"
          v-model="formData.heading"
          text="Введите заголовок"
          type="normal"
        />
        <CustomInput
          :errorMessage="errorMessages.describtion"
          v-model="formData.description"
          text="Введите описание"
          type="textarea"
        />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <CustomInput
          v-for="step in steps"
          :key="step"
          :errorMessage="errorMessages.photos"
          v-model="formData.photos[step - 1]"
          text="Добавьте фото (одно)"
          type="photo"
          :photoId="'thingPhoto' + step"
        />
      </FormPartContainer>
      <button v-if="steps.length !== 3" class="plusPhoto" type="button" @click.prevent="addStep">
        Добавить фото
      </button>
      <div class="buttons">
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
        <button class="button" type="submit" :disabled="sumbitLoading" @click.prevent="submitForm">
          Отправить на сервер
        </button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import SidePathContainer from '../sidePathContainer.vue'
import FormPartContainer from './components/formPartContainer.vue'
import CustomInput from '../customInput.vue'
import { technologiesErrorMessages, thingsFormType } from '@/store/models/formTypes'
import SvgIcons from '../common/svgIcons.vue'
import { postAPI } from '@/store/api/postAPI'

export default Vue.extend({
  name: 'technology-adding-form',
  components: { SidePathContainer, FormPartContainer, CustomInput, SvgIcons },
  data: function () {
    return {
      formData: {
        heading: '',
        description: '',
        photos: [''],
      } as thingsFormType,
      errorMessages: {} as technologiesErrorMessages,
      steps: [1],
      sumbitLoading: false,
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('thingPhoto') !== -1) this.formData.photos[+photoId[10] - 1] = value
    })
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    },
  },
  methods: {
    addStep: function () {
      this.steps.push(this.steps.length + 1)
      this.formData.photos.push('')
    },
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postAPI.postThingsPostData(this.formData, this.token)
      this.errorMessages = {} as technologiesErrorMessages
      if (response !== 'ok') {
        response.forEach((el: { param: string; msg: string }) => {
          const location = el.param.slice(5) as string
          this.errorMessages[location] = el.msg
        })
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
    },
  },
})
</script>
<style lang="scss">
@import '@/variables';

.plusPhoto {
  width: 300px;
  height: 60px;
  margin-top: 30px;
  @include font(20px, 30px, 400);
  border: 1px solid #8bab94;
  border-radius: 4px;
  background-color: #8bab9444;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    background-color: #8bab94;
    transition: 300ms;
  }
}
</style>
