<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить фото в галерею" />
    <form class="addingForm">
      <h2 class="heading">Добавить фотографию в галерею</h2>
      <span class="originError" v-if="errorMessages.origin">
      {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Фотография" >
        <CustomInput :errorMessage="errorMessages.photo" v-model="formData.photo" text="Добавьте фото (одно)"
          type="photo" photoId="galeryPhoto" />
      </FormPartContainer>
      <div class="buttons">
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
        <button class="button" type="submit" :disabled="sumbitLoading" @click.prevent="submitForm">Отправить на сервер</button>
      </div>
    </form>
  </section>
</template>
<script lang='ts'>
import Vue from 'vue'
import FormPartContainer from '../formPartContainer.vue'
import CustomInput from '../customInput.vue'
import { photosErrorMessages, photosFormType } from '../../store/models/formTypes'
import SvgIcons from '../common/svgIcons.vue'
import SidePathContainer from '../sidePathContainer.vue'
import { postAPI } from '@/store/api/postAPI'

export default Vue.extend({
  name: 'photo-adding-form',
  components: { FormPartContainer, CustomInput, SvgIcons, SidePathContainer },
  data: function () {
    return {
      errorMessages: {} as photosErrorMessages,
      formData: {
        photo: '',
        lastModified: ''
      } as photosFormType,
      sumbitLoading: false
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      const today = new Date()
      const OutputDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + (today.getDate())).slice(-2)} ${('0' + (today.getHours())).slice(-2)}-${('0' + (today.getMinutes())).slice(-2)}-${('0' + (today.getSeconds())).slice(-2)}`
      if (photoId.indexOf('galeryPhoto') !== -1) this.formData = { photo: value, lastModified: OutputDate }
    })
  },
  computed: {
    token () {
      return this.$store.getters.getToken
    }
  },
  methods: {
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postAPI.postPhotoPostData(this.formData, this.token)
      this.errorMessages = {} as photosErrorMessages
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
