<template>
  <div class="fullScreenModalView">
    <form class="modalContent">
      <h2 class="heading">Измените данные растения</h2>
      <CustomInput class="modalInput" :errorMessage="errorMessages.name" text="Название" v-model="formData.name" type="normal"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.latin" text="Латинское название" v-model="formData.latin" type="normal"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.description" text="Описание" v-model="formData.description" type="textarea"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.date" text="Дата посадки" v-model="formData.date" type="normal"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.family" text="Царство" v-model="formData.family" type="normal"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.from" text="Привезено из" v-model="formData.from" type="normal"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.livingPlace" text="Районирование" v-model="formData.livingPlace" type="normal"/>
      <CustomInput class="modalInput" label="Присутствует" text="Доступность для приобретения" v-model="formData.having" type="checkbox"/>
      <CustomInput class="modalInput" text="Доступность для приобретения" v-model="formData.type" type="select"/>
      <CustomInput class="modalInput" :errorMessage="errorMessages.origin" text="Подтвердите пароль" v-model="password" type="normal" inputType="password" />
      <div class="buttons">
        <SvgIcons v-if="isLoading" type="loading" class="modalLoading" />
        <button v-else class="button next" type="submit" @click.prevent="modalSubmit">Отправить</button>
        <button class="button cancel" type="button" @click="closeHandler">Закрыть</button>
      </div>
    </form>
  </div>
</template>
<script lang='ts'>
import { plantPropsType } from '@/store/models/appTypes'
import Vue from 'vue'
import CustomInput from '../customInput.vue'
import SvgIcons from '../common/svgIcons.vue'

export default Vue.extend({
  name: 'update-plant-modal-view',
  components: { CustomInput, SvgIcons },
  props: ['errorMessages', 'submitCallback', 'actualData'],
  data: function () {
    return {
      formData: {} as plantPropsType,
      password: '',
      isLoading: false
    }
  },
  mounted () {
    this.formData = { ...this.actualData }
  },
  methods: {
    modalSubmit: async function () {
      this.isLoading = true
      await this.submitCallback(this.formData, this.password)
      this.isLoading = false
    },
    closeHandler () {
      this.$root.$emit('closeUpdateModal')
      this.$root.$emit('ableScroll')
      setTimeout(() => {
        this.$root.$emit('scroll')
      }, 300)
    }
  }
})
</script>
<style lang='scss'>
@import './modalView.scss';
@import '@/app';
</style>
