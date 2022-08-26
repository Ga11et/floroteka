<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить научную деятельность" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новый пост научной деятельности</h2>
      <span class="originError" v-if="errorMessages.origin">
        {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput :errorMessage="errorMessages.heading" v-model="formData.heading" text="Введите название поста"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.description" v-model="formData.description"
          text="Введите описание" type="textarea" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <CustomInput :errorMessage="errorMessages.img" v-model="formData.img" text="Добавьте фото (одно)"
          type="photo" photoId='scienceActivity' />
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
import SidePathContainer from '../sidePathContainer.vue'
import FormPartContainer from '../formPartContainer.vue'
import CustomInput from '../customInput.vue'
import { scienceActivityFormType, scienceActivityErrorMessages } from '@/store/models/formTypes'
import store from '@/store'
import { postAPI } from '@/store/api/postAPI'
import { formServises } from '@/servises/formServises'
import SvgIcons from '../common/svgIcons.vue'

export default Vue.extend({
  name: 'science-activity-adding-form',
  components: { SidePathContainer, FormPartContainer, CustomInput, SvgIcons },
  data () {
    return {
      formData: {} as scienceActivityFormType,
      errorMessages: {} as scienceActivityErrorMessages,
      sumbitLoading: false
    }
  },
  computed: {
    token () {
      return store.getters.getToken
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('scienceActivity') !== -1) this.formData.img = value
    })
  },
  methods: {
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postAPI.postScienceActivityPostData(this.formData, this.token)
      this.errorMessages = {} as scienceActivityErrorMessages
      if (response === 'ok') {
        this.$root.$emit('changeForm', undefined)
        setTimeout(() => {
          this.$root.$emit('scroll')
        }, 300)
        this.sumbitLoading = false
      }
      if (response !== 'ok') {
        formServises.errorMapping(response, this.errorMessages)
        this.$root.$emit('scroll')
        this.sumbitLoading = false
      }
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
</style>
