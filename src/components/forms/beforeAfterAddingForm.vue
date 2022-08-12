<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить пост Было / Стало" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новый пост "Было / Стало"</h2>
      <span class="originError" v-if="errorMessages.origin">
        {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput :errorMessage="errorMessages.heading" v-model="formData.heading" text="Введите заголовок"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.description" v-model="formData.description" text="Введите описание"
          type="textarea" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <CustomInput :errorMessage="errorMessages.before" v-model="formData.before" text="Добавьте фото БЫЛО"
          type="photo" photoId="before" />
        <CustomInput :errorMessage="errorMessages.after" v-model="formData.after" text="Добавьте фото СТАЛО"
          type="photo" photoId="after" />
      </FormPartContainer>
      <div class="buttons">
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
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
import { BeforeAfterFormType, ErrorMessagesBeforeAfterPost } from '@/store/models/formTypes'
import { postBeforeAfterPostData } from '@/store/api/api'
import store from '@/store'
import SvgIcons from '../svgIcons.vue'

export default Vue.extend({
  name: 'before-after-adding-form',
  components: { SidePathContainer, FormPartContainer, CustomInput, SvgIcons },
  data: function () {
    return {
      formData: {
        heading: '',
        description: '',
        before: '',
        after: ''
      } as BeforeAfterFormType,
      errorMessages: {} as ErrorMessagesBeforeAfterPost,
      sumbitLoading: false
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId === 'before') this.formData.before = value
      if (photoId === 'after') this.formData.after = value
    })
  },
  computed: {
    token () {
      return store.getters.getToken
    }
  },
  methods: {
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postBeforeAfterPostData(this.formData, this.token)
      this.errorMessages = {} as ErrorMessagesBeforeAfterPost
      if (response !== 'ok') {
        response.forEach((el: { param: string, msg: string }) => {
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
    }
  }
})
</script>
<style lang='scss'>
@import '@/variables';
</style>
