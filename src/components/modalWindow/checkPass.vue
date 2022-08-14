<template>
  <div class="fullScreenModalView">
    <form class="modalContent">
      <h2 class="heading">Подтвердите действие</h2>
      <CustomInput class="modalInput" :errorMessage="errorMessage" text="Введите свой пароль" v-model="formData.password" type="normal" inputType="password" />
      <div class="buttons">
        <SvgIcons v-if="isLoading" type="loading" class="modalLoading" />
        <button v-else class="button next" type="submit" @click.prevent="modalSubmit">Отправить</button>
        <button class="button cancel" type="button" @click="$root.$emit('closeCheckPass')">Закрыть</button>
      </div>
    </form>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import CustomInput from '../customInput.vue'
import SvgIcons from '../svgIcons.vue'

export default Vue.extend({
  name: 'chech-pass-modal-view',
  components: { CustomInput, SvgIcons },
  props: ['errorMessage', 'submitCallback'],
  data: function () {
    return {
      formData: {
        password: ''
      },
      error: '',
      isLoading: false
    }
  },
  methods: {
    modalSubmit: async function () {
      this.isLoading = true
      await this.submitCallback(this.formData.password)
      this.isLoading = false
    }
  }
})
</script>
<style lang='scss'>
@import './modalView.scss';
</style>
